type AddressCardProps = {
  title: string
  fullName: string
  phone: string
  city: string
  district: string
  neighborhood: string
  selected?: boolean
  corporate?: boolean
  onSelect?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

const AddressCard = ({
  title,
  fullName,
  phone,
  city,
  district,
  neighborhood,
  selected = false,
  corporate = false,
  onSelect,
  onEdit,
  onDelete,
}: AddressCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={`relative flex h-full w-full cursor-pointer flex-col rounded-md border bg-white p-4 text-left shadow-sm transition-colors ${
        selected
          ? 'border-secondary ring-1 ring-secondary'
          : 'border-light-open-gray hover:border-secondary/50'
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect?.()
        }
      }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
              selected ? 'border-secondary' : 'border-light'
            }`}
          >
            {selected && <span className="h-2 w-2 rounded-full bg-secondary" />}
          </span>
          <span className="text-sm font-bold text-primary">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onEdit?.()
            }}
            className="cursor-pointer text-xs font-bold text-secondary hover:underline"
          >
            Düzenle
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onDelete?.()
            }}
            className="cursor-pointer text-xs font-bold text-red hover:underline"
          >
            Sil
          </button>
        </div>
      </div>

      <p className="text-sm font-bold text-primary">{fullName}</p>
      <p className="mt-1 text-xs font-medium text-gray-light">{phone}</p>
      <p className="mt-3 text-xs leading-5 text-gray-light">
        {city} / {district}
      </p>
      <p className="mt-1 line-clamp-3 text-xs leading-5 text-gray-light">
        {neighborhood}
      </p>

      {corporate && (
        <span className="mt-4 inline-flex w-fit rounded bg-[#F5F5F5] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-light">
          kurumsal
        </span>
      )}
    </div>
  )
}

export default AddressCard
