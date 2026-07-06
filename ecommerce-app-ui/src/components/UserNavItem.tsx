import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Gravatar from 'react-gravatar'
import type { RootState } from '../store'
import { UserCircleIcon } from 'lucide-react'

type UserNavItemProps = {
  className?: string
}

const UserNavItem = ({ className = '' }: UserNavItemProps) => {
  const location = useLocation()
  const user = useSelector((state: RootState) => state.client.user)

  if (user) {
    return (
      <div className={`flex items-center gap-2 px-5 ${className}`}>
        <Gravatar
          email={user.email}
          size={32}
          className="rounded-full"
          default="mp"
        />
        <span className="text-sm font-bold leading-6">{user.name}</span>
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
      <span className="text-sm leading-6">Login / Register</span>
    </Link>
  )
}

export default UserNavItem
