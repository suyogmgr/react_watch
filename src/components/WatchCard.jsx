import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WatchCard = ({ model, img, id, price, stock }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const numericPrice = parseFloat(price.replace(/[$,]/g, ''));

  const handleChange = (e) => {
    let value = parseInt(e.target.value) || 1;
    if (value > stock) value = stock;
    if (value < 1) value = 1;
    setQuantity(value);
  };

  const handleBuyNow = () => {
    // Redirect to checkout page with item info in state
    navigate('/checkout', { state: { id, model, price: numericPrice, quantity } });
  };

  return (
    <div className="bg-white transition duration-200 ease-in-out p-4 rounded shadow-md">
      <img src={img} alt={id} className="object-cover h-80 w-80 bg-cyan-100 mb-2" />
      <div className="p-2">
        <p className="uppercase">{model}</p>
        <p className="font-bold text-2xl">{id}</p>
        <p className="text-xl">${(numericPrice * quantity).toFixed(2)}</p>
        <p>{stock === 0 ? "Sold Out" : `${stock} in Stock`}</p>

        <div className="flex items-center gap-2 my-2">
          <button
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            disabled={stock === 0}
            className="bg-black text-white px-3 py-1 rounded hover:bg-green-400 hover:text-black transition"
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
            className="w-16 text-center border rounded"
          />

          <button
            onClick={() => setQuantity(quantity < stock ? quantity + 1 : stock)}
            disabled={stock === 0}
            className="bg-black text-white px-3 py-1 rounded hover:bg-green-400 hover:text-black transition"
          >
            +
          </button>
        </div>

        <button
          onClick={handleBuyNow}
          disabled={stock === 0}
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-400 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default WatchCard;
