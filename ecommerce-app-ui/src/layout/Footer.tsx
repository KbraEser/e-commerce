import Footer from '../components/Footer'

type FooterComponentProps = {
  whiteTopBar?: boolean
}

export const FooterComponent = ({ whiteTopBar }: FooterComponentProps) => {
  return (
    <Footer whiteTopBar={whiteTopBar} />
  )
}

export default FooterComponent