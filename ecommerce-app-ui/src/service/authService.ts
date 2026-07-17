import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyResponse,
} from "../store/types";
import api from "./axios";

export const login = async(credentials:LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>('/login', credentials)
        return response.data
    } catch (error) {
        console.error('Error logging in:', error)
        throw error
    }
}

export const signup = async (payload: RegisterRequest): Promise<RegisterResponse> => {
    try {
        const response = await api.post<RegisterResponse>('/signup', payload)
        return response.data
    } catch (error) {
        console.error('Error signing up:', error)
        throw error
    }
}

export const verify = async(): Promise<VerifyResponse> => {
    const response = await api.get<VerifyResponse>('/verify')
    return response.data
}