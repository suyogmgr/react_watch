import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CART_KEY = "cart";

const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");

const Cart = () => {
  const [items, setItems] = useState(getCart);

  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(items)); }, [items]);

  const updateQty = (id, qty) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, Math.min(qty, i.stock)) } : i));
  };

  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const total = items.reduce((s, i) => s + (parseFloat(String(i.price).replace(/Rs\.\s*/gi, '').replace(/,/g, '')) || 0) * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
        <p className="text-gray-500 text-lg">Your cart is empty</p>
        <Link to="/Product" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-500 transition">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="space-y-4">
          {items.map(item => {
            const price = parseFloat(String(item.price).replace(/Rs\.\s*/gi, '').replace(/,/g, '')) || 0;
            const imgSrc = (item.img || "").startsWith("data:") ? item.img : import.meta.env.BASE_URL.replace(/\/+$/, "") + "/" + (item.img || "").replace(/^\//, "");
            return (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={imgSrc} alt={item.id} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{item.model}</p>
                  <p className="text-sm text-gray-400">{item.id}</p>
                  <p className="text-blue-600 font-bold mt-1">Rs. {(price * item.quantity).toLocaleString("en-IN")}</p>
                </div>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition">-</button>
                  <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition">+</button>
                </div>
                <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 transition p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            );
          })}
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">Total: Rs. {Math.round(total).toLocaleString("en-IN")}</p>
          <Link to="/Checkout" state={{ items, total }} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-all">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
