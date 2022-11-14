import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children?: React.ReactNode
  full?: boolean
}

export const Button = ({ variant = 'primary', children, full, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 
      ${
        variant === 'primary'
          ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
          : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
      }
      ${full ? 'w-full' : ''}
      `}
    >
      {children}
    </button>
  )
}
