import { Link } from 'react-router-dom'
import { Header } from '../layout/Header'
import FooterComponent from '../layout/Footer'

type UnderConstructionPageProps = {
  title: string
}

const UnderConstructionPage = ({ title }: UnderConstructionPageProps) => {
  return (
    <>
      <Header greenBackground={true} constrained mobileVariant="shop" />
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-text-gray px-6 text-center">
        <h1 className="text-3xl font-bold text-primary">{title}</h1>
        <p className="text-sm font-medium text-gray-light">
          Bu sayfa geliştiriliyor, yakında burada olacak.
        </p>
        <Link
          to="/"
          className="mt-2 rounded-md bg-secondary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1b8ecc]"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
      <FooterComponent whiteTopBar />
    </>
  )
}

export default UnderConstructionPage
