import { useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../layout/Header'
import Breadcrumb from '../components/Breadcrumb'
import ProductDetails from '../components/ProductDetails'
import ProductDescriptionTabs from '../components/ProductDescription'
import ProductCard from '../components/ProductCard'
import BrandLogos from '../components/Brands'
import { FooterComponent } from '../layout/Footer'
import type { AppDispatch, RootState } from '../store'
import { clearProduct } from '../store/slice/productSlice'
import { fetchProductById } from '../store/thunks/productThunks'
import { getCategoryPath } from '../utils/categoryUtils'

const ProductDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { categoryName, categoryId, productId } = useParams()

  const { product, productDetailFetchState, productList, categories } = useSelector(
    (state: RootState) => state.product
  )

  const parsedProductId = productId ? Number(productId) : null
  const category = categories.find((item) => item.id === Number(categoryId))
  const categoryPath = category ? getCategoryPath(category) : '/shop'

  useEffect(() => {
    if (parsedProductId) {
      dispatch(fetchProductById(parsedProductId))
    }

    return () => {
      dispatch(clearProduct())
    }
  }, [dispatch, parsedProductId])

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate(categoryPath)
  }

  const isLoading =
    productDetailFetchState === 'FETCHING' || productDetailFetchState === 'NOT_FETCHED'

  return (
    <>
      <Header greenBackground={true} constrained mobileVariant="shop" />
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Shop', to: '/shop' },
          ...(categoryName
            ? [{
                label: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
                to: categoryPath,
              }]
            : []),
          ...(product ? [{ label: product.name }] : [{ label: 'Product Details' }]),
        ]}
      />

      {isLoading ? (
        <div className="flex justify-center bg-text-gray py-24">
          <CircularProgress />
        </div>
      ) : productDetailFetchState === 'FAILED' || !product ? (
        <div className="flex flex-col items-center gap-4 bg-text-gray py-24">
          <p className="text-sm font-bold text-gray-light">Product could not be loaded.</p>
          <button
            type="button"
            onClick={handleBack}
            className="rounded-md bg-secondary px-6 py-3 text-sm font-bold text-white"
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          <div className="bg-text-gray">
            <div className="mx-auto max-w-[1040px] px-9 pt-6">
              <button
                type="button"
                onClick={handleBack}
                className="text-sm font-bold text-secondary transition-colors hover:text-[#1b8ecc]"
              >
                ← Back
              </button>
            </div>
          </div>
          <ProductDetails product={product} />
          <ProductDescriptionTabs product={product} />
          <ProductCard headerTitleOnly products={productList.slice(0, 4)} />
        </>
      )}

      <BrandLogos />
      <FooterComponent whiteTopBar />
    </>
  )
}

export default ProductDetailsPage
