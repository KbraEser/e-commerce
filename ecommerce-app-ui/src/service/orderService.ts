import type { OrderPayload, PreviousOrder } from '../store/types'
import api from './axios'

export const createOrder = async (payload: OrderPayload) => {
  const response = await api.post('/order', payload)
  return response.data
}

export const getOrders = async (): Promise<PreviousOrder[]> => {
  const response = await api.get<PreviousOrder[] | { orders?: PreviousOrder[] }>('/order')
  if (Array.isArray(response.data)) {
    return response.data
  }
  return response.data.orders ?? []
}
