import type { Dispatch, FormEvent, SetStateAction } from 'react'
import AddAddressCard from './AddAddressCard'
import AddressCard from './AddressCard'
import type { Address, AddressPayload, FetchState } from '../../store/types'

type AddressStepSectionProps = {
  addressFetchState: FetchState
  addressList: Address[]
  sameInvoiceAddress: boolean
  onSameInvoiceAddressChange: (checked: boolean) => void
  selectedShippingAddressId: number | null
  onSelectShippingAddress: (addressId: number | null) => void
  selectedReceiptAddressId: number | null
  onSelectReceiptAddress: (addressId: number | null) => void
  isAddressFormVisible: boolean
  editingAddressId: number | null
  addressFormValues: AddressPayload
  setAddressFormValues: Dispatch<SetStateAction<AddressPayload>>
  cityOptions: string[]
  onOpenCreateAddressForm: () => void
  onOpenEditAddressForm: (addressId?: number) => void
  onDeleteAddress: (addressId?: number) => void
  onSubmitAddressForm: (event: FormEvent) => void
  onResetAddressForm: () => void
}

const AddressStepSection = ({
  addressFetchState,
  addressList,
  sameInvoiceAddress,
  onSameInvoiceAddressChange,
  selectedShippingAddressId,
  onSelectShippingAddress,
  selectedReceiptAddressId,
  onSelectReceiptAddress,
  isAddressFormVisible,
  editingAddressId,
  addressFormValues,
  setAddressFormValues,
  cityOptions,
  onOpenCreateAddressForm,
  onOpenEditAddressForm,
  onDeleteAddress,
  onSubmitAddressForm,
  onResetAddressForm,
}: AddressStepSectionProps) => {
  return (
    <div className="rounded-md border border-light-open-gray bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-primary">Teslimat Adresi</h1>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-light">
          <input
            type="checkbox"
            checked={sameInvoiceAddress}
            onChange={(event) => onSameInvoiceAddressChange(event.target.checked)}
            className="h-4 w-4 accent-secondary"
          />
          Faturamı Aynı Adrese Gönder
        </label>
      </div>

      {addressFetchState === 'FETCHING' ? (
        <p className="py-4 text-sm text-gray-light">Adresler yükleniyor...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <AddAddressCard onClick={onOpenCreateAddressForm} />
          {addressList.map((address) => (
            <AddressCard
              key={address.id}
              title={address.title}
              fullName={`${address.name} ${address.surname}`}
              phone={address.phone}
              city={address.city}
              district={address.district}
              neighborhood={address.neighborhood}
              selected={selectedShippingAddressId === address.id}
              onSelect={() => onSelectShippingAddress(address.id ?? null)}
              onEdit={() => onOpenEditAddressForm(address.id)}
              onDelete={() => onDeleteAddress(address.id)}
            />
          ))}
        </div>
      )}

      {!sameInvoiceAddress && (
        <>
          <div className="my-6 border-t border-light-open-gray" />
          <h2 className="mb-4 text-lg font-bold text-primary">Fatura Adresi</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {addressList.map((address) => (
              <AddressCard
                key={`receipt-${address.id}`}
                title={address.title}
                fullName={`${address.name} ${address.surname}`}
                phone={address.phone}
                city={address.city}
                district={address.district}
                neighborhood={address.neighborhood}
                selected={selectedReceiptAddressId === address.id}
                onSelect={() => onSelectReceiptAddress(address.id ?? null)}
              />
            ))}
          </div>
        </>
      )}

      {isAddressFormVisible && (
        <form
          onSubmit={onSubmitAddressForm}
          className="mt-6 rounded-md border border-light-open-gray bg-text-gray p-4"
        >
          <h3 className="mb-4 text-base font-bold text-primary">
            {editingAddressId ? 'Adresi Güncelle' : 'Yeni Adres Ekle'}
          </h3>

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={addressFormValues.title}
              onChange={(event) =>
                setAddressFormValues((prev) => ({ ...prev, title: event.target.value }))
              }
              placeholder="Adres Başlığı"
              required
              className="w-full rounded-md border border-light-open-gray bg-white px-3 py-2 text-sm text-primary"
            />
            <input
              type="text"
              value={addressFormValues.phone}
              onChange={(event) =>
                setAddressFormValues((prev) => ({ ...prev, phone: event.target.value }))
              }
              placeholder="Telefon"
              required
              className="w-full rounded-md border border-light-open-gray bg-white px-3 py-2 text-sm text-primary"
            />
            <input
              type="text"
              value={addressFormValues.name}
              onChange={(event) =>
                setAddressFormValues((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="Ad"
              required
              className="w-full rounded-md border border-light-open-gray bg-white px-3 py-2 text-sm text-primary"
            />
            <input
              type="text"
              value={addressFormValues.surname}
              onChange={(event) =>
                setAddressFormValues((prev) => ({ ...prev, surname: event.target.value }))
              }
              placeholder="Soyad"
              required
              className="w-full rounded-md border border-light-open-gray bg-white px-3 py-2 text-sm text-primary"
            />
            <select
              value={addressFormValues.city}
              onChange={(event) =>
                setAddressFormValues((prev) => ({ ...prev, city: event.target.value }))
              }
              className="w-full cursor-pointer rounded-md border border-light-open-gray bg-white px-3 py-2 text-sm text-primary"
            >
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={addressFormValues.district}
              onChange={(event) =>
                setAddressFormValues((prev) => ({ ...prev, district: event.target.value }))
              }
              placeholder="İlçe"
              required
              className="w-full rounded-md border border-light-open-gray bg-white px-3 py-2 text-sm text-primary"
            />
          </div>

          <textarea
            value={addressFormValues.neighborhood}
            onChange={(event) =>
              setAddressFormValues((prev) => ({ ...prev, neighborhood: event.target.value }))
            }
            placeholder="Mahalle / Adres Detayı"
            rows={4}
            required
            className="mt-3 w-full rounded-md border border-light-open-gray bg-white px-3 py-2 text-sm text-primary"
          />

          <div className="mt-4 flex items-center gap-3">
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-secondary px-4 py-2 text-sm font-bold text-white"
            >
              Kaydet
            </button>
            <button
              type="button"
              onClick={onResetAddressForm}
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

export default AddressStepSection
