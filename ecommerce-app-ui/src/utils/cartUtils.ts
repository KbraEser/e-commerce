import type { CartItem } from '../store/types'

export const getCartTotalCount = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.count, 0)

export const formatCartPrice = (price: number) =>
  `₺${price.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
