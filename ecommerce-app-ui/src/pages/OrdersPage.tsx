import { useEffect, useMemo, useState } from 'react'
import FooterComponent from '../layout/Footer'
import { Header } from '../layout/Header'
import Breadcrumb from '../components/Breadcrumb'
import BrandLogos from '../components/Brands'
import { getOrders } from '../service/orderService'
import type { PreviousOrder } from '../store/types'
import { formatCartPrice } from '../utils/cartUtils'

const formatDate = (dateText: string) => {
  const date = new Date(dateText)
  if (Number.isNaN(date.getTime())) return dateText
  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<PreviousOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true)
        const data = await getOrders()
        setOrders(Array.isArray(data) ? data : [])
      } catch {
        setError('Siparişler yüklenemedi. Lütfen tekrar deneyin.')
      } finally {
        setLoading(false)
      }
    }

    void loadOrders()
  }, [])

  const sortedOrders = useMemo(
    () =>
      [...orders].sort(
        (a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
      ),
    [orders]
  )

  return (
    <>
      <Header greenBackground={true} constrained mobileVariant="shop" />
      <Breadcrumb
        title="Önceki Siparişlerim"
        items={[
          { label: 'Home', to: '/' },
          { label: 'Önceki Siparişlerim' },
        ]}
      />

      <section className="w-full bg-text-gray py-10">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 md:px-9">
          <div className="rounded-md border border-light-open-gray bg-white p-5 shadow-sm">
            <h1 className="mb-6 text-2xl font-bold text-primary">Önceki Siparişlerim</h1>

            {loading ? (
              <p className="text-sm text-gray-light">Siparişler yükleniyor...</p>
            ) : error ? (
              <p className="text-sm font-medium text-red">{error}</p>
            ) : sortedOrders.length === 0 ? (
              <p className="text-sm text-gray-light">Henüz oluşturulmuş siparişiniz bulunmuyor.</p>
            ) : (
              <div className="space-y-3">
                {sortedOrders.map((order) => (
                  <details
                    key={order.id}
                    className="overflow-hidden rounded-md border border-light-open-gray"
                  >
                    <summary className="flex cursor-pointer flex-col gap-2 bg-white px-4 py-3 marker:hidden md:flex-row md:items-center md:justify-between">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded bg-text-gray px-2 py-1 text-xs font-bold text-primary">
                          Sipariş #{order.id}
                        </span>
                        <span className="text-sm text-gray-light">{formatDate(order.order_date)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-secondary">
                          {formatCartPrice(order.price)}
                        </span>
                        <span className="text-xs font-medium text-gray-light">
                          {order.products?.length ?? 0} ürün
                        </span>
                      </div>
                    </summary>

                    <div className="border-t border-light-open-gray p-4">
                      <div className="mb-3 grid gap-2 text-xs text-gray-light sm:grid-cols-2">
                        <p>
                          <span className="font-bold text-primary">Adres ID:</span> {order.address_id}
                        </p>
                        <p>
                          <span className="font-bold text-primary">Kart:</span> ****
                          {String(order.card_no).slice(-4)}
                        </p>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse text-left text-sm">
                          <thead>
                            <tr className="bg-text-gray text-primary">
                              <th className="px-3 py-2 font-bold">Ürün ID</th>
                              <th className="px-3 py-2 font-bold">Adet</th>
                              <th className="px-3 py-2 font-bold">Detay</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(order.products ?? []).map((product) => (
                              <tr
                                key={`${order.id}-${product.product_id}-${product.detail}`}
                                className="border-t border-light-open-gray"
                              >
                                <td className="px-3 py-2">{product.product_id}</td>
                                <td className="px-3 py-2">{product.count}</td>
                                <td className="px-3 py-2">{product.detail || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <BrandLogos />
      <FooterComponent whiteTopBar />
    </>
  )
}

export default OrdersPage
