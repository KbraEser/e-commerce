import type { InputHTMLAttributes } from 'react'

type FormFieldProps = {
  label: string
  error?: string
  hint?: string
} & InputHTMLAttributes<HTMLInputElement>

const FormField = ({ label, error, hint, id, className = '', ...props }: FormFieldProps) => {
  const fieldId = id ?? props.name

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-bold text-primary">
        {label}
      </label>
      <input
        id={fieldId}
        className={`box-border min-w-0 w-full rounded-lg border bg-white px-4 py-3.5 text-sm font-medium text-primary outline-none transition-all placeholder:font-normal placeholder:text-light focus:ring-2 focus:ring-secondary/20 ${
          error
            ? 'border-red focus:border-red'
            : 'border-light-open-gray focus:border-secondary'
        } ${className}`}
        {...props}
      />
      {hint && !error && (
        <p className="break-words text-xs font-medium text-gray-light">{hint}</p>
      )}
      {error && <p className="break-words text-xs font-medium text-red">{error}</p>}
    </div>
  )
}

export default FormField
