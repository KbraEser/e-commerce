import { Minus, Plus, Trash2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../store'
import {
  removeFromCart,
  toggleCartItemChecked,
  updateCartItemCount,
} from '../../store/slice/shoppingCartSlice'
import type { CartItem } from '../../store/types'
import { formatCartPrice } from '../../utils/cartUtils'

type CartTableProps = {
  items: CartItem[]
  allChecked: boolean
  onToggleAll: () => void
}

const CartTable = ({ items, allChecked, onToggleAll }: CartTableProps) => {
  return (
    <div className="overflow-hidden rounded-md border border-light-open-gray bg-white shadow-sm">
      <div className="hidden border-b border-light-open-gray bg-text-gray px-6 py-4 md:grid md:grid-cols-[auto_1fr_140px_120px_120px_40px] md:items-center md:gap-4">
        <label className="flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={onToggleAll}
            className="h-4 w-4 accent-secondary"
          />
        </label>
        <span className="text-sm font-bold text-primary">Ürün</span>
        <span className="text-center text-sm font-bold text-primary">Adet</span>
        <span className="text-right text-sm font-bold text-primary">Birim Fiyat</span>
        <span className="text-right text-sm font-bold text-primary">Toplam</span>
        <span />
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={item.product.id}>
            <CartTableRow item={item} />
            {index < items.length - 1 && (
              <div className="mx-6 border-b border-light-open-gray" />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

type CartTableRowProps = {
  item: CartItem
}

const CartTableRow = ({ item }: CartTableRowProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { product, count, checked } = item
  const lineTotal = product.price * count

  const handleDecrease = () => {
    dispatch(
      updateCartItemCount({
        productId: product.id,
        count: count - 1,
      })
    )
  }

  const handleIncrease = () => {
    dispatch(
      updateCartItemCount({
        productId: product.id,
        count: count + 1,
      })
    )
  }

  return (
    <div className="flex flex-col gap-4 px-6 py-5 md:grid md:grid-cols-[auto_1fr_140px_120px_120px_40px] md:items-center md:gap-4">
      <label className="flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => dispatch(toggleCartItemChecked(product.id))}
          className="h-4 w-4 accent-secondary"
        />
      </label>

      <div className="flex items-start gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-light-open-gray bg-text-gray">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-bold leading-5 text-primary md:text-base">
            {product.name}
          </p>
          <p className="mt-2 line-clamp-2 text-xs text-gray-light md:hidden">
            {product.description}
          </p>
          <p className="mt-2 text-sm font-bold text-secondary md:hidden">
            {formatCartPrice(lineTotal)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex items-center rounded-md border border-light-open-gray">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={count <= 1}
            className="flex h-9 w-9 cursor-pointer items-center justify-center text-primary transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Adedi azalt"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="flex h-9 min-w-10 items-center justify-center border-x border-light-open-gray px-2 text-sm font-bold text-primary">
            {count}
          </span>
          <button
            type="button"
            onClick={handleIncrease}
            className="flex h-9 w-9 cursor-pointer items-center justify-center text-primary transition-colors hover:bg-gray-50"
            aria-label="Adedi artır"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="hidden text-right text-sm font-bold text-primary md:block">
        {formatCartPrice(product.price)}
      </p>

      <p className="hidden text-right text-sm font-bold text-secondary md:block">
        {formatCartPrice(lineTotal)}
      </p>

      <button
        type="button"
        onClick={() => dispatch(removeFromCart(product.id))}
        className="flex h-9 w-9 cursor-pointer items-center justify-center self-end text-gray-light transition-colors hover:text-red md:self-center"
        aria-label="Ürünü kaldır"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

export default CartTable
