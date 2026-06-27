import Category from '../components/Category'
import ProductCard from '../components/ProductCard'
import Shop_Hero from '../components/Shop_Hero'
import Season_Page from '../components/Season_Page'
import Post_Page from '../components/Post_Page'
import FooterComponent from './Footer'
const PageContent = () => {
  return (
    <>
    <Category/>
    <ProductCard/>
    <Shop_Hero/>
    <Season_Page/>
    <Post_Page/>
    <FooterComponent />
    </>
  )
}

export default PageContent