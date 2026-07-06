import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Address, CreditCard, Role, User } from '../types'
import { fetchRoles } from '../thunks/clientThunks'
import { loginUser, verifySession } from '../thunks/authThunks'

interface ClientState {
  user: User | null
  addressList: Address[]
  creditCards: CreditCard[]
  roles: Role[]
  theme: string
  language: string
}

const initialState: ClientState = {
  user: null,
  addressList: [],
  creditCards: [],
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
    builder.addCase(fetchRoles.fulfilled,(state,action:PayloadAction<Role[]>)=>{
      state.roles = action.payload
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
  }
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
