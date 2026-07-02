import { Link } from 'react-router-dom'
import { HiOutlineUser } from 'react-icons/hi'
import { IoIosSearch } from 'react-icons/io'
import { Heart, ShoppingCart } from 'lucide-react'
import { BiMenuAltRight } from 'react-icons/bi'

type Navbar_MobileProps = {
  className?: string
  variant?: 'default' | 'about' | 'shop'
}

const shopNavLinks = [
  { to: '/', label: 'Home', activeStyle: 'font-bold text-primary' },
  { to: '/shop', label: 'Shop', activeStyle: 'font-normal text-gray-light' },
  { to: '/team', label: 'About', activeStyle: 'font-normal text-gray-light' },
  { to: '/blog', label: 'Blog', activeStyle: 'font-normal text-gray-light' },
  { to: '/contact', label: 'Contact', activeStyle: 'font-bold text-gray-light' },
  { to: '/pagesS', label: 'Pages', activeStyle: 'font-normal text-gray-light' },
]

const homeNavLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Product' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
]

const Navbar_Mobile = ({
  className = 'mt-0 mb-0 w-full md:hidden',
  variant = 'default',
}: Navbar_MobileProps) => {
  const isAbout = variant === 'about'
  const isShop = variant === 'shop'
  const isHome = variant === 'default'
  const hasTopBar = isAbout || isShop || isHome

  return (
    <section
      className={`flex w-full items-center justify-center md:hidden ${
        isAbout ? 'bg-text-gray' : ''
      } ${className}`}
    >
      <div
        className={`mobile-menu flex w-full flex-col items-center px-8 pt-4 pb-16 md:hidden ${
          isAbout ? 'bg-text-gray' : 'bg-white'
        }`}
      >
        {hasTopBar && (
          <div className="mb-14 flex h-[90px] w-full items-center justify-between">
            <Link to="/" className="text-2xl font-bold tracking-wide text-primary">
              Bandage
            </Link>
            {isShop ? (
              <BiMenuAltRight className="h-7 w-7 text-primary" aria-label="Menu" />
            ) : (
              <div className="flex items-center gap-5 text-gray-light">
                <IoIosSearch className="h-7 w-7" />
                <ShoppingCart className="h-6 w-6" />
                <BiMenuAltRight className="h-7 w-7" />
              </div>
            )}
          </div>
        )}

        <div className="flex w-full flex-col items-center gap-12 py-2 text-3xl font-medium leading-7 text-gray-light">
          {isShop
            ? shopNavLinks.map(({ to, label, activeStyle }) => (
                <Link key={to} to={to} className={activeStyle}>
                  {label}
                </Link>
              ))
            : homeNavLinks.map(({ to, label }) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
        </div>

        {isShop && (
          <div className="mt-12 flex w-full flex-col items-center gap-12 text-secondary">
            <Link to="/login" className="flex items-center gap-2 text-sm font-bold leading-6">
              <HiOutlineUser className="h-4 w-4" />
              Login / Register
            </Link>
            <Link to="/search" aria-label="Ara">
              <IoIosSearch className="h-6 w-6" />
            </Link>
            <Link to="/cart" aria-label="Sepet" className="flex items-center gap-1">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-sm font-bold leading-6">1</span>
            </Link>
            <Link to="/wishlist" aria-label="Favoriler" className="flex items-center gap-1">
              <Heart className="h-6 w-6" />
              <span className="text-sm font-bold leading-6">1</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default Navbar_Mobile
