import { Header } from '../layout/Header'
import Breadcrumb from '../components/Breadcrumb'
import ProductDetails from '../components/ProductDetails'
import ProductDescriptionTabs from '../components/ProductDescription'
import ProductCard from '../components/ProductCard'
import BrandLogos from '../components/Brands'
import { FooterComponent } from '../layout/Footer'
const ProductDetailsPage = () => {
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
      <ProductCard headerTitleOnly />
      <BrandLogos />
      <FooterComponent whiteTopBar />
    </>
  )
}

export default ProductDetailsPage