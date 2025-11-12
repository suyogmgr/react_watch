import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qr from "../assets/qr_code.png";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id, model, price, quantity } = state || {};

  const [showQR, setShowQR] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [progressStep, setProgressStep] = useState(2); // Start at Checkout (step 2)

  /* ---- Update progress when payment completes ---- */
  useEffect(() => {
    if (paymentDone) {
      setProgressStep(3);
    }
  }, [paymentDone]);

  /* ---- Redirect after payment ---- */
  useEffect(() => {
    if (paymentDone) {
      const timer = setTimeout(() => {
        navigate(`/product`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [paymentDone, navigate]);

  /* ---- Simulate payment after QR is shown ---- */
  useEffect(() => {
    if (showQR && !paymentDone) {
      const timer = setTimeout(() => {
        setPaymentDone(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showQR, paymentDone]);

  if (!state) return <p className="text-center text-red-600">No product selected.</p>;

  const total = (price * quantity).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      {/* ----- Progress Bar ----- */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-center space-x-4 text-sm">
          {/* Step 1: Cart */}
          <div className="flex items-center">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                progressStep >= 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              1
            </span>
            <span
              className={`ml-2 font-medium transition-colors duration-300 ${
                progressStep >= 1 ? "text-green-600" : "text-gray-500"
              }`}
            >
              Cart
            </span>
          </div>

          <div
            className={`w-20 h-1 transition-colors duration-300 ${
              progressStep >= 2 ? "bg-green-600" : "bg-gray-300"
            }`}
          ></div>

          {/* Step 2: Checkout */}
          <div className="flex items-center">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                progressStep >= 2
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              2
            </span>
            <span
              className={`ml-2 font-medium transition-colors duration-300 ${
                progressStep >= 2 ? "text-green-600" : "text-gray-500"
              }`}
            >
              Checkout
            </span>
          </div>

          <div
            className={`w-20 h-1 transition-colors duration-300 ${
              progressStep >= 3 ? "bg-green-600" : "bg-gray-300"
            }`}
          ></div>

          {/* Step 3: Complete */}
          <div className="flex items-center">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                progressStep >= 3
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              3
            </span>
            <span
              className={`ml-2 font-medium transition-colors duration-300 ${
                progressStep >= 3 ? "text-green-600" : "text-gray-500"
              }`}
            >
              Complete
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* ----- Order Summary ----- */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-5">
          <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>

          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20" />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{model}</p>
                <p className="text-sm text-gray-500">ID: {id}</p>
              </div>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>Price per unit</span>
              <span>${price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <button
            onClick={() => setShowQR(true)}
            disabled={showQR}
            className={`w-full py-3 rounded-lg font-medium transition-all ${
              showQR
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {showQR ? "QR Code Shown" : "Proceed to Payment"}
          </button>
        </div>

        {/* ----- Scan to Pay ----- */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center items-center text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Scan to Pay</h2>

          <div className="w-64 h-64 bg-gray-100 border-2 border-dashed rounded-xl flex items-center justify-center p-2">
            {showQR ? (
              <img
                src={qr}
                alt="QR Code"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <p className="text-gray-400">
                Click **Proceed** to show QR
              </p>
            )}
          </div>

          {paymentDone && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg animate-pulse">
              Payment confirmed! Redirecting…
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;