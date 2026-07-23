import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(phone: string) {
  return phone.replace(/(\+1)(\d{3})(\d{3})(\d{4})/, '$1 ($2) $3-$4')
}

export const ANIMATION_DURATION = 650
export const ANIMATION_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'
export const STAGGER_BASE_DELAY = 0.08
export const STAGGER_STEP = 0.1
