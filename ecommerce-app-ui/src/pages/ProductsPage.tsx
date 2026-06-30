import FooterComponent from '../layout/Footer'
import { Header } from '../layout/Header'
import Breadcrumb from '../components/Breadcrumb'
import ProductCard from '../components/ProductCard'
import FilterRow from '../components/Filter'
import Pagination from '../components/Pagination'
import BrandLogos from '../components/Brands'
import FeaturedCategories from '../components/FeaturedCategories'
const ProductsPage = () => {
  return (
    <>
      <Header greenBackground={true} />
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Shop' },
        ]}
      />
      <FeaturedCategories />
      <FilterRow />
      <ProductCard showHeader={false} count={12} />
      <Pagination />
      <BrandLogos />
      <FooterComponent whiteTopBar />
    </>
  )
}

export default ProductsPage