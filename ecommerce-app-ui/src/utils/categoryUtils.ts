import type { Category } from '../store/types'

export const getGenderSlug = (gender: string) =>
  gender === 'k' ? 'kadin' : 'erkek'

export const getCategorySlug = (code: string) => code.split(':')[1] ?? code

export const getCategoryPath = (category: Category) =>
  `/shop/${getGenderSlug(category.gender)}/${getCategorySlug(category.code)}/${category.id}`

export const getGenderLabel = (gender: string) =>
  gender === 'k' ? 'Kadın' : 'Erkek'
