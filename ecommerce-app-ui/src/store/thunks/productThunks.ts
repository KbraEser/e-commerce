import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCategories } from '../../service/categoryService'
import type { Category } from '../types'

interface FetchCategoriesState {
  product: {
    categories: Category[]
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
