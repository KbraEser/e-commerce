import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Heart, ShoppingCart } from 'lucide-react'
import { BiMenuAltRight } from 'react-icons/bi'
import type { RootState } from '../store'
import UserNavItem from './UserNavItem'
import SearchBox from './SearchBox'
import { getCartTotalCount } from '../utils/cartUtils'

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
  { to: '/pages', label: 'Pages', activeStyle: 'font-normal text-gray-light' },
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
  const favoriteCount = useSelector((state: RootState) => state.favorite.products.length)
  const cart = useSelector((state: RootState) => state.shoppingCart.cart)
  const cartCount = getCartTotalCount(cart)

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
            <Link
              to="/"
              className="text-2xl font-bold tracking-wide text-primary transition-colors hover:text-secondary"
            >
              Bandage
            </Link>
            {isShop ? (
              <BiMenuAltRight className="h-7 w-7 text-primary" aria-label="Menu" />
            ) : (
              <div className="flex items-center gap-5 text-gray-light">
                <SearchBox iconClassName="h-7 w-7" />
                <Link
                  to="/cart"
                  aria-label="Sepet"
                  className="flex items-center gap-1 transition-colors hover:text-secondary active:text-secondary"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="text-sm font-bold leading-6">{cartCount}</span>
                </Link>
                <BiMenuAltRight className="h-7 w-7" />
              </div>
            )}
          </div>
        )}

        <div className="flex w-full flex-col items-center gap-12 py-2 text-3xl font-medium leading-7 text-gray-light">
          {isShop
            ? shopNavLinks.map(({ to, label, activeStyle }) => (
                <Link
                  key={to}
                  to={to}
                  className={`${activeStyle} transition-colors hover:text-secondary active:text-secondary`}
                >
                  {label}
                </Link>
              ))
            : homeNavLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="transition-colors hover:text-secondary active:text-secondary"
                >
                  {label}
                </Link>
              ))}
        </div>

        {isShop && (
          <div className="mt-12 flex w-full flex-col items-center gap-12 text-secondary">
            <UserNavItem className="text-sm font-bold leading-6" />
            <SearchBox iconClassName="h-6 w-6" />
            <Link to="/cart" aria-label="Sepet" className="flex items-center gap-1">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-sm font-bold leading-6">{cartCount}</span>
            </Link>
            <Link
              to="/wishlist"
              aria-label="Favoriler"
              className="flex items-center gap-1 transition-colors hover:text-red active:text-red"
            >
              <Heart className="h-6 w-6" />
              <span className="text-sm font-bold leading-6">{favoriteCount}</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default Navbar_Mobile
