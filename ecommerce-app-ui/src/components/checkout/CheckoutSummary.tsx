import { formatCartPrice } from '../../utils/cartUtils'

type CheckoutSummaryProps = {
  productsTotal: number
  shippingFee: number
  discount: number
  grandTotal: number
  ctaLabel?: string
  onSubmit?: () => void
}

const CheckoutSummary = ({
  productsTotal,
  shippingFee,
  discount,
  grandTotal,
  ctaLabel = 'Kaydet ve Devam Et',
  onSubmit,
}: CheckoutSummaryProps) => {
  return (
    <aside className="space-y-4">
      <button
        type="button"
        onClick={onSubmit}
        className="w-full cursor-pointer rounded-md bg-secondary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1b8ecf]"
      >
        {ctaLabel}
      </button>

      <label className="flex cursor-pointer items-start gap-2 rounded-md border border-light-open-gray bg-white p-3 text-xs leading-5 text-gray-light">
        <input
          type="checkbox"
          defaultChecked
          className="mt-0.5 h-4 w-4 accent-secondary"
        />
        <span>
          <span className="font-bold text-secondary">Ön Bilgilendirme Koşulları</span>
          {"'nı"} ve{' '}
          <span className="font-bold text-secondary">Mesafeli Satış Sözleşmesi</span>
          {"'ni"} okudum, onaylıyorum.
        </span>
      </label>

      <div className="rounded-md border border-light-open-gray bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-primary">Sipariş Özeti</h2>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-light">Ürünlerin Toplamı</span>
            <span className="font-bold text-primary">
              {formatCartPrice(productsTotal)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-light">Kargo Toplamı</span>
            <span className="font-bold text-primary">
              {formatCartPrice(shippingFee)}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <span className="font-medium text-gray-light">
              150 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)
            </span>
            <span className="shrink-0 font-bold text-secondary">
              -{formatCartPrice(discount)}
            </span>
          </div>
        </div>

        <div className="my-4 border-t border-light-open-gray" />

        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-primary">Toplam</span>
          <span className="text-2xl font-bold text-secondary">
            {formatCartPrice(grandTotal)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        className="w-full cursor-pointer rounded-md bg-secondary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1b8ecf]"
      >
        {ctaLabel}
      </button>
    </aside>
  )
}

export default CheckoutSummary
