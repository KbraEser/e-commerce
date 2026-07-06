import type { Category } from '../store/types'
import api from './axios'

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>('/categories')
  return response.data
}
