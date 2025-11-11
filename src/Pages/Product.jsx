import React, { useEffect, useState } from 'react';
import WatchCard from '../components/WatchCard';
import defaultWatches from '../data/watches.json';

const Product = () => {
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('watches');
    console.log('Stored watches:', stored);
    console.log('Default watches:', defaultWatches);
    setWatches(stored ? JSON.parse(stored) : defaultWatches);
  }, []);


  return (
    <div className="p-10 flex flex-wrap gap-8 justify-center items-center">
      {watches.map((watch) => (
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
  );
};

export default Product;