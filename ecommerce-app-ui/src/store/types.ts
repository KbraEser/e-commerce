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
  name: string
  surname: string
  phone: string
  city: string
  district: string
  neighborhood: string
}

export type AddressPayload = Omit<Address, 'id'>

export interface CreditCard {
  id?: number | string
  card_no: string
  expire_month: number
  expire_year: number
  name_on_card: string
}

export type CreditCardPayload = Omit<CreditCard, 'id'>

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

export interface OrderProductPayload {
  product_id: number
  count: number
  detail: string
}

export interface OrderPayload {
  address_id: number
  order_date: string
  card_no: number
  card_name: string
  card_expire_month: number
  card_expire_year: number
  card_ccv: number
  price: number
  products: OrderProductPayload[]
}

export interface PreviousOrderProduct {
  product_id: number
  count: number
  detail: string
}

export interface PreviousOrder {
  id: number
  address_id: number
  order_date: string
  card_no: number
  card_name: string
  card_expire_month: number
  card_expire_year: number
  card_ccv: number
  price: number
  products: PreviousOrderProduct[]
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  passwordConfirm: string
  role_id: number
  storeName?: string
  storePhone?: string
  storeTaxNo?: string
  storeBankAccount?: string
}

export interface RegisterResponse {
  email: string
  message: string
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
