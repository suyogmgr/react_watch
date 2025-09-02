import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import qr from "../assets/qr_code.jpg";

const Checkout = () => {
  const { state } = useLocation();
  const { id, model, price, quantity } = state || {};
  const [showQR, setShowQR] = useState(false);

  if (!state) return <p>No product selected.</p>;

  return (
    <div className="p-10 h-[100vh] flex justify-center items-center flex-col text-center relative">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p>
        <strong>Product:</strong> {model} ({id})
      </p>
      <p>
        <strong>Quantity:</strong> {quantity}
      </p>
      <p>
        <strong>Total Price:</strong> ${(price * quantity).toFixed(2)}
      </p>

      <button
        onClick={() => setShowQR(true)}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-400"
      >
        Proceed to Payment
      </button>

      {showQR && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center relative">
            <h2 className="text-2xl font-semibold mb-6">Scan to Pay</h2>
            <img
              src={qr}
              alt="QR Code"
              className="mx-auto w-[400px] h-[400px] object-contain mb-6"
            />
            {/* Close button below QR code */}
            <button
              onClick={() => setShowQR(false)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
