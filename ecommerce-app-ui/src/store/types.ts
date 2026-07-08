export interface User {
 
  name: string
  email: string
  roleId?: number
  token?: string
}

export interface Role {
  id: number
  name: string
  code: string
}

export interface Address {
  id?: number
  title: string
  city: string
  district: string
  fullAddress: string
  phone?: string
}

export interface CreditCard {
  id?: number
  cardHolder: string
  cardNumber: string
  expiryMonth: string
  expiryYear: string
}

export interface Category {
  id: number
  code: string
  title: string
  img: string
  rating: number
  gender: string
}

export interface ProductImage {
  url: string
  index: number
}
export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  store_id: number
  category_id: number
  rating: number
  sell_count: number
  images: ProductImage[]
}
export interface ProductsResponse {
  products: Product[]
  total: number
}

export type FetchState = 'NOT_FETCHED' | 'FETCHING' | 'FETCHED' | 'FAILED'

export interface CartItem {
  count: number
  checked: boolean
  product: Product
}

export interface Payment {
  cardHolder: string
  cardNumber: string
  expiryMonth: string
  expiryYear: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  id: number
  token: string
  name: string
  email: string
  role_id: string
}

export interface VerifyResponse {
  name: string
  email: string
  role_id: string
  token: string
}

