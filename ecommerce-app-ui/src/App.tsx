import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ShopPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import TeamPage from './pages/TeamPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ProductsPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
