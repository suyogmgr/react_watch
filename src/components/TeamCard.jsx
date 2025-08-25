import React from 'react';

const TeamCard = ({img, name, title, link}) => {
  return (
    <div className='bg-gray-200 rounded-xl p-10 hover:-translate-y-5 transition duration-200 hover:bg-gray-100 active:scale-95 ease-in-out'>
        <a href={link} target='_blank'>
          <img src={img} alt={name} className='object-cover w-60 h-60 rounded-[50%]'/>
          <h1 className='font-bold text-2xl pt-4' >{name}</h1>
          <h3 className='text-xl' >{title}</h3>
        </a>
    </div>
  )
}

export default TeamCard