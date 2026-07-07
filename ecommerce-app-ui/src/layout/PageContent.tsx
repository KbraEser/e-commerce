import { useSelector } from 'react-redux'
import Category from '../components/Category'
import ProductCard from '../components/ProductCard'
import Shop_Hero from '../components/Shop_Hero'
import Season_Page from '../components/Season_Page'
import Post_Page from '../components/Post_Page'
import FooterComponent from './Footer'
import type { RootState } from '../store'

const PageContent = () => {
  const productList = useSelector((state: RootState) => state.product.productList)

  return (
    <>
      <Category />
      <ProductCard products={productList.slice(0, 8)} />
      <Shop_Hero />
      <Season_Page />
      <Post_Page />
      <FooterComponent />
    </>
  )
}

export default PageContent
