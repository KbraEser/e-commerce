import { BrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'

function App() {
  

  return (
    <BrowserRouter>
    <HomePage />
    <ProductsPage />
    </BrowserRouter>
  )
}

export default App
