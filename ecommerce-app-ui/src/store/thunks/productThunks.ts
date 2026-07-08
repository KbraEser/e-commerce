import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCategories } from '../../service/categoryService'
import type { Category, Product, ProductsResponse } from '../types'
import { getProductById, getProducts } from '../../service/productService'

interface FetchCategoriesState {
  product: {
    categories: Category[]
  }
}

interface FetchProductsState {
  product: {
    categoryId: number | null
    filter: string
    sort: string
    limit: number
    offset: number
  }
}
export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { state: FetchCategoriesState }
>('product/fetchCategories', async (_, { getState }) => {
  const { categories } = getState().product

  if (categories.length > 0) {
    return categories
  }

  return getCategories()
})


export const fetchProducts = createAsyncThunk<
  ProductsResponse,
  void,
  { state: FetchProductsState }
>('product/fetchProducts', async (_, { getState }) => {
  const { categoryId, filter, sort, limit, offset } = getState().product

  const params: Record<string, string | number> = {
    limit,
    offset,
  }

  if (categoryId !== null) {
    params.category = categoryId
  }
  if (filter) {
    params.filter = filter
  }
  if (sort) {
    params.sort = sort
  }
  return getProducts(params)
})

export const fetchProductById = createAsyncThunk<Product, number>(
  'product/fetchProductById',
  async (productId) => getProductById(productId)
)