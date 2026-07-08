import type { Category, Product } from '../store/types'

export const getGenderSlug = (gender: string) =>
  gender === 'k' ? 'kadin' : 'erkek'

export const getCategorySlug = (code: string) => code.split(':')[1] ?? code

export const getCategoryPath = (category: Category) =>
  `/shop/${getGenderSlug(category.gender)}/${getCategorySlug(category.code)}/${category.id}`

export const getGenderLabel = (gender: string) =>
  gender === 'k' ? 'Kadın' : 'Erkek'


export const getProductSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9ğüşıöç\s-]/gi, '')
    .trim()
    .replace(/\s+/g, '-')

export const getProductPath = (product: Product, category: Category) =>
  `/shop/${getGenderSlug(category.gender)}/${getCategorySlug(category.code)}/${category.id}/${getProductSlug(product.name)}/${product.id}`

export const findCategoryForProduct = (
  product: Product,
  categories: Category[]
): Category | undefined =>
  categories.find((category) => category.id === product.category_id)