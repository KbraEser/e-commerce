import Navbar from '../components/Navbar'
import Navbar_Mobile from '../components/Navbar_Mobile'
import Navbar_Contact from '../components/Navbar_Contact'

type HeaderProps = {
  greenBackground?: boolean
  constrained?: boolean
  mobileVariant?: 'default' | 'about' | 'shop'
}

export const Header = ({
  greenBackground = false,
  constrained = false,
  mobileVariant = 'default',
}: HeaderProps) => {
  const hideMobileNavbar = mobileVariant === 'shop' || mobileVariant === 'default'

  return (
    <>
      <Navbar_Contact greenBackground={greenBackground} constrained={constrained} />
      <div className={hideMobileNavbar ? 'hidden md:block' : ''}>
        <Navbar constrained={constrained} />
      </div>
      <Navbar_Mobile variant={mobileVariant} />
    </>
  )
}
