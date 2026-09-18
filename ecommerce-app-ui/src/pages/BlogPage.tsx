import { Header } from '../layout/Header'
import FooterComponent from '../layout/Footer'
import Post_Page from '../components/Post_Page'

const BlogPage = () => {
  return (
    <>
      <Header greenBackground={true} constrained mobileVariant="shop" />
      <Post_Page />
      <FooterComponent whiteTopBar />
    </>
  )
}

export default BlogPage
