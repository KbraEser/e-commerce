import { Link } from 'react-router-dom'
import shop_cart_1 from '../img/shop_cart-1.jpg'
import shop_cart_2 from '../img/shop_cart-2.jpg'
import shop_cart_3 from '../img/shop_cart-3.jpg'
import shop_cart_4 from '../img/shop_cart-4.jpg'

const productImages = [shop_cart_1, shop_cart_2, shop_cart_3, shop_cart_4]

const createProducts = (count: number) =>
  Array.from({ length: count }).map((_, index) => ({
    id: index + 1,
    title: 'Graphic Design',
    department: 'English Department',
    oldPrice: '$16.48',
    newPrice: '$6.48',
    image: productImages[index % productImages.length],
    colors: ['bg-sky-500', 'bg-teal-600', 'bg-orange-500', 'bg-slate-800'],
  }))

type ProductCardProps = {
  showHeader?: boolean
  headerTitleOnly?: boolean
  count?: number
}

const ProductCard = ({
  showHeader = true,
  headerTitleOnly = false,
  count = 8,
}: ProductCardProps) => {
  const products = createProducts(count)
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
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product-details/${product.id}`}
              className='group flex w-full cursor-pointer flex-col items-center text-center transition-shadow duration-300 hover:shadow-lg sm:w-[calc(50%-12px)] md:w-[calc(25%-18px)]'
            >
              <div className='relative mb-6 flex w-full justify-center overflow-hidden md:aspect-[3/4]'>
                <img
                  src={product.image}
                  alt={product.title}
                  className='h-[427px] w-[348px] object-cover transition-transform duration-500 group-hover:scale-110 md:h-[427px] md:w-[238px]'
                />
                <div className='absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10' />
              </div>
              <h3 className='mb-1.5 text-base font-bold text-primary transition-colors duration-300 group-hover:text-secondary'>
                {product.title}
              </h3>
              <span className='mb-3 block text-xs font-bold text-gray-light'>
                {product.department}
              </span>

              <div className='mb-4 flex items-center gap-2 text-sm font-bold'>
                <span className='text-slate-300 line-through'>
                  {product.oldPrice}
                </span>
                <span className='text-teal-600'>{product.newPrice}</span>
              </div>

              <div className='flex items-center gap-1.5'>
                {product.colors.map((colorClass, index) => (
                  <span
                    key={index}
                    className={`inline-block h-4 w-4 rounded-full shadow-sm transition-transform hover:scale-110 ${colorClass}`}
                  />
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductCard
