import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FooterComponent from '../layout/Footer'
import { Header } from '../layout/Header'
import Breadcrumb from '../components/Breadcrumb'
import BrandLogos from '../components/Brands'
import ProductCard from '../components/ProductCard'
import type { AppDispatch, RootState } from '../store'
import { fetchFavorites } from '../store/thunks/favoriteThunks'

const WishlistPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products, fetchState } = useSelector((state: RootState) => state.favorite)

  useEffect(() => {
    dispatch(fetchFavorites())
  }, [dispatch])

  return (
    <>
      <Header greenBackground={true} constrained mobileVariant="shop" />
      <Breadcrumb
        title="Beğendiklerim"
        items={[
          { label: 'Home', to: '/' },
          { label: 'Beğendiklerim' },
        ]}
      />

      {fetchState === 'FETCHING' ? (
        <p className="bg-white py-20 text-center text-sm text-gray-light">
          Favoriler yükleniyor...
        </p>
      ) : fetchState === 'FAILED' ? (
        <p className="bg-white py-20 text-center text-sm font-medium text-red">
          Favoriler yüklenemedi. Lütfen tekrar deneyiniz.
        </p>
      ) : products.length === 0 ? (
        <p className="bg-white py-20 text-center text-sm text-gray-light">
          Henüz favorilerinize eklediğiniz bir ürün yok.
        </p>
      ) : (
        <ProductCard showHeader={false} products={products} />
      )}

      <BrandLogos />
      <FooterComponent whiteTopBar />
    </>
  )
}

export default WishlistPage
