import React from "react";
import heroImg from "../assets/pkmn.jpg";
import { Link } from 'react-router-dom';
import watchbg from '../assets/watchbg.jpg';

const Home = () => {
  return (
    <main className="w-full">
      <div className="relative w-full">
        <img
          className="w-full h-full object-cover"
          src={watchbg}
          alt="bg-img"
        />
      </div>
      <div className="absolute overflow-hidden inset-0 flex justify-center items-center text-center flex-col">
        <h1 className="text-8xl font-bold p-6 bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent" id="fontStyle">
          Your Perfect Watch, <br />
          Your Perfect Style
        </h1>
        <p className="text-white font-bold text-2xl py-8" id="fontStyle">
          Discover the perfect balance of elegence and precision with our
          exclusive collection of timeless watches.
        </p>
        
        <div>
            <button className="text-white text-2xl bg-blue-700 p-4 rounded-[5px] hover:scale-[1.2] active:bg-blue-500 transition-all duration-250 active:scale-[1]">
            <Link to='/Product'> Shop Now </Link>
            </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
