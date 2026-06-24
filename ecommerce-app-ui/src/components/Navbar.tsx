import { Link } from 'react-router-dom'
import { HiOutlineUser } from 'react-icons/hi'
import { IoIosSearch } from 'react-icons/io'
import { Heart, Menu, ShoppingCart } from 'lucide-react'
import { BiMenuAltRight } from 'react-icons/bi'

const Navbar = () => {
  return (
    <section className='bg-white h-14 py-3 my-3 flex  items-center  px-9'>
   
    <Link to="/" className="brand-logo mr-30 w-[187px]">
        <h1 className='text-2xl leading-8 text-primary'>Bandage</h1>
    </Link>

    <div className='flex justify-end md:justify-between items-center w-full'>

    <div className='hidden md:flex items-center gap-4 text-gray-light'>
        <Link to="/" >Home</Link>
        <Link to="/shop" >Shop</Link>
        <Link to="/categories" >About</Link>
        <Link to="/blog" >Blog</Link>
        <Link to="/contact" >Contact</Link>
        <Link to="/pagesS" >Pages</Link>

    </div>

    <div className='text-primary md:text-secondary flex justify-end items-center'>

    <Link to="/login" className="hidden lg:flex login-register items-center px-5">
    <HiOutlineUser className='w-4 h-4 mr-1' />
        <span className='text-sm leading-6'>Login / Register</span>
    </Link>
    

    <Link to="/search" aria-label="Ara" >
    <IoIosSearch className='w-6 h-6 ' />
    </Link>

    <Link to="/cart" aria-label="Sepet" className='flex items-center px-4 gap-1'>
    <ShoppingCart className='w-6 h-6' />
    <span className='hidden md:flex font-light leading-6'>0</span>
    </Link>

    <Link to="/wishlist" aria-label="Favoriler" className='hidden md:flex items-center gap-1'>
    <Heart className='w-6 h-6' />
    <span className='font-light leading-6'>0</span>
    </Link>

    <Link to="/section" aria-label="Menu" className='flex md:hidden items-center gap-1'>
    <BiMenuAltRight className='w-6 h-6' />
    
    </Link>

    </div>
    </div>

    
    </section>
  );
};

export default Navbar;