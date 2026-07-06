import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'
import { fetchCategories } from '../store/thunks/productThunks'
import { getCategoryPath } from '../utils/categoryUtils'

export default function FeaturedCategories() {
  const dispatch = useDispatch<AppDispatch>()
  const categories = useSelector((state: RootState) => state.product.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const topCategories = useMemo(
    () => [...categories].sort((a, b) => b.rating - a.rating).slice(0, 5),
    [categories]
  )

  if (topCategories.length === 0) {
    return null
  }

  return (
    <div className="w-full bg-text-gray py-8">
      <div className="mx-auto max-w-[1250px] px-6 md:px-24">
        <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
          {topCategories.map((category) => (
            <Link
              key={category.id}
              to={getCategoryPath(category)}
              className="group relative flex h-[250px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden md:flex-1"
            >
              <img
                src={category.img}
                alt={category.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/45" />

              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
                <h3 className="mb-1 text-base font-bold uppercase tracking-wide">
                  {category.title}
                </h3>
                <p className="text-xs font-medium opacity-90">
                  Rating: {category.rating}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
