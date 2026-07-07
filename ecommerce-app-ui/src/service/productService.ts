import type { Product, ProductsResponse } from "../store/types"
import api from "./axios"

export interface ProductQueryParams {
    category?:number;
    filter?:string;
    sort?:string;
    limit?:number;
    offset?:number;
}

export const getProducts = async (params: ProductQueryParams): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>('/products', { params })
  return response.data
}

export const getProductById = async (productId: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${productId}`)
  return response.data
}