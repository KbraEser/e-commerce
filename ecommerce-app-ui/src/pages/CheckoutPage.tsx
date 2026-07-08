import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import FooterComponent from '../layout/Footer'
import { Header } from '../layout/Header'
import Breadcrumb from '../components/Breadcrumb'
import BrandLogos from '../components/Brands'
import CheckoutSteps from '../components/checkout/CheckoutSteps'
import CheckoutSummary from '../components/checkout/CheckoutSummary'
import AddressStepSection from '../components/checkout/AddressStepSection'
import PaymentStepSection from '../components/checkout/PaymentStepSection'
import type { AppDispatch, RootState } from '../store'
import {
  createAddress,
  createCard,
  deleteAddress,
  deleteCard,
  fetchAddresses,
  fetchCards,
  updateAddress,
  updateCard,
} from '../store/thunks/clientThunks'
import { resetShoppingCart, setAddress, setPayment } from '../store/slice/shoppingCartSlice'
import type { AddressPayload, CreditCardPayload, OrderPayload } from '../store/types'
import { getCartTotalCount, getSelectedCartTotal } from '../utils/cartUtils'
import { createOrder } from '../service/orderService'

const cityOptions = [
  'ankara',
  'istanbul',
  'izmir',
  'bursa',
  'antalya',
  'konya',
  'kocaeli',
  'adana',
]

const emptyAddressForm: AddressPayload = {
  title: '',
  name: '',
  surname: '',
  phone: '',
  city: 'istanbul',
  district: '',
  neighborhood: '',
}

const emptyCardForm: CreditCardPayload = {
  card_no: '',
  expire_month: 0,
  expire_year: 0,
  name_on_card: '',
}

type CardFormErrors = {
  card_no?: string
  expire_month?: string
  expire_year?: string
  name_on_card?: string
  cvv?: string
}

const cardValidationSchema = yup.object({
  card_no: yup
    .string()
    .required('Kart numarası zorunludur.')
    .matches(/^\d{16}$/, 'Kart numarası 16 haneli ve sadece rakamlardan oluşmalıdır.'),
  expire_month: yup
    .number()
    .typeError('Ay seçimi zorunludur.')
    .min(1, 'Ay seçimi zorunludur.')
    .max(12, 'Geçerli bir ay seçiniz.')
    .required('Ay seçimi zorunludur.'),
  expire_year: yup
    .number()
    .typeError('Yıl seçimi zorunludur.')
    .min(new Date().getFullYear(), 'Geçerli bir yıl seçiniz.')
    .required('Yıl seçimi zorunludur.'),
  name_on_card: yup
    .string()
    .trim()
    .required('Kart üzerindeki isim zorunludur.')
    .min(3, 'Kart üzerindeki isim en az 3 karakter olmalıdır.'),
  cvv: yup
    .string()
    .required('CVV zorunludur.')
    .matches(/^\d{3,4}$/, 'CVV 3 veya 4 haneli olmalıdır.'),
})

const maskCardNumber = (cardNo: string) => {
  const clean = cardNo.replace(/\s+/g, '')
  if (clean.length < 10) return cardNo
  return `${clean.slice(0, 4)} **** **** ${clean.slice(-4)}`
}

const getBankLabel = (cardNo: string) => {
  if (cardNo.startsWith('4')) return 'Vakıfbank kartım'
  if (cardNo.startsWith('5')) return 'Bonus kartım'
  return 'Kredi kartım'
}

const CheckoutPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const cart = useSelector((state: RootState) => state.shoppingCart.cart)
  const { addressList, addressFetchState, creditCards, cardFetchState } = useSelector(
    (state: RootState) => state.client
  )

  const [activeStep, setActiveStep] = useState<1 | 2>(1)

  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState<number | null>(null)
  const [selectedReceiptAddressId, setSelectedReceiptAddressId] = useState<number | null>(null)
  const [sameInvoiceAddress, setSameInvoiceAddress] = useState(true)

  const [isAddressFormVisible, setIsAddressFormVisible] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null)
  const [addressFormValues, setAddressFormValues] = useState<AddressPayload>(emptyAddressForm)

  const [isCardFormVisible, setIsCardFormVisible] = useState(false)
  const [editingCardId, setEditingCardId] = useState<number | string | null>(null)
  const [cardFormValues, setCardFormValues] = useState<CreditCardPayload>(emptyCardForm)
  const [selectedCardId, setSelectedCardId] = useState<number | string | null>(null)
  const [use3DSecure, setUse3DSecure] = useState(false)
  const [cvv, setCvv] = useState('')
  const [cardErrors, setCardErrors] = useState<CardFormErrors>({})
  const [isOrderSubmitting, setIsOrderSubmitting] = useState(false)

  useEffect(() => {
    dispatch(fetchAddresses())
    dispatch(fetchCards())
  }, [dispatch])

  useEffect(() => {
    if (addressList.length === 0) {
      setSelectedShippingAddressId(null)
      setSelectedReceiptAddressId(null)
      return
    }

    if (!selectedShippingAddressId) {
      setSelectedShippingAddressId(addressList[0].id ?? null)
    }

    if (!selectedReceiptAddressId) {
      setSelectedReceiptAddressId(addressList[0].id ?? null)
    }
  }, [addressList, selectedReceiptAddressId, selectedShippingAddressId])

  useEffect(() => {
    if (creditCards.length > 0 && !selectedCardId) {
      setSelectedCardId(creditCards[0].id ?? null)
    }
  }, [creditCards, selectedCardId])

  const shippingAddress = addressList.find((address) => address.id === selectedShippingAddressId)
  const receiptAddress = sameInvoiceAddress
    ? shippingAddress
    : addressList.find((address) => address.id === selectedReceiptAddressId)

  useEffect(() => {
    dispatch(setAddress(shippingAddress ?? null))
  }, [dispatch, shippingAddress])

  useEffect(() => {
    const selectedCard = creditCards.find((card) => card.id === selectedCardId)
    if (!selectedCard) {
      dispatch(setPayment(null))
      return
    }

    dispatch(
      setPayment({
        cardHolder: selectedCard.name_on_card,
        cardNumber: selectedCard.card_no,
        expiryMonth: String(selectedCard.expire_month),
        expiryYear: String(selectedCard.expire_year),
      })
    )
  }, [creditCards, dispatch, selectedCardId])

  const selectedTotal = getSelectedCartTotal(cart)
  const selectedCartItems = cart.filter((item) => item.checked)
  const selectedCount = getCartTotalCount(cart.filter((item) => item.checked))
  const shippingFee = selectedCount > 0 ? 29.99 : 0
  const discount = selectedTotal >= 150 ? shippingFee : 0
  const grandTotal = selectedTotal + shippingFee - discount

  const addressTitle = useMemo(
    () => shippingAddress?.title ?? 'Adres seçiniz',
    [shippingAddress]
  )

  const handleContinue = () => {
    if (activeStep === 1) {
      if (!shippingAddress) {
        toast.error('Lütfen teslimat adresi seçiniz.')
        return
      }
      if (!sameInvoiceAddress && !receiptAddress) {
        toast.error('Lütfen fatura adresi seçiniz.')
        return
      }
      setActiveStep(2)
      return
    }

    void handleCreateOrder()
  }

  const handleCreateOrder = async () => {
    if (isOrderSubmitting) return

    if (!shippingAddress?.id) {
      toast.error('Lütfen teslimat adresi seçiniz.')
      return
    }

    const selectedCard = creditCards.find((card) => card.id === selectedCardId)
    if (!selectedCard) {
      toast.error('Lütfen bir kart seçiniz.')
      return
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      setCardErrors((prev) => ({ ...prev, cvv: 'CVV 3 veya 4 haneli olmalıdır.' }))
      toast.error('Lütfen geçerli bir CVV giriniz.')
      return
    }

    if (selectedCartItems.length === 0) {
      toast.error('Sipariş için en az bir ürün seçiniz.')
      return
    }

    const payload: OrderPayload = {
      address_id: shippingAddress.id,
      order_date: new Date().toISOString().slice(0, 19),
      card_no: Number(selectedCard.card_no.replace(/\s+/g, '')),
      card_name: selectedCard.name_on_card,
      card_expire_month: Number(selectedCard.expire_month),
      card_expire_year: Number(selectedCard.expire_year),
      card_ccv: Number(cvv),
      price: Number(grandTotal.toFixed(2)),
      products: selectedCartItems.map((item) => ({
        product_id: item.product.id,
        count: item.count,
        detail: 'standart',
      })),
    }

    try {
      setIsOrderSubmitting(true)
      await createOrder(payload)
      toast.success('Tebrikler! Siparişiniz başarıyla oluşturuldu.')

      dispatch(resetShoppingCart())
      setActiveStep(1)
      setSelectedShippingAddressId(null)
      setSelectedReceiptAddressId(null)
      setSelectedCardId(null)
      setUse3DSecure(false)
      setCvv('')
      setCardErrors({})
      setIsCardFormVisible(false)
      setEditingCardId(null)
      setCardFormValues(emptyCardForm)
    } catch {
      toast.error('Sipariş oluşturulamadı. Lütfen tekrar deneyiniz.')
    } finally {
      setIsOrderSubmitting(false)
    }
  }

  const resetAddressForm = () => {
    setEditingAddressId(null)
    setAddressFormValues(emptyAddressForm)
    setIsAddressFormVisible(false)
  }

  const openCreateAddressForm = () => {
    setEditingAddressId(null)
    setAddressFormValues(emptyAddressForm)
    setIsAddressFormVisible(true)
  }

  const openEditAddressForm = (addressId?: number) => {
    if (!addressId) return
    const address = addressList.find((item) => item.id === addressId)
    if (!address) return

    setEditingAddressId(addressId)
    setAddressFormValues({
      title: address.title,
      name: address.name,
      surname: address.surname,
      phone: address.phone,
      city: address.city,
      district: address.district,
      neighborhood: address.neighborhood,
    })
    setIsAddressFormVisible(true)
  }

  const handleDeleteAddress = async (addressId?: number) => {
    if (!addressId) return

    const result = await dispatch(deleteAddress(addressId))
    if (deleteAddress.fulfilled.match(result)) {
      toast.success('Adres silindi')
    } else {
      toast.error('Adres silinemedi')
    }
  }

  const handleAddressSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (editingAddressId) {
      const result = await dispatch(
        updateAddress({
          id: editingAddressId,
          ...addressFormValues,
        })
      )

      if (updateAddress.fulfilled.match(result)) {
        toast.success('Adres güncellendi')
        resetAddressForm()
      } else {
        toast.error('Adres güncellenemedi')
      }

      return
    }

    const result = await dispatch(createAddress(addressFormValues))

    if (createAddress.fulfilled.match(result)) {
      toast.success('Adres eklendi')
      resetAddressForm()
    } else {
      toast.error('Adres eklenemedi')
    }
  }

  const resetCardForm = () => {
    setEditingCardId(null)
    setCardFormValues(emptyCardForm)
    setIsCardFormVisible(false)
    setCvv('')
    setCardErrors({})
  }

  const openCreateCardForm = () => {
    setEditingCardId(null)
    setCardFormValues(emptyCardForm)
    setIsCardFormVisible(true)
    setCvv('')
    setCardErrors({})
  }

  const openEditCardForm = (cardId?: number | string) => {
    if (!cardId) return
    const card = creditCards.find((item) => item.id === cardId)
    if (!card) return

    setEditingCardId(cardId)
    setCardFormValues({
      card_no: card.card_no,
      expire_month: Number(card.expire_month),
      expire_year: Number(card.expire_year),
      name_on_card: card.name_on_card,
    })
    setIsCardFormVisible(true)
    setCvv('')
    setCardErrors({})
  }

  const handleDeleteCard = async (cardId?: number | string) => {
    if (!cardId) return

    const result = await dispatch(deleteCard(cardId))
    if (deleteCard.fulfilled.match(result)) {
      toast.success('Kart silindi')
    } else {
      toast.error('Kart silinemedi')
    }
  }

  const handleCardSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await cardValidationSchema.validate(
        {
          ...cardFormValues,
          cvv,
        },
        { abortEarly: false }
      )
      setCardErrors({})
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const nextErrors: CardFormErrors = {}
        error.inner.forEach((item) => {
          if (item.path && !nextErrors[item.path as keyof CardFormErrors]) {
            nextErrors[item.path as keyof CardFormErrors] = item.message
          }
        })
        setCardErrors(nextErrors)
      }
      return
    }

    const payload: CreditCardPayload = {
      card_no: cardFormValues.card_no.replace(/\s+/g, ''),
      expire_month: Number(cardFormValues.expire_month),
      expire_year: Number(cardFormValues.expire_year),
      name_on_card: cardFormValues.name_on_card.trim(),
    }

    if (editingCardId) {
      const result = await dispatch(updateCard({ id: editingCardId, ...payload }))
      if (updateCard.fulfilled.match(result)) {
        toast.success('Kart güncellendi')
        resetCardForm()
      } else {
        toast.error('Kart güncellenemedi')
      }
      return
    }

    const result = await dispatch(createCard(payload))
    if (createCard.fulfilled.match(result)) {
      toast.success('Kart eklendi')
      resetCardForm()
    } else {
      toast.error('Kart eklenemedi')
    }
  }

  return (
    <>
      <Header greenBackground={true} constrained mobileVariant="shop" />
      <Breadcrumb
        title="Checkout"
        items={[
          { label: 'Home', to: '/' },
          { label: 'Shop', to: '/shop' },
          { label: 'Cart', to: '/cart' },
          { label: 'Checkout' },
        ]}
      />

      <section className="w-full bg-text-gray py-10">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 md:px-9">
          <div className="mb-6">
            <CheckoutSteps
              activeStep={activeStep}
              selectedAddressTitle={addressTitle}
              onStepChange={setActiveStep}
            />
          </div>

          <div className="mb-6 rounded-md border border-[#FFE1C2] bg-[#FFF7EF] px-4 py-3 text-xs font-medium text-gray-light">
            {activeStep === 1
              ? 'Kurumsal fatura isterseniz adres bilgilerinizin doğru olduğundan emin olun.'
              : 'Kart bilgilerini güvenli bağlantı ile girerek ödemenizi tamamlayabilirsiniz.'}
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
            {activeStep === 1 ? (
              <AddressStepSection
                addressFetchState={addressFetchState}
                addressList={addressList}
                sameInvoiceAddress={sameInvoiceAddress}
                onSameInvoiceAddressChange={setSameInvoiceAddress}
                selectedShippingAddressId={selectedShippingAddressId}
                onSelectShippingAddress={setSelectedShippingAddressId}
                selectedReceiptAddressId={selectedReceiptAddressId}
                onSelectReceiptAddress={setSelectedReceiptAddressId}
                isAddressFormVisible={isAddressFormVisible}
                editingAddressId={editingAddressId}
                addressFormValues={addressFormValues}
                setAddressFormValues={setAddressFormValues}
                cityOptions={cityOptions}
                onOpenCreateAddressForm={openCreateAddressForm}
                onOpenEditAddressForm={openEditAddressForm}
                onDeleteAddress={handleDeleteAddress}
                onSubmitAddressForm={handleAddressSubmit}
                onResetAddressForm={resetAddressForm}
              />
            ) : (
              <PaymentStepSection
                cardFetchState={cardFetchState}
                creditCards={creditCards}
                selectedCardId={selectedCardId}
                onSelectCard={setSelectedCardId}
                onOpenCreateCardForm={openCreateCardForm}
                onOpenEditCardForm={openEditCardForm}
                onDeleteCard={handleDeleteCard}
                grandTotal={grandTotal}
                isCardFormVisible={isCardFormVisible}
                onSubmitCardForm={handleCardSubmit}
                editingCardId={editingCardId}
                onResetCardForm={resetCardForm}
                cardFormValues={cardFormValues}
                setCardFormValues={setCardFormValues}
                cardErrors={cardErrors}
                cvv={cvv}
                onCvvChange={setCvv}
                use3DSecure={use3DSecure}
                onUse3DSecureChange={setUse3DSecure}
                maskCardNumber={maskCardNumber}
                getBankLabel={getBankLabel}
              />
            )}

            <div className="xl:sticky xl:top-6">
              <CheckoutSummary
                productsTotal={selectedTotal}
                shippingFee={shippingFee}
                discount={discount}
                grandTotal={grandTotal}
                ctaLabel={activeStep === 1 ? 'Kaydet ve Devam Et' : 'Ödeme Yap'}
                onSubmit={handleContinue}
              />
            </div>
          </div>
        </div>
      </section>

      <BrandLogos />
      <FooterComponent whiteTopBar />
    </>
  )
}

export default CheckoutPage
