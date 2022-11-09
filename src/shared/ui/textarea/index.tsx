import { forwardRef } from 'react'

interface InputProps {
  name: string
  label?: string
}

export const TextArea = forwardRef(({ name, label, ...props }: InputProps, ref) => {
  return (
    <>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-1">
        <textarea
          ref={ref as any}
          id={name}
          name={name}
          {...props}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </>
  )
})
