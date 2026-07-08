import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import type { Product } from '../store/types'
import { findCategoryForProduct, getProductPath } from '../utils/categoryUtils'

type ProductCardProps = {
  showHeader?: boolean
  headerTitleOnly?: boolean
  products: Product[]
}

const ProductCard = ({
  showHeader = true,
  headerTitleOnly = false,
  products,
}: ProductCardProps) => {
  const categories = useSelector((state: RootState) => state.product.categories)

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
                <div className='relative mb-6 flex w-full justify-center overflow-hidden md:aspect-[3/4]'>
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className='h-[427px] w-[348px] object-cover transition-transform duration-500 group-hover:scale-110 md:h-[427px] md:w-[238px]'
                  />
                  <div className='absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10' />
                </div>
                <h3 className='mb-1.5 text-base font-bold text-primary transition-colors duration-300 group-hover:text-secondary'>
                  {product.name}
                </h3>
                <div className='mb-4 text-sm font-bold text-teal-600'>
                  ₺{product.price}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductCard
