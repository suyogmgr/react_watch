import React from 'react'
import { Link } from 'react-router-dom';

const WatchCard = ({model, img, id, price}) => {
  return (
    <div className='bg-white hover:-translate-y-5 transition duration-200 active:translate-0'>
        <img src={img} alt={id} className='object-cover h-80 w-80 bg-cyan-100'/>
        <div>
            <div className='p-2 leading-10'>
                <p className='uppercase'>{model}</p>
                <p className='font-bold text-2xl'>{id}</p>
                <p className='text-xl'>{price}</p>
            </div>
            <button className='bg-black text-white w-full p-4'>Buy Now</button>
        </div>
    </div>
  )
}

export default WatchCard