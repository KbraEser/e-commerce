import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  type VerifyResponse,
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
  type RegisterResponse,
} from "../types";
import { login, signup, verify } from "../../service/authService";

export const loginUser = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: string }>(
    'client/loginUser',
    async(credentials, {rejectWithValue}) => {
        try{
            return await login(credentials)
        }
        catch(error:unknown){
            if(error && typeof error === 'object' && 'response' in error){
                const axiosError = error as {response?:{data?:{message?:string}}}
                return rejectWithValue(
                    axiosError.response?.data?.message ?? 'Login failed.'
                )
            }
            return rejectWithValue('An unknown error occurred.')
        }
    }
)

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: string }
>(
  'client/registerUser',
  async (payload, { rejectWithValue }) => {
    try {
      return await signup(payload)
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } }
        return rejectWithValue(
          axiosError.response?.data?.message ?? 'Registration failed.'
        )
      }
      return rejectWithValue('An unknown error occurred.')
    }
  }
)

export const verifySession = createAsyncThunk<
  VerifyResponse,
  void,
  { rejectValue: { message: string; unauthorized: boolean } }
>(
  'client/verifySession',
  async (_, { rejectWithValue }) => {
    try {
      return await verify()
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } }
        if (axiosError.response?.status === 401) {
          return rejectWithValue({
            message: 'Session expired.',
            unauthorized: true,
          })
        }
      }
      return rejectWithValue({
        message: 'Could not verify session.',
        unauthorized: false,
      })
    }
  }
)
