import { createSlice } from '@reduxjs/toolkit'
import type { FetchState, Product } from '../types'
import { addFavoriteProduct, fetchFavorites, removeFavoriteProduct } from '../thunks/favoriteThunks'

interface FavoriteState {
  products: Product[]
  fetchState: FetchState
}

const initialState: FavoriteState = {
  products: [],
  fetchState: 'NOT_FETCHED',
}

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.products = []
      state.fetchState = 'NOT_FETCHED'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state) => {
      state.fetchState = 'FETCHING'
    })
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.products = action.payload
      state.fetchState = 'FETCHED'
    })
    builder.addCase(fetchFavorites.rejected, (state) => {
      state.fetchState = 'FAILED'
    })
    builder.addCase(addFavoriteProduct.fulfilled, (state, action) => {
      state.products = action.payload
      state.fetchState = 'FETCHED'
    })
    builder.addCase(removeFavoriteProduct.fulfilled, (state, action) => {
      state.products = action.payload
      state.fetchState = 'FETCHED'
    })
  },
})

export const { clearFavorites } = favoriteSlice.actions
export default favoriteSlice.reducer
