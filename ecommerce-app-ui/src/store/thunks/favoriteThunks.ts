import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Product } from '../types'
import { addFavorite, getFavorites, removeFavorite } from '../../service/favoriteService'

export const fetchFavorites = createAsyncThunk<Product[]>(
  'favorite/fetchFavorites',
  async () => getFavorites()
)

export const addFavoriteProduct = createAsyncThunk<Product[], number>(
  'favorite/addFavoriteProduct',
  async (productId) => {
    await addFavorite(productId)
    return getFavorites()
  }
)

export const removeFavoriteProduct = createAsyncThunk<Product[], number>(
  'favorite/removeFavoriteProduct',
  async (productId) => {
    await removeFavorite(productId)
    return getFavorites()
  }
)
