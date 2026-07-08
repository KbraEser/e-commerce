import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ShopPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import PostDetailPage from './pages/PostDetailPage'
import TeamPage from './pages/TeamPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { useEffect } from 'react'
import { clearAuthToken, setAuthToken } from './service/axios'
import { verifySession } from './store/thunks/authThunks'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from './store'
import { clearToken, getToken, renewToken } from './service/tokenStorage'
import { fetchCategories } from './store/thunks/productThunks'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const initAuth = async () => {
      const stored = getToken()

      if (!stored) {
        clearAuthToken()
        return
      }

      setAuthToken(stored.token)
      const result = await dispatch(verifySession())

      if (verifySession.fulfilled.match(result)) {
        renewToken(result.payload.token, stored.rememberMe)
        setAuthToken(result.payload.token)
      } else if (
        verifySession.rejected.match(result) &&
        result.payload?.unauthorized
      ) {
        clearToken()
        clearAuthToken()
      }
    }

    initAuth()
    dispatch(fetchCategories())
   
  }, [dispatch])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ProductsPage />} />
        <Route
          path="/shop/:gender/:categoryName/:categoryId"
          element={<ProductsPage />}
        />
       <Route
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          element={<ProductDetailsPage />}
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
