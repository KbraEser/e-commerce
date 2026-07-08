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
    toggleCartItemChecked: (state, action: PayloadAction<number>) => {
      const item = state.cart.find(
        (cartItem) => cartItem.product.id === action.payload
      )
      if (item) {
        item.checked = !item.checked
      }
    },
    toggleAllCartItems: (state, action: PayloadAction<boolean>) => {
      state.cart.forEach((item) => {
        item.checked = action.payload
      })
    },
    updateCartItemCount: (
      state,
      action: PayloadAction<{ productId: number; count: number }>
    ) => {
      const item = state.cart.find(
        (cartItem) => cartItem.product.id === action.payload.productId
      )
      if (item) {
        item.count = Math.max(1, action.payload.count)
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(
        (item) => item.product.id !== action.payload
      )
    },
    resetShoppingCart: (state) => {
      state.cart = []
      state.payment = null
      state.address = null
    },
  },
})

export const {
  setCart,
  setPayment,
  setAddress,
  addToCart,
  toggleCartItemChecked,
  toggleAllCartItems,
  updateCartItemCount,
  removeFromCart,
  resetShoppingCart,
} = shoppingCartSlice.actions

export default shoppingCartSlice.reducer
