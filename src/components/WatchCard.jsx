import React, { useState } from 'react';

const WatchCard = ({ model, img, id, price, stock }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const numericPrice = parseFloat(price.replace(/Rs\.\s*/gi, '').replace(/,/g, ''));
  const imgSrc = img.startsWith('data:') ? img : import.meta.env.BASE_URL.replace(/\/+$/, '') + '/' + img.replace(/^\//, '');

  const handleChange = (e) => {
    let value = parseInt(e.target.value) || 1;
    if (value > stock) value = stock;
    if (value < 1) value = 1;
    setQuantity(value);
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = cart.findIndex(i => i.id === id);
    if (idx !== -1) {
      cart[idx].quantity = Math.min(cart[idx].quantity + quantity, stock);
    } else {
      cart.push({ id, model, price, quantity, stock, img });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col">
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={imgSrc}
          alt={id}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {stock <= 5 && stock > 0 && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Only {stock} left
          </span>
        )}
        {stock === 0 && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Sold Out
          </span>
        )}
        <span className="absolute top-3 right-3 bg-white/90 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
          {model}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{id}</p>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{model}</h3>
        <p className="text-2xl font-bold text-blue-600 mb-3">Rs. {(numericPrice * quantity).toLocaleString('en-IN')}</p>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={stock === 0}
              className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={handleChange}
              min="1"
              max={stock}
              disabled={stock === 0}
              className="w-12 text-center border-x border-gray-200 py-1.5 text-sm font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              onClick={() => setQuantity(q => Math.min(stock, q + 1))}
              disabled={stock === 0}
              className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-400">{stock} in stock</span>
        </div>

        <button
          onClick={addToCart}
          disabled={stock === 0}
          className={`mt-auto w-full py-3 rounded-lg font-semibold transition-all active:scale-[0.98] ${
            added ? 'bg-green-500 text-white' : stock === 0 ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-md'
          }`}
        >
          {stock === 0 ? 'Unavailable' : added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default WatchCard;
