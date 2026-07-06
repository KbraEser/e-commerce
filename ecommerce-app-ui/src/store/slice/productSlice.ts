import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Category, FetchState, Product } from '../types'
import { fetchCategories } from '../thunks/productThunks'

interface ProductState {
  categories: Category[]
  productList: Product[]
  total: number
  limit: number
  offset: number
  filter: string
  fetchState: FetchState
}

const initialState: ProductState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  fetchState: 'NOT_FETCHED',
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload
    },
    setProductList: (state, action: PayloadAction<Product[]>) => {
      state.productList = action.payload
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload
    },
    setFetchState: (state, action: PayloadAction<FetchState>) => {
      state.fetchState = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    })
  },
})

export const {
  setCategories,
  setProductList,
  setTotal,
  setLimit,
  setOffset,
  setFilter,
  setFetchState,
} = productSlice.actions

export default productSlice.reducer
