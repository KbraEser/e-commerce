import { useNavigate } from 'react-router-dom'
import { formatCartPrice } from '../../utils/cartUtils'

type CartSummaryProps = {
  productsTotal: number
  shippingFee: number
  discount: number
  grandTotal: number
}

const CartSummary = ({
  productsTotal,
  shippingFee,
  discount,
  grandTotal,
}: CartSummaryProps) => {
  const navigate = useNavigate()

  return (
    <aside className="relative z-10 rounded-md border border-light-open-gray bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-primary">Siparis Ozeti</h2>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-light">Urunler Toplami</span>
          <span className="font-bold text-primary">
            {formatCartPrice(productsTotal)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-light">Kargo Ucreti</span>
          <span className="font-bold text-primary">
            {formatCartPrice(shippingFee)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-light">Indirim</span>
          <span className="font-bold text-red">-{formatCartPrice(discount)}</span>
        </div>
      </div>

      <div className="my-4 border-t border-light-open-gray" />

      <div className="mb-5 flex items-center justify-between">
        <span className="text-base font-bold text-primary">Genel Toplam</span>
        <span className="text-2xl font-bold text-secondary">
          {formatCartPrice(grandTotal)}
        </span>
      </div>

      <button
        type="button"
        onClick={() => navigate('/checkout')}
        className="relative z-20 flex w-full cursor-pointer items-center justify-center rounded-md bg-secondary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1b8ecf]"
      >
        Create Order
      </button>
    </aside>
  )
}

export default CartSummary
