import React from "react";
import { Link } from 'react-router-dom';
import watchbg from '../assets/watchbg.jpg';

const features = [
  {
    title: "Premium Quality",
    desc: "Curated from top brands ensuring durability, precision, and timeless design.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Fast Shipping",
    desc: "Free worldwide delivery on all orders. Track your package every step of the way.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    )
  },
  {
    title: "24/7 Support",
    desc: "Our team is here around the clock to help you find the perfect timepiece.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 11-12.728 0m9.9 4.243a4.5 4.5 0 11-6.364 0" />
      </svg>
    )
  }
];

const Home = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img className="absolute inset-0 w-full h-full object-cover" src={watchbg} alt="" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-blue-400 tracking-[0.2em] uppercase text-sm font-semibold mb-4">Premium Collection 2026</p>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight" id="fontStyle">
            Your Perfect Watch,<br />
            <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">Your Perfect Style</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Discover the perfect balance of elegance and precision with our exclusive collection of timeless watches from the world's most trusted brands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/Product" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 active:scale-95">
              Shop Now
            </Link>
            <Link to="/About_Us" className="border border-white/30 hover:border-white text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all hover:bg-white/10 active:scale-95">
              About Us
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm">Collections</p>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Explore Our Collections</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">From rugged durability to sleek elegance, find the watch that matches your personality.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/Product" className="group relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-lg">G-Shock</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
                <h3 className="text-2xl font-bold text-white">G-Shock</h3>
                <p className="text-gray-300 mt-2">Tough, shock-resistant watches built for adventure.</p>
                <span className="inline-block mt-4 text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Browse Collection &rarr;
                </span>
              </div>
            </Link>
            <Link to="/Product" className="group relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Baby-G</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
                <h3 className="text-2xl font-bold text-white">Baby-G</h3>
                <p className="text-gray-300 mt-2">Compact, colorful designs with the same rugged spirit.</p>
                <span className="inline-block mt-4 text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Browse Collection &rarr;
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm">Why Choose Us</p>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">The Watch Shop Difference</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6" id="fontStyle">Ready to Find Your Perfect Watch?</h2>
          <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
            Browse our full collection of premium watches and find the one that speaks to you.
          </p>
          <Link to="/Product" className="inline-block bg-white text-blue-700 px-12 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
            Browse All Watches
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
