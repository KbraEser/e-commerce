import type { Product } from '../store/types'
import api from './axios'

export const getFavorites = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/favorites')
  return response.data
}

export const addFavorite = async (productId: number): Promise<void> => {
  await api.post(`/favorites/${productId}`)
}

export const removeFavorite = async (productId: number): Promise<void> => {
  await api.delete(`/favorites/${productId}`)
}
