import React from 'react'
import TeamCard from '../components/TeamCard';
import pras from '../assets/pras1.jpg';
import suyog from '../assets/suyog1.jpg';
import bed from '../assets/bed.jpg';
import sushan from '../assets/sushan1.jpg';

const About_Us = () => {
  return (
    <div className='h-[100vh] w-full flex justify-center items-center gap-8 flex-wrap text-center'>
      <TeamCard img={pras} name='Gorakh Bikram Baral' title='Student' />
      <TeamCard img={suyog} name='Suyog Rana Magar' title='Developer' />
      <TeamCard img={bed} name='Bed Raj Khadka' title='Student' />
      <TeamCard img={sushan} name='Sushan Gautam' title='Student' />
    </div>
  )
}

export default About_Us