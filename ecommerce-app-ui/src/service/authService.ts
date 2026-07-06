import type { LoginRequest, LoginResponse, VerifyResponse } from "../store/types";
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

export const verify = async(): Promise<VerifyResponse> => {
    const response = await api.get<VerifyResponse>('/verify')
    return response.data
}