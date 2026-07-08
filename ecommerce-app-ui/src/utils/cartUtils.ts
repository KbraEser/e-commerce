import type { CartItem } from '../store/types'

export const getCartTotalCount = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.count, 0)

export const getSelectedCartTotal = (items: CartItem[]) =>
  items
    .filter((item) => item.checked)
    .reduce((total, item) => total + item.product.price * item.count, 0)

export const formatCartPrice = (price: number) =>
  `₺${price.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
