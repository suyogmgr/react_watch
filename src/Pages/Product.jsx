import React, { useEffect, useState } from 'react';
import WatchCard from '../components/WatchCard';
import defaultWatches from '../data/watches.json';

const Product = () => {
  const [watches, setWatches] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const stored = localStorage.getItem('watches');
    setWatches(stored ? JSON.parse(stored) : defaultWatches);
  }, []);

  const models = ['All', ...new Set(watches.map(w => w.model))];
  const filtered = filter === 'All' ? watches : watches.filter(w => w.model === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm">Collection</p>
          <h1 className="text-4xl font-bold text-gray-900 mt-3" id="fontStyle">Our Watches</h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Explore our curated selection of premium timepieces.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {models.map(m => (
            <button
              key={m}
              onClick={() => setFilter(m)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === m
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No watches found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((watch) => (
              <WatchCard
                key={watch.id}
                model={watch.model}
                img={watch.img}
                id={watch.id}
                price={watch.price}
                stock={watch.stock}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
