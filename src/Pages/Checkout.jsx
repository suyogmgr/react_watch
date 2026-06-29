import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { id, model, price, quantity } = state || {};
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [checkoutData, setCheckoutData] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const [customer, setCustomer] = useState({
    name: "",
    email: loggedInUser.email || "",
    phone: "",
    address: ""
  });

  const total = state ? price * quantity : 0;
  const baseOrigin = window.location.origin + import.meta.env.BASE_URL.replace(/\/+$/, "");
  const returnUrl = `${baseOrigin}/#/checkout`;

  // On mount: handle Khalti return
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    const pidx = params.get("pidx");
    const txnId = params.get("transaction_id");
    const mobile = params.get("mobile");

    const saved = sessionStorage.getItem("lastCheckout");
    if (saved) setCheckoutData(JSON.parse(saved));

    if (status === "Completed" && pidx) {
      updateOrder(pidx, txnId, mobile);
      setPaymentMessage(`Payment verified! Ref: ${txnId || pidx}`);
      setOrderPlaced(true);
      sessionStorage.removeItem("lastCheckout");
    } else if (status === "User canceled") {
      setPaymentMessage("Payment was cancelled. Try again.");
      setOrderPlaced(true);
      sessionStorage.removeItem("lastCheckout");
    } else if (status) {
      setPaymentMessage(`Payment status: ${status}`);
      setOrderPlaced(true);
      sessionStorage.removeItem("lastCheckout");
    }

    if (pidx) {
      navigate("/checkout", { replace: true });
    }
  }, []);

  const updateOrder = (pidx, txnId, mobile) => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const idx = orders.findIndex(o => !o.refId);
    if (idx !== -1) {
      orders[idx].refId = pidx;
      orders[idx].txnId = txnId || "";
      orders[idx].mobile = mobile || "";
      orders[idx].status = "completed";
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  };

  const saveOrder = (orderStatus) => {
    const order = {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      productId: id,
      productModel: model,
      price,
      quantity,
      total,
      refId: "",
      orderedAt: new Date().toISOString(),
      status: orderStatus
    };
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.unshift(order);
    localStorage.setItem("orders", JSON.stringify(orders));
  };

  const handlePayDev = async () => {
    saveOrder("pending");
    try {
      const res = await fetch("/api/khalti/epayment/initiate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          return_url: returnUrl,
          website_url: baseOrigin + "/",
          amount: String(Math.round(total * 100)),
          purchase_order_id: `${id}-${Date.now()}`,
          purchase_order_name: model,
          customer_info: { name: customer.name, email: customer.email, phone: customer.phone }
        })
      });
      const data = await res.json();
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        setPaymentMessage("Khalti error: " + JSON.stringify(data));
        setOrderPlaced(true);
        setProcessing(false);
      }
    } catch (err) {
      setPaymentMessage("Failed to reach payment gateway.");
      setOrderPlaced(true);
      setProcessing(false);
    }
  };

  const handlePayProd = () => {
    saveOrder("pending");
    setPaymentMessage("Order placed! Admin will verify the payment.");
    setOrderPlaced(true);
    sessionStorage.setItem("lastCheckout", JSON.stringify({ total, model, customer }));
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) return;
    if (!/^9\d{9}$/.test(customer.phone)) { setPaymentMessage("Enter a valid 10-digit Nepali phone number (98XXXXXXXX)."); setOrderPlaced(true); setProcessing(false); return; }
    setProcessing(true);
    sessionStorage.setItem("lastCheckout", JSON.stringify({ total, model, customer }));
    if (import.meta.env.DEV) {
      handlePayDev();
    } else {
      handlePayProd();
    }
  };

  const update = (field, value) => setCustomer(prev => ({ ...prev, [field]: value }));

  if (orderPlaced || paymentMessage) {
    const displayTotal = checkoutData?.total || total;
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-10 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${paymentMessage?.includes('verified') ? 'bg-green-100' : paymentMessage ? 'bg-red-100' : 'bg-yellow-100'}`}>
            {paymentMessage?.includes('verified') ? (
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            ) : paymentMessage ? (
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {paymentMessage?.includes('verified') ? 'Payment Confirmed' : paymentMessage ? 'Payment Failed' : 'Order Submitted'}
          </h2>
          <p className="text-gray-500 mb-6">
            {paymentMessage?.includes('verified')
              ? `Total: Rs. ${Math.round(displayTotal).toLocaleString('en-IN')}`
              : paymentMessage ? paymentMessage : 'Your payment is pending admin verification.'}
          </p>
          <button onClick={() => navigate("/product")} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-all">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (!state) return <p className="text-center text-red-600 py-20">No product selected.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <form onSubmit={handlePay} className="max-w-4xl mx-auto grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={customer.name} onChange={e => { e.stopPropagation(); update("name", e.target.value); }} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={customer.email} onChange={e => { e.stopPropagation(); update("email", e.target.value); }} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={customer.phone} onChange={e => { e.stopPropagation(); update("phone", e.target.value.replace(/\D/g, "").slice(0, 10)); }} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="98XXXXXXXX" pattern="9\d{9}" maxLength={10} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <textarea value={customer.address} onChange={e => { e.stopPropagation(); update("address", e.target.value); }} rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Street, city, district" required />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">{model}</p>
                <p className="text-sm text-gray-500">ID: {id} | Qty: {quantity}</p>
              </div>
            </div>
            <div className="space-y-2 pt-4 text-sm">
              <div className="flex justify-between text-gray-600"><span>Price per unit</span><span>Rs. {Math.round(price).toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between text-gray-600"><span>Quantity</span><span>{quantity}</span></div>
              <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-100 pt-3"><span>Total</span><span>Rs. {Math.round(total).toLocaleString('en-IN')}</span></div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center sticky top-32">
            <svg viewBox="0 0 120 40" className="h-8 mb-4">
              <text x="60" y="26" textAnchor="middle" fill="#5A2D82" fontWeight="bold" fontSize="18" fontFamily="Arial">KHALTI</text>
            </svg>
            <p className="font-semibold text-gray-800 mb-4">Pay with Khalti</p>
            {import.meta.env.PROD && (
              <p className="text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded mb-3">Online payment unavailable in deployed mode. Order will be pending admin verification.</p>
            )}
            <button type="submit" disabled={processing} className={`w-full py-3 rounded-lg font-semibold transition-all active:scale-[0.98] ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-600 text-white'}`}>
              {processing ? 'Processing...' : 'Place Order'}
            </button>
            <p className="text-xs text-gray-400 mt-3">
              {import.meta.env.DEV ? "You'll be redirected to Khalti to complete payment." : 'Order will be placed for admin verification.'}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
