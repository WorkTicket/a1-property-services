import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(phone: string) {
  return phone.replace(/(\+1)(\d{3})(\d{3})(\d{4})/, '$1 ($2) $3-$4')
}
