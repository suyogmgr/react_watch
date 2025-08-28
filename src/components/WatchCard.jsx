import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const WatchCard = ({model, img, id, price, stock}) => {

  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    //set default val to 1 if NAN
    let value = parseInt(e.target.value) || 1;
    if(value > stock) value = stock;
    if(value < 1) value = 1;
    setQuantity(value);
  };

  return (
    <div className='bg-white transition duration-200 ease-in-out'>
        <img src={img} alt={id} className='object-cover h-80 w-80 bg-cyan-100'/>
        <div>
            <div className='p-2 leading-10'>
                <p className='uppercase'>{model}</p>
                <p className='font-bold text-2xl'>{id}</p>
                <p className='text-xl'>{price}</p>
                <p>{stock === 0 ? "Sold Out" : `${stock} in Stock`}</p>
            </div>
            <button onClick={() => setQuantity(quantity > 1 ? quantity -1 : 1)} disabled ={stock === 0} className='bg-black text-white w-full p-4 hover:bg-green-400 hover:text-black transition ease-in-out duration-300'>
              Buy Now</button>

            <input type="number" value={quantity} onChange={handleChange} min='1' max={stock} disabled={stock === 0} />
            <button onClick={()=> setQuantity(quantity + 1)}>Add</button>
        </div>
    </div>
  )
};

export default WatchCard