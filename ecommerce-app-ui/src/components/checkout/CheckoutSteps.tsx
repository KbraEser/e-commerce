type CheckoutStepsProps = {
  activeStep: 1 | 2
  selectedAddressTitle?: string
  onStepChange?: (step: 1 | 2) => void
}

const CheckoutSteps = ({
  activeStep,
  selectedAddressTitle = 'Ev',
  onStepChange,
}: CheckoutStepsProps) => {
  return (
    <div className="overflow-hidden rounded-md border border-light-open-gray bg-white shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <button
          type="button"
          onClick={() => onStepChange?.(1)}
          className={`cursor-pointer border-b-[3px] px-5 py-4 text-left transition-colors ${
            activeStep === 1
              ? 'border-secondary bg-white'
              : 'border-transparent bg-text-gray'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p
                className={`text-sm font-bold ${
                  activeStep === 1 ? 'text-secondary' : 'text-gray-light'
                }`}
              >
                Adres Bilgileri
              </p>
              <p className="mt-1 line-clamp-1 text-xs text-gray-light">{selectedAddressTitle}</p>
            </div>
            {activeStep === 2 && (
              <span className="text-xs font-bold text-gray-light underline">Değiştir</span>
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={() => onStepChange?.(2)}
          className={`cursor-pointer border-b-[3px] px-5 py-4 text-left transition-colors ${
            activeStep === 2
              ? 'border-secondary bg-white'
              : 'border-transparent bg-text-gray'
          }`}
        >
          <p
            className={`text-sm font-bold ${
              activeStep === 2 ? 'text-secondary' : 'text-gray-light'
            }`}
          >
            Ödeme Seçenekleri
          </p>
          <p className="mt-1 text-xs text-gray-light">
            Banka/Kredi Kartı veya Alışveriş Kredisi ile ödemenizi güvenle yapabilirsiniz.
          </p>
        </button>
      </div>
    </div>
  )
}

export default CheckoutSteps
