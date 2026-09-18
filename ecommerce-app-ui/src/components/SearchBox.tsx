import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoIosSearch } from 'react-icons/io'
import type { AppDispatch } from '../store'
import { setFilter, setOffset } from '../store/slice/productSlice'
import { fetchProducts } from '../store/thunks/productThunks'

type SearchBoxProps = {
  iconClassName?: string
}

const SearchBox = ({ iconClassName = 'h-6 w-6' }: SearchBoxProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (!query.trim()) return

    dispatch(setFilter(query.trim()))
    dispatch(setOffset(0))
    dispatch(fetchProducts())
    navigate('/shop')
    setOpen(false)
  }

  if (open) {
    return (
      <input
        type="text"
        autoFocus
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleSearch()
          if (event.key === 'Escape') setOpen(false)
        }}
        onBlur={() => setOpen(false)}
        placeholder="Ürün ara..."
        aria-label="Ürün ara"
        className="w-28 rounded-md border border-light-open-gray px-2 py-1 text-sm text-primary outline-none focus:border-primary sm:w-40"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Ara"
      className="cursor-pointer transition-colors hover:text-secondary active:text-secondary"
    >
      <IoIosSearch className={iconClassName} />
    </button>
  )
}

export default SearchBox
