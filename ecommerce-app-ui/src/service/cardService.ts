import type { CreditCard, CreditCardPayload } from '../store/types'
import api from './axios'

export const getUserCards = async (): Promise<CreditCard[]> => {
  const response = await api.get<CreditCard[]>('/user/card')
  return response.data
}

export const createUserCard = async (payload: CreditCardPayload): Promise<CreditCard> => {
  const response = await api.post<CreditCard>('/user/card', payload)
  return response.data
}

export const updateUserCard = async (
  payload: CreditCardPayload & { id: number | string }
): Promise<CreditCard> => {
  const response = await api.put<CreditCard>('/user/card', payload)
  return response.data
}

export const deleteUserCard = async (cardId: number | string): Promise<void> => {
  await api.delete(`/user/card/${cardId}`)
}
