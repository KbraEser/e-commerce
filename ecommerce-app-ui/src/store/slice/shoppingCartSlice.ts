import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Address, CartItem, Payment } from '../types'

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
  },
})

export const { setCart, setPayment, setAddress } = shoppingCartSlice.actions

export default shoppingCartSlice.reducer
