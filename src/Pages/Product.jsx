import React, { useEffect, useState } from 'react';
import WatchCard from '../components/WatchCard';
import defaultWatches from '../data/watches.json';

const parsePrice = (p) => parseInt(String(p).replace(/\D/g, "")) || 0;

const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "low" },
  { label: "Price: High to Low", value: "high" },
  { label: "Best Selling", value: "best" },
];

const Product = () => {
  const [watches, setWatches] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const stored = localStorage.getItem('watches');
    setWatches(stored ? JSON.parse(stored) : defaultWatches);
  }, []);

  const models = ['All', ...new Set(watches.map(w => w.model))];
  let filtered = filter === 'All' ? watches : watches.filter(w => w.model === filter);
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "low") return parsePrice(a.price) - parsePrice(b.price);
    if (sortBy === "high") return parsePrice(b.price) - parsePrice(a.price);
    if (sortBy === "best") return (a.stock || 0) - (b.stock || 0);
    return 0;
  });

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

      {/* Filter & Sort */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4 flex flex-wrap gap-3 items-center justify-center">
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
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="ml-auto px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
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
