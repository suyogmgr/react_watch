import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import esewaLogo from "../assets/esewa-logo-3646665139.png";
import qrCode from "../assets/qr_code.png";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id, model, price, quantity } = state || {};

  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!state) return <p className="text-center text-red-600 py-20">No product selected.</p>;

  const total = (price * quantity).toFixed(2);

  const placeOrder = () => {
    const order = {
      id,
      model,
      price,
      quantity,
      total,
      orderedAt: new Date().toISOString(),
      status: "pending"
    };
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.unshift(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {!orderPlaced ? (
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">{model}</p>
                <p className="text-sm text-gray-500">ID: {id}</p>
                <p className="text-sm text-gray-500">Qty: {quantity}</p>
              </div>
            </div>
            <div className="space-y-2 pt-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Price per unit</span>
                <span>${price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Quantity</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-100 pt-3">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
            <img src={esewaLogo} alt="eSewa" className="h-8 mb-4" />
            <div className="w-48 h-48 bg-white border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center p-2 mb-4">
              <img src={qrCode} alt="Scan to Pay" className="w-full h-full object-contain" />
            </div>
            <p className="text-xs text-gray-400 mb-1">Scan with eSewa app</p>
            <p className="font-mono text-sm font-bold text-gray-800 mb-4">9806800002</p>

            <button
              onClick={placeOrder}
              className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-semibold transition-all active:scale-[0.98]"
            >
              I've Paid
            </button>
            <p className="text-xs text-gray-400 mt-3">
              Click only after completing payment in eSewa.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-10 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Submitted</h2>
          <p className="text-gray-500 mb-2">Your order is pending verification.</p>
          <p className="text-sm text-gray-400 mb-6">The admin will verify your payment and confirm the order.</p>
          <button
            onClick={() => navigate("/product")}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-all"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
