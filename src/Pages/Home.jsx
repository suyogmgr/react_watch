import React from "react";
import heroImg from "../assets/pkmn.jpg";

const Home = () => {
  return (
    <main className="pt-[6rem]">
      <div className="relative w-full">
        <img
          className="w-full h-full object-cover"
          src={heroImg}
          alt="heroImg"
        />
      </div>
      <div className="absolute overflow-hidden inset-0 flex justify-center items-center text-center flex-col">
        <h1 className="text-white text-7xl font-bold p-6">
          Your Perfect Watch, <br />
          Your Perfect Style
        </h1>
        <p className="text-white text-2xl py-8">
          Discover the perfect balance of elegence and precision with our
          exclusive collection of timeless watches.
        </p>
        
        <div>
            <button className="text-white text-2xl bg-red-700 p-4 rounded-[5px] hover:scale-[1.2] transition-all duration-250 active:scale-[1]">
            Shop Now
            </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
