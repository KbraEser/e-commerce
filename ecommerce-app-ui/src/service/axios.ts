import axios from "axios";
import { clearToken } from "./tokenStorage";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const setAuthToken = (token: string) => {
    api.defaults.headers.common['Authorization'] = token
}

export const clearAuthToken = () => {
    delete api.defaults.headers.common['Authorization']
}

api.interceptors.response.use(
    (response) => response,
    (error) =>{
        const isLoginRequest = error.config?.url?.includes('/login')

        if (error.response?.status === 401 && !isLoginRequest) {
            clearToken()
            clearAuthToken()
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api