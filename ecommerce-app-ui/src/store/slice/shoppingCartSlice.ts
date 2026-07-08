import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Address, CartItem, Payment, Product } from '../types'

interface ShoppingCartState {
  cart: CartItem[]
  payment: Payment | null
  address: Address | null
}

const initialState: ShoppingCartState = {
  cart: [],
  payment: null,
  address: null,
}

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload
    },
    setPayment: (state, action: PayloadAction<Payment | null>) => {
      state.payment = action.payload
    },
    setAddress: (state, action: PayloadAction<Address | null>) => {
      state.address = action.payload
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.cart.find(
        (item) => item.product.id === action.payload.id
      )

      if (existing) {
        existing.count += 1
      } else {
        state.cart.push({
          count: 1,
          checked: true,
          product: action.payload,
        })
      }
    },
  },
})

export const { setCart, setPayment, setAddress, addToCart } =
  shoppingCartSlice.actions

export default shoppingCartSlice.reducer
