import { createAsyncThunk } from '@reduxjs/toolkit'
import type {
  Address,
  AddressPayload,
  CreditCard,
  CreditCardPayload,
  Role,
} from '../types'
import { getRoles } from '../../service/roleService'
import {
  createUserAddress,
  deleteUserAddress,
  getUserAddresses,
  updateUserAddress,
} from '../../service/addressService'
import {
  createUserCard,
  deleteUserCard,
  getUserCards,
  updateUserCard,
} from '../../service/cardService'

interface FetchRolesState {
  client: {
    roles: Role[]
  }
}

export const fetchRoles = createAsyncThunk<Role[], void, { state: FetchRolesState }>(
  'client/fetchRoles',
  async (_, { getState }) => {
    const { roles } = getState().client
    if (roles.length > 0) {
      return roles
    }
    return getRoles()
  }
)

export const fetchAddresses = createAsyncThunk<Address[]>(
  'client/fetchAddresses',
  async () => getUserAddresses()
)

export const createAddress = createAsyncThunk<Address[], AddressPayload>(
  'client/createAddress',
  async (payload) => {
    await createUserAddress(payload)
    return getUserAddresses()
  }
)

export const updateAddress = createAsyncThunk<
  Address[],
  AddressPayload & { id: number }
>('client/updateAddress', async (payload) => {
  await updateUserAddress(payload)
  return getUserAddresses()
})

export const deleteAddress = createAsyncThunk<Address[], number>(
  'client/deleteAddress',
  async (addressId) => {
    await deleteUserAddress(addressId)
    return getUserAddresses()
  }
)

export const fetchCards = createAsyncThunk<CreditCard[]>(
  'client/fetchCards',
  async () => getUserCards()
)

export const createCard = createAsyncThunk<CreditCard[], CreditCardPayload>(
  'client/createCard',
  async (payload) => {
    await createUserCard(payload)
    return getUserCards()
  }
)

export const updateCard = createAsyncThunk<
  CreditCard[],
  CreditCardPayload & { id: number | string }
>('client/updateCard', async (payload) => {
  await updateUserCard(payload)
  return getUserCards()
})

export const deleteCard = createAsyncThunk<CreditCard[], number | string>(
  'client/deleteCard',
  async (cardId) => {
    await deleteUserCard(cardId)
    return getUserCards()
  }
)
