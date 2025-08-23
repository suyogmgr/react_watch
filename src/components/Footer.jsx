import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-black'>
        <div className='py-20 text-center text-white text-xl'>
            @ {new Date().getUTCFullYear()} MyWebsite. All rights reserved.
        </div>
    </footer>
  )
}

export default Footer