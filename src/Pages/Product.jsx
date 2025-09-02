import React from 'react'

import WatchCard from '../components/WatchCard';
import babyG from '../assets/product/image.avif';
import babyG1 from '../assets/product/BA110AH-6A.avif';
import babyG2 from '../assets/product/BA110AH-9A.avif';
import Gshock from '../assets/product/GA010GB-1A9.avif';
import Gshock1 from '../assets/product/GA010GGB-1A9.avif';
import Gshock2 from '../assets/product/GA010GGB-1A9.avif';
import Gshock3 from '../assets/product/GD010GB-1A9.avif';
import Gshock4 from '../assets/product/GMAP2100PC4A.avif';
import Gshock5 from '../assets/product/MTGB40001A.avif';
import Gshock6 from '../assets/product/GBX100S-1.avif';
import Gshock7 from '../assets/product/GMAP2100M-4A.avif';
import Gshock8 from '../assets/product/GA110HDS-7A.avif';
import Gshock9 from '../assets/product/GPRH1000RY1A.avif';
import Gshock10 from '../assets/product/MRGB2100R-2A.avif';
import Gshock11 from '../assets/product/GMAS110ST-2A.avif';
import Gshock12 from '../assets/product/MTGB2000YST1.avif';

const watches = [
    {model: 'Baby-G', id: 'BA110AH-4A', price: '$130.00', img: babyG, stock: 20},
    {model: 'Baby-G', id: 'BA110AH-6A', price: '$130.00', img: babyG1, stock: 23},
    {model: 'Baby-G', id: 'BA110AH-9A', price: '$130.00', img: babyG2, stock: 42},
    {model: 'G-Shock', id: 'GA010GB-1A9', price: '$130.00', img: Gshock, stock: 8},
    {model: 'G-Shock', id: 'GA010GGB-1A9', price: '$150.00', img: Gshock1, stock: 10},
    {model: 'G-Shock', id: 'GA100GGB-1A9', price: '$130.00', img: Gshock2, stock: 15},
    {model: 'G-Shock', id: 'GD010GB-1A9', price: '$110.00', img: Gshock3, stock: 15},
    {model: 'G-Shock', id: 'GMAP2100PC4A', price: '$110.00', img: Gshock4, stock: 15},
    {model: 'G-Shock', id: 'MTGB40001A', price: '$1250.00', img: Gshock5, stock: 15},
    {model: 'G-Shock', id: 'GBX100S-1', price: '$170.00', img: Gshock6, stock: 15},
    {model: 'G-Shock', id: 'GMAP2100M-4A', price: '$99.00', img: Gshock7, stock: 15},
    {model: 'G-Shock', id: 'GA110HDS-7A', price: '$140', img: Gshock8, stock: 15},
    {model: 'G-Shock', id: 'GPRH1000RY1A', price: '$500.00', img: Gshock9, stock: 15},
    {model: 'G-Shock', id: 'MRGB2100R-2A', price: '$3,800.00', img: Gshock10, stock: 15},
    {model: 'G-Shock', id: 'GMAS110ST-2A', price: '$140.00', img: Gshock11, stock: 15},
    {model: 'G-Shock', id: 'MTGB2000YST1', price: '$1450.00', img: Gshock12, stock: 15},
];


const Product = () => {
  return (
    <div className='p-10 flex flex-wrap gap-8 justify-center items-center'>
        {watches.map((watch) =>
            <WatchCard 
                model={watch.model}
                img={watch.img}
                id={watch.id}
                price={watch.price}
                stock={watch.stock}
            />
        )}
    </div>
  )
}

export default Product