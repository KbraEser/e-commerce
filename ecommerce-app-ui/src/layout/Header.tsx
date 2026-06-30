import Navbar from '../components/Navbar'
import Navbar_Mobile from '../components/Navbar_Mobile'
import Navbar_Contact from '../components/Navbar_Contact'

type HeaderProps = {
  greenBackground?: boolean
}
export const Header = ({greenBackground = false}:HeaderProps) => {
  return (
    <>
    <Navbar_Contact greenBackground={greenBackground} />
    <Navbar />
    <Navbar_Mobile />
    </>
  )
}
