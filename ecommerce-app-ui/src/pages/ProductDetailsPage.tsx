import { useSelector } from 'react-redux'
import { Header } from '../layout/Header'
import Breadcrumb from '../components/Breadcrumb'
import ProductDetails from '../components/ProductDetails'
import ProductDescriptionTabs from '../components/ProductDescription'
import ProductCard from '../components/ProductCard'
import BrandLogos from '../components/Brands'
import { FooterComponent } from '../layout/Footer'
import type { RootState } from '../store'

const ProductDetailsPage = () => {
  const productList = useSelector((state: RootState) => state.product.productList)

  return (
    <>
      <Header greenBackground={true} constrained mobileVariant="shop" />
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Shop', to: '/shop' },
          { label: 'Product Details' },
        ]}
      />
      <ProductDetails />
      <ProductDescriptionTabs />
      <ProductCard headerTitleOnly products={productList.slice(0, 4)} />
      <BrandLogos />
      <FooterComponent whiteTopBar />
    </>
  )
}

export default ProductDetailsPage
