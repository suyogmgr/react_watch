import React from 'react'
import TeamCard from '../components/TeamCard';
import pras from '../assets/pras1.jpg';
import suyog from '../assets/suyog1.jpg';
import bed from '../assets/bed.jpg';
import sushan from '../assets/sushan1.jpg';

const About_Us = () => {
  return (
    <div className='h-[100vh] flex justify-center items-center gap-8 flex-wrap text-center'>
      <TeamCard img={pras} name='Gorakh Bikram Baral' title='Student' link='https://gorakhbikrambaral.com.np/'/>
      <TeamCard img={suyog} name='Suyog Rana Magar' title='Developer' link='https://suyogranamagar.com.np'/>
      <TeamCard img={bed} name='Bed Raj Khadka' title='Student' link='https://suyogranamagar.com.np'/>
      <TeamCard img={sushan} name='Sushan Gautam' title='Student' link='https://gautamsushan23.github.io/Protfolio/'/>
    </div>
  )
}

export default About_Us