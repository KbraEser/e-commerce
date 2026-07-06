import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import type { Category } from '../store/types'
import { getCategoryPath } from '../utils/categoryUtils'

const genderGroups = [
  { key: 'k', label: 'Kadın' },
  { key: 'e', label: 'Erkek' },
] as const

const ShopNavDropdown = () => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const categories = useSelector((state: RootState) => state.product.categories)

  const getByGender = (gender: string): Category[] =>
    categories.filter((category) => category.gender === gender)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 transition-colors hover:text-primary"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Shop
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 pt-3">
          <div className="min-w-[420px] rounded-sm bg-white px-10 py-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            {categories.length === 0 ? (
              <p className="text-sm text-gray-light">Kategoriler yükleniyor...</p>
            ) : (
              <div className="grid grid-cols-2 gap-12">
                {genderGroups.map(({ key, label }) => (
                  <div key={key}>
                    <h3 className="mb-5 text-base font-bold text-primary">
                      {label}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {getByGender(key).map((category) => (
                        <li key={category.id}>
                          <Link
                            to={getCategoryPath(category)}
                            className="text-sm font-semibold capitalize text-gray-light transition-colors hover:text-secondary"
                            onClick={() => setOpen(false)}
                          >
                            {category.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 border-t border-light-open-gray pt-4">
              <Link
                to="/shop"
                className="text-sm font-bold text-secondary hover:underline"
                onClick={() => setOpen(false)}
              >
                Tüm ürünleri gör
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShopNavDropdown
