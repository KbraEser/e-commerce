import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Heart } from 'lucide-react'
import { BiMenuAltRight } from 'react-icons/bi'
import type { RootState } from '../store'
import UserNavItem from './UserNavItem'
import ShopNavDropdown from './ShopNavDropdown'
import CartDropdown from './CartDropdown'
import SearchBox from './SearchBox'

type NavbarProps = {
  constrained?: boolean
}


const Navbar = ({ constrained = false }: NavbarProps) => {
  const favoriteCount = useSelector((state: RootState) => state.favorite.products.length)

  return (
    <section className='bg-white my-3 w-full'>
      <div
        className={`flex h-14 items-center px-9 py-3 ${
          constrained ? 'mx-auto max-w-[1050px]' : ''
        }`}
      >
   
    <Link to="/" className="brand-logo mr-30 w-[187px]">
        <h1 className='text-2xl leading-8 text-primary'>Bandage</h1>
    </Link>

    <div className='flex justify-end md:justify-between items-center w-full'>

    <div className='hidden md:flex items-center gap-4 text-gray-light'>
        <Link to="/" >Home</Link>
        <ShopNavDropdown />
        <Link to="/team" >About</Link>
        <Link to="/blog" >Blog</Link>
        <Link to="/contact" >Contact</Link>
        <Link to="/pages" >Pages</Link>

    </div>

    <div className='text-primary md:text-secondary flex justify-end items-center'>

    <UserNavItem className="hidden md:flex login-register" />
    

    <SearchBox iconClassName='w-6 h-6' />

    <CartDropdown />

    <Link to="/wishlist" aria-label="Favoriler" className='hidden md:flex items-center gap-1'>
    <Heart className='w-6 h-6' />
    <span className='font-light leading-6'>{favoriteCount}</span>
    </Link>

    <Link to="/section" aria-label="Menu" className='flex md:hidden items-center gap-1'>
    <BiMenuAltRight className='w-6 h-6' />
    
    </Link>

    </div>
    </div>
    </div>

    
    </section>
  );
};

export default Navbar;