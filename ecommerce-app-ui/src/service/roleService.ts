import type { Role } from "../store/types";
import api from "./axios";

export const getRoles = async ():Promise<Role[]> => {
    try {
        const response = await api.get<Role[]>('/roles')
        return response.data
    } catch (error) {
        console.error('Error fetching roles:', error)
        throw error
    }

}