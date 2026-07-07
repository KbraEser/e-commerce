import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Category, FetchState, Product } from '../types'
import { fetchCategories, fetchProducts } from '../thunks/productThunks'

interface ProductState {
  categories: Category[]
  productList: Product[]
  total: number
  limit: number
  offset: number
  categoryId: number | null
  filter: string
  sort: string
  fetchState: FetchState
}

const initialState: ProductState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  categoryId:  null,
  filter: '',
  sort: '',
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
    setCategoryId: (state, action: PayloadAction<number | null>) => {
      state.categoryId = action.payload
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload
    },
    setFetchState: (state, action: PayloadAction<FetchState>) => {
      state.fetchState = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productList = action.payload.products
      state.total = action.payload.total
      state.fetchState = 'FETCHED'
    })
    builder.addCase(fetchProducts.pending, (state) => {
      state.fetchState = 'FETCHING'
    })
    builder.addCase(fetchProducts.rejected, (state) => {
      state.fetchState = 'FAILED'
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
  setCategoryId,
  setSort,
  setFetchState,
} = productSlice.actions

export default productSlice.reducer
