import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Category from '../components/Category'
import ProductCard from '../components/ProductCard'
import Shop_Hero from '../components/Shop_Hero'
import Season_Page from '../components/Season_Page'
import Post_Page from '../components/Post_Page'
import FooterComponent from './Footer'
import type { AppDispatch, RootState } from '../store'
import { fetchBestSellers } from '../store/thunks/productThunks'

const PageContent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const bestSellers = useSelector((state: RootState) => state.product.bestSellers)

  useEffect(() => {
    dispatch(fetchBestSellers())
  }, [dispatch])

  return (
    <>
      <Category />
      <ProductCard products={bestSellers} />
      <Shop_Hero />
      <Season_Page />
      <Post_Page />
      <FooterComponent />
    </>
  )
}

export default PageContent
