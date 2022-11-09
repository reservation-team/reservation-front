import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  type?: string
}

export const InputText = forwardRef(({ name, label, type = 'text', ...props }: InputProps, ref) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref as any}
        id={name}
        name={name}
        {...props}
        type={type}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  )
})
