import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import FooterComponent from '../layout/Footer'
import { Header } from '../layout/Header'
import Breadcrumb from '../components/Breadcrumb'
import BrandLogos from '../components/Brands'
import { formatCartPrice } from '../utils/cartUtils'

type OrderSuccessState = {
  orderId?: number | string
  price?: number
  itemCount?: number
}

const OrderSuccessPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = (location.state ?? {}) as OrderSuccessState

  return (
    <>
      <Header greenBackground={true} constrained mobileVariant="shop" />
      <Breadcrumb
        title="Sipariş Alındı"
        items={[
          { label: 'Home', to: '/' },
          { label: 'Sipariş Alındı' },
        ]}
      />

      <section className="w-full bg-text-gray py-10">
        <div className="mx-auto max-w-[640px] px-4 sm:px-6 md:px-9">
          <div className="rounded-md border border-light-open-gray bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-button/10">
              <CheckCircle2 className="h-11 w-11 text-button" strokeWidth={1.75} />
            </div>

            <h1 className="mb-2 text-2xl font-bold text-primary">
              Siparişiniz Başarıyla Alındı!
            </h1>
            <p className="mx-auto max-w-sm text-sm font-medium leading-6 text-gray-light">
              Siparişinizi hazırlamaya başladık. Sipariş durumunuzu "Önceki Siparişlerim"
              sayfasından takip edebilirsiniz.
            </p>

            {(state.orderId || state.price !== undefined) && (
              <div className="mx-auto mt-6 max-w-xs rounded-md border border-light-open-gray bg-text-gray p-4 text-left text-sm">
                {state.orderId && (
                  <div className="flex items-center justify-between py-1">
                    <span className="font-medium text-gray-light">Sipariş No</span>
                    <span className="font-bold text-primary">#{state.orderId}</span>
                  </div>
                )}
                {state.itemCount !== undefined && (
                  <div className="flex items-center justify-between py-1">
                    <span className="font-medium text-gray-light">Ürün Adedi</span>
                    <span className="font-bold text-primary">{state.itemCount}</span>
                  </div>
                )}
                {state.price !== undefined && (
                  <div className="flex items-center justify-between py-1">
                    <span className="font-medium text-gray-light">Toplam Tutar</span>
                    <span className="font-bold text-secondary">
                      {formatCartPrice(state.price)}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/orders"
                className="w-full cursor-pointer rounded-md bg-button px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:opacity-90 sm:w-auto"
              >
                Siparişlerim
              </Link>
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="w-full cursor-pointer rounded-md border border-light-open-gray px-6 py-3 text-center text-sm font-bold text-primary transition-colors hover:border-secondary hover:text-secondary sm:w-auto"
              >
                Alışverişe Devam Et
              </button>
            </div>
          </div>
        </div>
      </section>

      <BrandLogos />
      <FooterComponent whiteTopBar />
    </>
  )
}

export default OrderSuccessPage
