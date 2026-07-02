import type { SelectHTMLAttributes } from 'react'

type SelectFieldProps = {
  label: string
  error?: string
  options: { value: number | string; label: string }[]
} & SelectHTMLAttributes<HTMLSelectElement>

const SelectField = ({
  label,
  error,
  options,
  id,
  className = '',
  ...props
}: SelectFieldProps) => {
  const fieldId = id ?? props.name

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-bold text-primary">
        {label}
      </label>
      <div className="relative">
        <select
          id={fieldId}
          className={`w-full appearance-none rounded-lg border bg-white px-4 py-3.5 pr-10 text-sm font-medium text-primary outline-none transition-all focus:ring-2 focus:ring-secondary/20 ${
            error
              ? 'border-red focus:border-red'
              : 'border-light-open-gray focus:border-secondary'
          } ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-light">
          ▾
        </span>
      </div>
      {error && <p className="text-xs font-medium text-red">{error}</p>}
    </div>
  )
}

export default SelectField
