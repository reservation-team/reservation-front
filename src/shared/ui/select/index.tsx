import { forwardRef, SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef(({ name, label, options, ...props }: SelectProps, ref) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label
      )}

      <select
        ref={ref as any}
        name={name}
        id={name}
        {...props}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        {options.map((option) => (
          <option key={name + option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
})
