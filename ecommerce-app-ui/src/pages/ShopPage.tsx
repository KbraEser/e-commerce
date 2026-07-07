import { useEffect, useRef } from 'react'
import { CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import FooterComponent from '../layout/Footer'
import { Header } from '../layout/Header'
import Breadcrumb from '../components/Breadcrumb'
import ProductCard from '../components/ProductCard'
import FilterRow from '../components/Filter'
import Pagination from '../components/Pagination'
import BrandLogos from '../components/Brands'
import FeaturedCategories from '../components/FeaturedCategories'
import type { AppDispatch, RootState } from '../store'
import { fetchProducts } from '../store/thunks/productThunks'
import { useParams } from 'react-router-dom'
import { setCategoryId, setOffset } from '../store/slice/productSlice'
import { scrollToShopProducts } from '../utils/scrollUtils'

const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {categoryId:categoryIdParam,categoryName} = useParams()

  const parsedCategoryId = categoryIdParam ? Number(categoryIdParam) : null
  const { productList, fetchState, offset } = useSelector((state: RootState) => state.product)
  const isInitialLoading = fetchState === 'FETCHING' && productList.length === 0
  const prevOffsetRef = useRef<number | null>(null)

  useEffect(() => {
    dispatch(setCategoryId(parsedCategoryId))
    dispatch(setOffset(0))
    dispatch(fetchProducts())
  }, [dispatch,parsedCategoryId])

  useEffect(() => {
    if (fetchState !== 'FETCHED') return

    if (prevOffsetRef.current !== null && prevOffsetRef.current !== offset) {
      requestAnimationFrame(() => {
        scrollToShopProducts()
      })
    }

    prevOffsetRef.current = offset
  }, [offset, fetchState, productList])

  return (
    <>
      <Header greenBackground={true} constrained mobileVariant="shop" />
      <Breadcrumb
        title="Shop"
        items={[
          { label: 'Home', to: '/' },
          { label: 'Shop' },
          ...(categoryName
            ? [{ label: categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}] : []
          )
        ]}
      />
      <FeaturedCategories />
      <div id="shop-products-top" aria-hidden="true" />
      <FilterRow />
      {isInitialLoading ? (
        <div className="flex justify-center bg-white py-20">
          <CircularProgress />
        </div>
      ) : (
        <ProductCard showHeader={false} products={productList} />
      )}
      <Pagination />
      <BrandLogos />
      <FooterComponent whiteTopBar />
    </>
  )
}

export default ProductsPage
