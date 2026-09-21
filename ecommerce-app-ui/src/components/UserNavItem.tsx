import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Gravatar from 'react-gravatar'
import type { AppDispatch, RootState } from '../store'
import { setUser } from '../store/slice/clientSlice'
import { clearFavorites } from '../store/slice/favoriteSlice'
import { logout } from '../service/authService'
import { ChevronDown, UserCircleIcon } from 'lucide-react'

type UserNavItemProps = {
  className?: string
}

const UserNavItem = ({ className = '' }: UserNavItemProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.client.user)

  const handleLogout = () => {
    logout()
    dispatch(setUser(null))
    dispatch(clearFavorites())
    navigate('/login')
  }

  if (user) {
    return (
      <div className={`relative px-5 ${className}`}>
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center gap-2">
            <Gravatar
              email={user.email}
              size={32}
              className="rounded-full"
              default="mp"
            />
            <span className="text-sm font-bold leading-6">{user.name}</span>
            <ChevronDown className="h-4 w-4 text-gray-light transition-transform group-open:rotate-180" />
          </summary>

          <div className="absolute right-0 z-30 mt-2 min-w-[200px] overflow-hidden rounded-md border border-light-open-gray bg-white shadow-lg">
            <Link
              to="/orders"
              className="block cursor-pointer px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-text-gray"
            >
              Önceki Siparişlerim
            </Link>
            <Link
              to="/wishlist"
              className="block cursor-pointer px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-text-gray"
            >
              Beğendiklerim
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full cursor-pointer px-4 py-2 text-left text-sm font-medium text-primary transition-colors hover:bg-text-gray"
            >
              Çıkış Yap
            </button>
          </div>
        </details>
      </div>
    )
  }

  return (
    <Link
      to="/login"
      state={{ from: location.pathname }}
      className={`flex items-center px-5 ${className}`}
    >
      <UserCircleIcon className="mr-1 h-4 w-4" />
      <span className="whitespace-nowrap text-xs leading-6">Giriş / Kayıt</span>
    </Link>
  )
}

export default UserNavItem
