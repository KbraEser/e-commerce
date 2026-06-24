import { BrowserRouter } from 'react-router-dom'
import Navbar_Contact from './components/Navbar_Contact'
import Navbar from './components/Navbar'
import Navbar_Mobile from './components/Navbar_Mobile'

function App() {
  

  return (
    <BrowserRouter>
    <Navbar_Contact />
    <Navbar />
    <Navbar_Mobile />
    </BrowserRouter>
  )
}

export default App
