import { Plus } from 'lucide-react'

type AddAddressCardProps = {
  onClick?: () => void
}

const AddAddressCard = ({ onClick }: AddAddressCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-full min-h-[180px] w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-light-open-gray bg-white p-4 shadow-sm transition-colors hover:border-secondary"
    >
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
        <Plus className="h-5 w-5" />
      </span>
      <span className="text-sm font-bold text-secondary">Yeni Adres Ekle</span>
    </button>
  )
}

export default AddAddressCard
