import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { getCartKey } from "../utils/cartKey";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, total } = location.state || {};
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [checkoutData, setCheckoutData] = useState(null);
  const [toast, setToast] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const [customer, setCustomer] = useState({
    name: "",
    email: loggedInUser.email || "",
    phone: "",
    address: ""
  });

  const baseOrigin = window.location.origin + import.meta.env.BASE_URL.replace(/\/+$/, "");
  const returnUrl = `${baseOrigin}/#/checkout`;

  const cartTotal = items ? items.reduce((s, i) => {
    const p = parseFloat(String(i.price).replace(/Rs\.\s*/gi, '').replace(/,/g, '')) || 0;
    return s + p * i.quantity;
  }, 0) : 0;

  const orderSummary = items ? items.map(i => ({
    id: i.id, model: i.model, price: i.price, quantity: i.quantity
  })) : [];

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
      setToast({ message: `Payment confirmed!`, type: "success" });
      sessionStorage.removeItem("lastCheckout");
    } else if (status === "User canceled") {
      setPaymentMessage("Payment was cancelled. Try again.");
      setOrderPlaced(true);
      setToast({ message: "Payment cancelled.", type: "error" });
      sessionStorage.removeItem("lastCheckout");
    } else if (status) {
      setPaymentMessage(`Payment status: ${status}`);
      setOrderPlaced(true);
      setToast({ message: `Payment status: ${status}`, type: "error" });
      sessionStorage.removeItem("lastCheckout");
    }

    if (pidx) {
      navigate("/checkout", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

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
      items: orderSummary,
      total: cartTotal,
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
          amount: String(Math.round(cartTotal * 100)),
          purchase_order_id: `order-${Date.now()}`,
          purchase_order_name: `Watch order (${items.length} item${items.length > 1 ? 's' : ''})`,
          customer_info: { name: customer.name, email: customer.email, phone: customer.phone }
        })
      });
      const data = await res.json();
      if (data.payment_url) {
        localStorage.removeItem(getCartKey());
        window.dispatchEvent(new Event("cart-updated"));
        window.location.href = data.payment_url;
      } else {
        localStorage.removeItem(getCartKey());
        window.dispatchEvent(new Event("cart-updated"));
        setPaymentMessage("Order placed! Admin will verify the payment.");
        setOrderPlaced(true);
        setToast({ message: "Order placed! Awaiting admin verification.", type: "pending" });
        setProcessing(false);
      }
    } catch (err) {
      setPaymentMessage("Failed to reach payment gateway.");
      setOrderPlaced(true);
      setToast({ message: "Payment gateway error.", type: "error" });
      setProcessing(false);
    }
  };

  const handlePayProd = () => {
    saveOrder("pending");
    localStorage.removeItem(getCartKey());
    window.dispatchEvent(new Event("cart-updated"));
    setPaymentMessage("Order placed! Admin will verify the payment.");
    setOrderPlaced(true);
    setToast({ message: "Order placed! Awaiting admin verification.", type: "pending" });
    sessionStorage.setItem("lastCheckout", JSON.stringify({ total: cartTotal, items: orderSummary }));
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) return;
    if (!/^9\d{9}$/.test(customer.phone)) { setPaymentMessage("Enter a valid 10-digit Nepali phone number (98XXXXXXXX)."); setOrderPlaced(true); setProcessing(false); return; }
    setProcessing(true);
    sessionStorage.setItem("lastCheckout", JSON.stringify({ total: cartTotal, customer }));
    if (import.meta.env.DEV) {
      handlePayDev();
    } else {
      handlePayProd();
    }
  };

  const update = (field, value) => setCustomer(prev => ({ ...prev, [field]: value }));

  const msgType = !paymentMessage ? "pending" : paymentMessage.includes("verified") ? "success" : paymentMessage.includes("Admin will verify") || paymentMessage.includes("Order placed") ? "pending" : "error";

  if (orderPlaced || paymentMessage) {
    const displayTotal = checkoutData?.total || cartTotal;
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 relative">
        {toast && (
          <div className="fixed top-6 right-6 z-[9999]">
            <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
          </div>
        )}
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-10 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${msgType === "success" ? 'bg-green-100' : msgType === "error" ? 'bg-red-100' : 'bg-yellow-100'}`}>
            {msgType === "success" ? (
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            ) : msgType === "error" ? (
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {msgType === "success" ? 'Payment Confirmed' : msgType === "error" ? 'Payment Failed' : 'Order Submitted'}
          </h2>
          <p className="text-gray-500 mb-6">
            {paymentMessage?.includes('verified')
              ? `Total: Rs. ${Math.round(displayTotal).toLocaleString('en-IN')}`
              : paymentMessage ? paymentMessage : 'Your payment is pending admin verification.'}
          </p>
          {msgType === "pending" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-left text-sm space-y-2">
              <p className="font-semibold text-yellow-800">Complete your payment manually:</p>
              <p className="text-yellow-700">Send the total amount via eSewa / Bank Transfer to the number below, then contact us with your order details.</p>
              <div className="flex items-center gap-2 text-yellow-800">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span><strong>Phone:</strong> 9800000000</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-800">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span><strong>Email:</strong> watchshop@example.com</span>
              </div>
            </div>
          )}
          <button onClick={() => navigate("/product")} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-all">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) return <p className="text-center text-red-600 py-20">No items to checkout.</p>;

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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary ({items.length} item{items.length > 1 ? 's' : ''})</h2>
            <div className="space-y-3">
              {items.map(item => {
                const p = parseFloat(String(item.price).replace(/Rs\.\s*/gi, '').replace(/,/g, '')) || 0;
                return (
                  <div key={item.id} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.model}</p>
                      <p className="text-xs text-gray-400">ID: {item.id} | Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-700">Rs. {(p * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-4">
              <span>Total</span>
              <span>Rs. {Math.round(cartTotal).toLocaleString('en-IN')}</span>
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
