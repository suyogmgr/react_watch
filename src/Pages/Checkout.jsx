import React from 'react';
import { useLocation } from 'react-router-dom';
import qr from '../assets/qr_code.jpg';
const Checkout = () => {
  const { state } = useLocation();
  const { id, model, price, quantity } = state || {};

  if (!state) return <p>No product selected.</p>;

  return (
    <div className="p-10 h-[100vh] flex justify-center items-center flex-col text-center">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p><strong>Product:</strong> {model} ({id})</p>
      <p><strong>Quantity:</strong> {quantity}</p>
      <p><strong>Total Price:</strong> ${(price * quantity).toFixed(2)}</p>

      <button onClick={() => confirm('Proceed with the transation?')} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-400">
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
