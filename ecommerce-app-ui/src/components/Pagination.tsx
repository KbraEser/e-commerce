import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'
import { setOffset } from '../store/slice/productSlice'
import { fetchProducts } from '../store/thunks/productThunks'

export default function Pagination() {
  const dispatch = useDispatch<AppDispatch>()
  const { total, limit, offset } = useSelector((state: RootState) => state.product)

  const totalPages = Math.ceil(total / limit)
  const currentPage = Math.floor(offset / limit) + 1

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return

    const newOffset = (page - 1) * limit
    dispatch(setOffset(newOffset))
    dispatch(fetchProducts())
  }

  if (totalPages <= 1) return null

  const pageButtonClass = (page: number) =>
    `flex items-center justify-center px-5 py-6 text-sm font-bold border-r border-[#DEDEDE] transition-colors ${
      currentPage === page
        ? 'bg-secondary text-white'
        : 'bg-white text-secondary hover:bg-gray-50'
    }`

  return (
    <div className="flex items-center justify-center py-6 bg-white mb-7">
      <nav className="flex items-stretch bg-white border border-light-open-gray rounded-lg shadow-sm overflow-hidden select-none">
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center px-6 py-6 text-sm font-bold border-r border-light-open-gray transition-colors ${
            currentPage === 1
              ? 'bg-light-open-gray text-gray-light cursor-not-allowed'
              : 'bg-white text-secondary hover:bg-gray-50'
          }`}
        >
          First
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={pageButtonClass(page)}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center px-6 py-6 text-sm font-bold transition-colors ${
            currentPage === totalPages
              ? 'bg-light-open-gray text-gray-light cursor-not-allowed'
              : 'bg-white text-secondary hover:bg-gray-50'
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  )
}
