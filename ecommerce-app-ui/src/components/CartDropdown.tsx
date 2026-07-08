import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import type { CartItem } from '../store/types'
import { formatCartPrice, getCartTotalCount } from '../utils/cartUtils'

const CartDropdown = () => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cart = useSelector((state: RootState) => state.shoppingCart.cart)
  const totalCount = getCartTotalCount(cart)

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
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 px-4 text-primary transition-colors hover:text-secondary md:text-secondary"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Sepet"
      >
        <ShoppingCart className="h-6 w-6" />
        <span className="hidden font-bold leading-6 md:inline">Sepetim</span>
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-xs font-bold leading-none text-white">
          {totalCount}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 pt-3">
          <div className="w-[min(92vw,420px)] rounded-md border border-light-open-gray bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <div className="border-b border-light-open-gray px-5 py-4">
              <h3 className="text-base font-bold text-primary">
                Sepetim ({totalCount} Ürün)
              </h3>
            </div>

            {cart.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-sm font-bold text-primary">Sepetiniz boş</p>
                <p className="mt-1 text-sm text-gray-light">
                  Alışverişe başlamak için ürün ekleyin.
                </p>
              </div>
            ) : (
              <ul className="max-h-[320px] overflow-y-auto">
                {cart.map((item, index) => (
                  <li key={item.product.id}>
                    <CartDropdownItem item={item} />
                    {index < cart.length - 1 && (
                      <div className="mx-5 border-b border-light-open-gray" />
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex gap-3 border-t border-light-open-gray px-5 py-4">
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="flex flex-1 items-center justify-center rounded-md border border-light-open-gray bg-white px-4 py-3 text-sm font-bold text-primary transition-colors hover:bg-gray-50"
              >
                Sepete Git
              </Link>
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="flex flex-1 items-center justify-center rounded-md bg-secondary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1b8ecf]"
              >
                Siparişi Tamamla
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

type CartDropdownItemProps = {
  item: CartItem
}

const CartDropdownItem = ({ item }: CartDropdownItemProps) => {
  const { product, count } = item
  const lineTotal = product.price * count

  return (
    <div className="flex items-start gap-4 px-5 py-4">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-light-open-gray bg-text-gray">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-bold leading-5 text-primary">
          {product.name}
        </p>
        <p className="mt-1 text-xs font-medium text-gray-light">
          Adet: {count}
        </p>
        <p className="mt-2 text-sm font-bold text-secondary">
          {formatCartPrice(lineTotal)}
        </p>
      </div>
    </div>
  )
}

export default CartDropdown
