import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Address, CreditCard, FetchState, Role, User } from '../types'
import {
  createAddress,
  createCard,
  deleteAddress,
  deleteCard,
  fetchAddresses,
  fetchCards,
  fetchRoles,
  updateAddress,
  updateCard,
} from '../thunks/clientThunks'
import { loginUser, verifySession } from '../thunks/authThunks'

interface ClientState {
  user: User | null
  addressList: Address[]
  addressFetchState: FetchState
  addressError: string | null
  creditCards: CreditCard[]
  cardFetchState: FetchState
  cardError: string | null
  roles: Role[]
  theme: string
  language: string
}

const initialState: ClientState = {
  user: null,
  addressList: [],
  addressFetchState: 'NOT_FETCHED',
  addressError: null,
  creditCards: [],
  cardFetchState: 'NOT_FETCHED',
  cardError: null,
  roles: [],
  theme: '',
  language: '',
}

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    setAddressList: (state, action: PayloadAction<Address[]>) => {
      state.addressList = action.payload
    },
    setCreditCards: (state, action: PayloadAction<CreditCard[]>) => {
      state.creditCards = action.payload
    },
    setRoles: (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoles.fulfilled, (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload
    })

    builder.addCase(fetchAddresses.pending, (state) => {
      state.addressFetchState = 'FETCHING'
      state.addressError = null
    })
    builder.addCase(fetchAddresses.fulfilled, (state, action) => {
      state.addressList = action.payload
      state.addressFetchState = 'FETCHED'
    })
    builder.addCase(fetchAddresses.rejected, (state, action) => {
      state.addressFetchState = 'FAILED'
      state.addressError = action.error.message ?? 'Address list could not be loaded.'
    })

    builder.addCase(createAddress.fulfilled, (state, action) => {
      state.addressList = action.payload
      state.addressFetchState = 'FETCHED'
    })
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.addressList = action.payload
      state.addressFetchState = 'FETCHED'
    })
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.addressList = action.payload
      state.addressFetchState = 'FETCHED'
    })

    builder.addCase(fetchCards.pending, (state) => {
      state.cardFetchState = 'FETCHING'
      state.cardError = null
    })
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.creditCards = action.payload
      state.cardFetchState = 'FETCHED'
    })
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.cardFetchState = 'FAILED'
      state.cardError = action.error.message ?? 'Cards could not be loaded.'
    })

    builder.addCase(createCard.fulfilled, (state, action) => {
      state.creditCards = action.payload
      state.cardFetchState = 'FETCHED'
    })
    builder.addCase(updateCard.fulfilled, (state, action) => {
      state.creditCards = action.payload
      state.cardFetchState = 'FETCHED'
    })
    builder.addCase(deleteCard.fulfilled, (state, action) => {
      state.creditCards = action.payload
      state.cardFetchState = 'FETCHED'
    })

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        roleId: Number(action.payload.role_id),
        token: action.payload.token,
      }
    })

    builder.addCase(verifySession.fulfilled, (state, action) => {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        roleId: Number(action.payload.role_id),
        token: action.payload.token,
      }
    })
  },
})

export const {
  setUser,
  setAddressList,
  setCreditCards,
  setRoles,
  setTheme,
  setLanguage,
} = clientSlice.actions

export default clientSlice.reducer
