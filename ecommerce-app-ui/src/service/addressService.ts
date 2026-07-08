import type { Address, AddressPayload } from '../store/types'
import api from './axios'

export const getUserAddresses = async (): Promise<Address[]> => {
  const response = await api.get<Address[]>('/user/address')
  return response.data
}

export const createUserAddress = async (payload: AddressPayload): Promise<Address> => {
  const response = await api.post<Address>('/user/address', payload)
  return response.data
}

export const updateUserAddress = async (
  payload: AddressPayload & { id: number }
): Promise<Address> => {
  const response = await api.put<Address>('/user/address', payload)
  return response.data
}

export const deleteUserAddress = async (addressId: number): Promise<void> => {
  await api.delete(`/user/address/${addressId}`)
}
