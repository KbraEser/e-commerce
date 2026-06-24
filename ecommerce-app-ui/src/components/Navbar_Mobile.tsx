import React from 'react'
import { Link } from 'react-router-dom'

const Navbar_Mobile = () => {
  return (
    <section className='flex justify-center items-center w-full mt-20'>
    <div className='mobile-menu flex flex-col justify-between items-center md:hidden w-32 h-64 bg-white font-medium text-3xl leading-7 text-gray-light'>
        <Link to="/" className=''>Home</Link>
        <Link to="/shop" >Product</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/contact" >Contact</Link>
      </div>
      </section>
  )
}

export default Navbar_Mobile