import type { Dispatch, FormEvent, SetStateAction } from 'react'
import type { CreditCard, CreditCardPayload, FetchState } from '../../store/types'

type CardFormErrors = {
  card_no?: string
  expire_month?: string
  expire_year?: string
  name_on_card?: string
  cvv?: string
}

type PaymentStepSectionProps = {
  cardFetchState: FetchState
  creditCards: CreditCard[]
  selectedCardId: number | string | null
  onSelectCard: (cardId: number | string | null) => void
  onOpenCreateCardForm: () => void
  onOpenEditCardForm: (cardId?: number | string) => void
  onDeleteCard: (cardId?: number | string) => void
  grandTotal: number
  isCardFormVisible: boolean
  onSubmitCardForm: (event: FormEvent) => void
  editingCardId: number | string | null
  onResetCardForm: () => void
  cardFormValues: CreditCardPayload
  setCardFormValues: Dispatch<SetStateAction<CreditCardPayload>>
  cardErrors: CardFormErrors
  cvv: string
  onCvvChange: (value: string) => void
  use3DSecure: boolean
  onUse3DSecureChange: (checked: boolean) => void
  maskCardNumber: (cardNo: string) => string
  getBankLabel: (cardNo: string) => string
}

const PaymentStepSection = ({
  cardFetchState,
  creditCards,
  selectedCardId,
  onSelectCard,
  onOpenCreateCardForm,
  onOpenEditCardForm,
  onDeleteCard,
  grandTotal,
  isCardFormVisible,
  onSubmitCardForm,
  editingCardId,
  onResetCardForm,
  cardFormValues,
  setCardFormValues,
  cardErrors,
  cvv,
  onCvvChange,
  use3DSecure,
  onUse3DSecureChange,
  maskCardNumber,
  getBankLabel,
}: PaymentStepSectionProps) => {
  return (
    <div className="overflow-hidden rounded-md border border-light-open-gray bg-white shadow-sm">
      <div className="border-b border-light-open-gray px-5 py-4">
        <h2 className="text-xl font-bold text-primary">Kart ile Öde</h2>
        <p className="mt-1 text-sm text-gray-light">
          Kart ile ödemeyi seçtiniz. Banka veya Kredi Kartı kullanarak ödemenizi güvenle
          yapabilirsiniz.
        </p>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="border-b border-light-open-gray p-5 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-[30px] leading-tight font-normal text-primary">Kart Bilgileri</h3>
            <button
              type="button"
              onClick={onOpenCreateCardForm}
              className="cursor-pointer text-sm font-bold text-gray-light underline"
            >
              Başka bir Kart ile Ödeme Yap
            </button>
          </div>

          {cardFetchState === 'FETCHING' ? (
            <p className="py-4 text-sm text-gray-light">Kartlar yükleniyor...</p>
          ) : creditCards.length === 0 ? (
            <p className="py-4 text-sm text-gray-light">Kayıtlı kart bulunamadı.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {creditCards.map((card) => (
                <button
                  key={String(card.id)}
                  type="button"
                  onClick={() => onSelectCard(card.id ?? null)}
                  className={`cursor-pointer rounded-md border p-3 text-left transition-colors ${
                    selectedCardId === card.id
                      ? 'border-secondary ring-1 ring-secondary'
                      : 'border-light-open-gray hover:border-secondary/50'
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`h-4 w-4 rounded-full border ${
                        selectedCardId === card.id
                          ? 'border-secondary ring-2 ring-secondary/20'
                          : 'border-light-open-gray'
                      }`}
                    />
                    <p className="text-sm font-bold text-gray-light">{getBankLabel(card.card_no)}</p>
                  </div>
                  <div className="rounded border border-light-open-gray bg-white p-2">
                    <div className="mb-3 flex items-start justify-between">
                      <p className="text-xs font-semibold text-primary">{card.name_on_card}</p>
                      <div className="flex -space-x-2">
                        <span className="h-4 w-4 rounded-full bg-[#EA001B]" />
                        <span className="h-4 w-4 rounded-full bg-[#F79E1B]" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-primary">{maskCardNumber(card.card_no)}</p>
                    <p className="mt-1 text-right text-xs text-gray-light">
                      {card.expire_month}/{card.expire_year}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        onOpenEditCardForm(card.id)
                      }}
                      className="cursor-pointer text-xs font-bold text-secondary hover:underline"
                    >
                      Düzenle
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        onDeleteCard(card.id)
                      }}
                      className="cursor-pointer text-xs font-bold text-red hover:underline"
                    >
                      Sil
                    </button>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-[30px] leading-tight font-normal text-primary">Taksit Seçenekleri</h3>
          <p className="mt-1 text-sm text-gray-light">Kartınıza uygun taksit seçeneğini seçiniz</p>

          <div className="mt-4 overflow-hidden rounded-md border border-light-open-gray">
            <div className="grid grid-cols-2 bg-text-gray px-4 py-3 text-sm font-bold text-primary">
              <span>Taksit Sayısı</span>
              <span>Aylık Ödeme</span>
            </div>
            <button
              type="button"
              className="grid w-full cursor-pointer grid-cols-2 border-t border-light-open-gray px-4 py-3 text-left text-sm transition-colors hover:bg-text-gray"
            >
              <span className="font-bold text-secondary">Tek Çekim</span>
              <span className="font-bold text-secondary">
                {grandTotal.toLocaleString('tr-TR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                TL
              </span>
            </button>
          </div>
        </div>
      </div>

      {isCardFormVisible && (
        <form onSubmit={onSubmitCardForm} className="border-t border-light-open-gray bg-text-gray p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold text-primary">
              {editingCardId ? 'Kartı Güncelle' : 'Kart Bilgileri'}
            </h3>
            <button
              type="button"
              onClick={onResetCardForm}
              className="cursor-pointer text-sm font-bold text-gray-light underline"
            >
              Kayıtlı kartımla ödeme yap
            </button>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-primary">Kart Numarası</label>
              <input
                type="text"
                value={cardFormValues.card_no}
                onChange={(event) =>
                  setCardFormValues((prev) => ({
                    ...prev,
                    card_no: event.target.value.replace(/\D/g, '').slice(0, 16),
                  }))
                }
                placeholder="____ ____ ____ ____"
                required
                inputMode="numeric"
                className="w-full rounded-xl border border-light-open-gray bg-white px-4 py-3 text-sm text-primary"
              />
              {cardErrors.card_no && (
                <p className="mt-1 text-xs font-medium text-red">{cardErrors.card_no}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_1fr_220px]">
              <div>
                <label className="mb-1 block text-sm font-medium text-primary">Son Kullanma Tarihi</label>
                <select
                  value={cardFormValues.expire_month}
                  onChange={(event) =>
                    setCardFormValues((prev) => ({
                      ...prev,
                      expire_month: Number(event.target.value),
                    }))
                  }
                  className="w-full cursor-pointer rounded-xl border border-light-open-gray bg-white px-4 py-3 text-sm text-primary"
                >
                  <option value={0}>Ay</option>
                  {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                {cardErrors.expire_month && (
                  <p className="mt-1 text-xs font-medium text-red">{cardErrors.expire_month}</p>
                )}
              </div>
              <div className="pt-6 sm:pt-0">
                <label className="mb-1 block text-sm font-medium text-primary sm:opacity-0">Yıl</label>
                <select
                  value={cardFormValues.expire_year}
                  onChange={(event) =>
                    setCardFormValues((prev) => ({
                      ...prev,
                      expire_year: Number(event.target.value),
                    }))
                  }
                  className="w-full cursor-pointer rounded-xl border border-light-open-gray bg-white px-4 py-3 text-sm text-primary"
                >
                  <option value={0}>Yıl</option>
                  {Array.from({ length: 15 }, (_, index) => new Date().getFullYear() + index).map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  )}
                </select>
                {cardErrors.expire_year && (
                  <p className="mt-1 text-xs font-medium text-red">{cardErrors.expire_year}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-primary">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(event) => onCvvChange(event.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  placeholder="***"
                  inputMode="numeric"
                  className="w-full rounded-xl border border-light-open-gray bg-white px-4 py-3 text-sm text-primary"
                />
                {cardErrors.cvv && (
                  <p className="mt-1 text-xs font-medium text-red">{cardErrors.cvv}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-primary">Kart Üzerindeki Ad Soyad</label>
              <input
                type="text"
                value={cardFormValues.name_on_card}
                onChange={(event) =>
                  setCardFormValues((prev) => ({
                    ...prev,
                    name_on_card: event.target.value,
                  }))
                }
                placeholder="İsim Soyisim"
                required
                className="w-full rounded-xl border border-light-open-gray bg-white px-4 py-3 text-sm text-primary"
              />
              {cardErrors.name_on_card && (
                <p className="mt-1 text-xs font-medium text-red">{cardErrors.name_on_card}</p>
              )}
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm font-bold text-primary">
              <input
                type="checkbox"
                checked={use3DSecure}
                onChange={(event) => onUse3DSecureChange(event.target.checked)}
                className="h-4 w-4 accent-secondary"
              />
              3D Secure ile ödemek istiyorum.
            </label>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-secondary px-4 py-2 text-sm font-bold text-white"
            >
              Kaydet
            </button>
            <button
              type="button"
              onClick={onResetCardForm}
              className="cursor-pointer rounded-md border border-light-open-gray bg-white px-4 py-2 text-sm font-bold text-primary"
            >
              İptal
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default PaymentStepSection
