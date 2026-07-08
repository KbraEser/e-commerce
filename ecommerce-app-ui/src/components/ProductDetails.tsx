import { Eye, Heart, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import type { AppDispatch } from '../store'
import { addToCart } from '../store/slice/shoppingCartSlice'
import type { Product } from '../store/types'

type ProductDetailsProps = {
  product: Product
}

const getStarParts = (rating: number) => {
  const clamped = Math.min(5, Math.max(0, rating))
  const fullStars = Math.floor(clamped)
  const hasHalfStar = clamped % 1 !== 0

  return {
    fullStars,
    hasHalfStar,
    emptyStars: 5 - fullStars - (hasHalfStar ? 1 : 0),
  }
}

const StarRating = ({ rating }: { rating: number }) => {
  const { fullStars, hasHalfStar, emptyStars } = getStarParts(rating)

  return (
    <div className="flex items-center gap-0.5 text-xl">
      {Array.from({ length: fullStars }, (_, index) => (
        <span key={`full-${index}`} className="text-[#F3CD03]">
          &#9733;
        </span>
      ))}

      {hasHalfStar && (
        <span className="relative inline-block">
          <span className="text-gray-300">&#9733;</span>
          <span className="absolute left-0 top-0 w-1/2 overflow-hidden text-[#F3CD03]">
            &#9733;
          </span>
        </span>
      )}

      {Array.from({ length: emptyStars }, (_, index) => (
        <span key={`empty-${index}`} className="text-gray-300">
          &#9733;
        </span>
      ))}
    </div>
  )
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const dispatch = useDispatch<AppDispatch>()
  const colors = ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  const [selectedColor, setSelectedColor] = useState('#23A6F0')

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    toast.success('Ürün sepete eklendi')
  }

  const images =
    product.images.length > 0
      ? [...product.images].sort((a, b) => a.index - b.index).map((image) => image.url)
      : ['']

  const [activeImage, setActiveImage] = useState(images[0])

  return (
    <div className="w-full bg-text-gray">
      <div className="mx-auto max-w-[1040px] px-9">
        <div className="flex w-full flex-col items-start gap-8 py-10 md:flex-row md:gap-12">
          <div className="flex w-full flex-col gap-4 md:flex-1">
            <div className="relative h-[450px] w-full overflow-hidden bg-light">
              <img
                src={activeImage}
                alt={product.name}
                className="h-[450px] w-[506px] object-cover"
              />

              <button
                type="button"
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-2xl text-white"
              >
                &#10094;
              </button>

              <button
                type="button"
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-2xl text-white"
              >
                &#10095;
              </button>
            </div>

            <div className="flex items-center gap-4">
              {images.map((img, index) => (
                <button
                  key={`${img}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`h-24 w-24 overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-secondary' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="h-19 w-25 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col py-2 md:flex-1">
            <h2 className="mb-3 text-xl font-medium text-primary">{product.name}</h2>

            <div className="mb-6 flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-sm font-bold text-gray-light">
                {product.sell_count} Reviews
              </span>
            </div>

            <div className="mb-1 text-2xl font-bold text-primary">₺{product.price}</div>

            <div className="mb-8 text-sm font-bold text-gray-light">
              Availability :{' '}
              <span className="text-secondary">
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="mb-6 max-w-[450px] text-sm font-normal leading-relaxed text-gray-dark">
              {product.description}
            </p>

            <div className="mb-6 h-[1px] max-w-[450px] bg-light-open-gray" />

            <div className="mb-12 flex items-center gap-2.5">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`h-8 w-8 rounded-full transition-transform ${
                    selectedColor === color ? 'scale-110 ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="flex items-center justify-center rounded-md bg-secondary px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#1b8ecc]"
              >
                Select Options
              </button>

              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-primary shadow-sm transition-colors hover:bg-gray-50"
              >
                <Heart className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-primary shadow-sm transition-colors hover:bg-gray-50"
                aria-label="Sepete ekle"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>

              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-primary shadow-sm transition-colors hover:bg-gray-50"
              >
                <Eye className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
