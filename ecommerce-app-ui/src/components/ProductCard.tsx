import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { toast } from 'react-toastify'
import type { AppDispatch, RootState } from '../store'
import type { Product } from '../store/types'
import { findCategoryForProduct, getProductPath } from '../utils/categoryUtils'
import { addFavoriteProduct, removeFavoriteProduct } from '../store/thunks/favoriteThunks'
import { addToCart } from '../store/slice/shoppingCartSlice'

type ProductCardProps = {
  showHeader?: boolean
  headerTitleOnly?: boolean
  products: Product[]
  viewMode?: 'grid' | 'list'
}

const ProductCard = ({
  showHeader = true,
  headerTitleOnly = false,
  products,
  viewMode = 'grid',
}: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const categories = useSelector((state: RootState) => state.product.categories)
  const user = useSelector((state: RootState) => state.client.user)
  const favoriteProducts = useSelector((state: RootState) => state.favorite.products)
  const favoriteIds = new Set(favoriteProducts.map((product) => product.id))

  const handleToggleFavorite = (event: React.MouseEvent, product: Product) => {
    event.preventDefault()
    event.stopPropagation()

    if (!user) {
      toast.info('Favorilere eklemek için giriş yapmalısınız.')
      navigate('/login')
      return
    }

    if (favoriteIds.has(product.id)) {
      dispatch(removeFavoriteProduct(product.id))
    } else {
      dispatch(addFavoriteProduct(product.id))
    }
  }

  const renderStars = (rating: number) => (
    <div className='flex items-center gap-0.5'>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`h-3.5 w-3.5 ${
            index < Math.round(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-light-open-gray text-light-open-gray'
          }`}
        />
      ))}
      <span className='ml-1 text-xs font-medium text-gray-light'>({rating})</span>
    </div>
  )

  const handleAddToCart = (event: React.MouseEvent, product: Product) => {
    event.preventDefault()
    event.stopPropagation()

    dispatch(addToCart(product))
    toast.success('Ürün sepete eklendi')
  }

  return (
    <section
      className={`product-card w-full ${
        headerTitleOnly ? 'bg-text-gray' : 'bg-white'
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1124px] flex-col gap-12 px-4 py-20 sm:px-6 md:px-12 ${
          headerTitleOnly ? 'items-start' : 'items-center'
        }`}
      >
        {showHeader && (
          <div
            className={
              headerTitleOnly ? 'w-full text-left' : 'w-68 md:w-80 text-center'
            }
          >
            {!headerTitleOnly && (
              <span className='mb-2 block text-xl font-normal text-gray-light'>
                Featured Products
              </span>
            )}
            <h2
              className={`text-2xl font-bold uppercase text-primary ${
                headerTitleOnly ? '' : 'mb-3'
              }`}
            >
              BESTSELLER PRODUCTS
            </h2>
            {!headerTitleOnly && (
              <p className='text-sm font-normal text-gray-light'>
                Problems trying to resolve the conflict between
              </p>
            )}
          </div>
        )}

        {viewMode === 'list' ? (
          <div className='mx-auto grid w-full max-w-[1124px] grid-cols-1 gap-4 sm:grid-cols-2'>
            {products.map((product) => {
              const category = findCategoryForProduct(product, categories)
              const productPath = category
                ? getProductPath(product, category)
                : `/shop`

              return (
                <Link
                  key={product.id}
                  to={productPath}
                  className='group flex w-full cursor-pointer items-center gap-6 rounded-md border border-light-open-gray p-4 text-left transition-shadow duration-300 hover:shadow-lg'
                >
                  <div className='relative flex h-[140px] w-[110px] shrink-0 overflow-hidden'>
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10' />
                  </div>
                  <div className='flex-1 text-center'>
                    <h3 className='mb-1.5 text-base font-bold text-primary transition-colors duration-300 group-hover:text-secondary'>
                      {product.name}
                    </h3>
                    <div className='mb-1.5 flex justify-center'>{renderStars(product.rating)}</div>
                    <div className='text-sm font-bold text-teal-600'>
                      ₺{product.price}
                    </div>
                  </div>
                  <div className='flex shrink-0 items-center gap-3'>
                    <button
                      type='button'
                      onClick={(event) => handleToggleFavorite(event, product)}
                      aria-label='Favorilere ekle'
                      className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-light-open-gray transition-colors hover:border-red'
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          favoriteIds.has(product.id)
                            ? 'fill-red text-red'
                            : 'text-gray-light'
                        }`}
                      />
                    </button>
                    <button
                      type='button'
                      onClick={(event) => handleAddToCart(event, product)}
                      aria-label='Sepete ekle'
                      className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-light-open-gray transition-colors hover:border-secondary'
                    >
                      <ShoppingCart className='h-4 w-4 text-gray-light transition-colors hover:text-secondary' />
                    </button>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className='mx-auto flex w-full max-w-[1124px] flex-wrap justify-center gap-x-6 gap-y-12'>
            {products.map((product) => {
              const category = findCategoryForProduct(product, categories)
              const productPath = category
                ? getProductPath(product, category)
                : `/shop`

              return (
                <Link
                  key={product.id}
                  to={productPath}
                  className='group flex w-full cursor-pointer flex-col items-center text-center transition-shadow duration-300 hover:shadow-lg sm:w-[calc(50%-12px)] md:w-[calc(25%-18px)]'
                >
                  <div className='relative mb-6 flex h-[350px] w-full items-center justify-center overflow-hidden'>
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className='h-[350px] w-[348px] object-cover transition-transform duration-500 group-hover:scale-110 md:h-[427px] md:w-[238px]'
                    />
                    <div className='absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10' />
                    <button
                      type='button'
                      onClick={(event) => handleToggleFavorite(event, product)}
                      aria-label='Favorilere ekle'
                      className='absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110'
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          favoriteIds.has(product.id)
                            ? 'fill-red text-red'
                            : 'text-gray-light'
                        }`}
                      />
                    </button>
                  </div>
                  <h3 className='mb-1.5 text-base font-bold text-primary transition-colors duration-300 group-hover:text-secondary'>
                    {product.name}
                  </h3>
                  <div className='mb-1.5 flex justify-center'>{renderStars(product.rating)}</div>
                  <div className='mb-4 text-sm font-bold text-teal-600'>
                    ₺{product.price}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductCard
