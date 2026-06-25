import Navbar from '../components/Navbar'
import Navbar_Mobile from '../components/Navbar_Mobile'
import Navbar_Contact from '../components/Navbar_Contact'

export const Header = () => {
  return (
    <>
    <Navbar_Contact />
    <Navbar />
    <Navbar_Mobile />
    </>
  )
}
