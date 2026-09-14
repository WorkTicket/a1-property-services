import {
  Building,
  Droplets,
  Flower2,
  Home,
  LandPlot,
  Layers,
  LayoutGrid,
  Mountain,
  Pickaxe,
  Ruler,
  Shovel,
  Snowflake,
  Sprout,
  Tractor,
  TreeDeciduous,
  Trees,
  TriangleRight,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ServiceIconName } from '@/lib/services'

const iconMap: Record<ServiceIconName, LucideIcon> = {
  trees: Trees,
  home: Home,
  flower2: Flower2,
  'tree-deciduous': TreeDeciduous,
  wrench: Wrench,
  droplets: Droplets,
  sprout: Sprout,
  snowflake: Snowflake,
  layers: Layers,
  'layout-grid': LayoutGrid,
  'land-plot': LandPlot,
  'triangle-right': TriangleRight,
  shovel: Shovel,
  zap: Zap,
  mountain: Mountain,
  building: Building,
  ruler: Ruler,
  tractor: Tractor,
  pickaxe: Pickaxe,
}

type ServiceIconProps = {
  name: ServiceIconName
  className?: string
  size?: number
  variant?: 'default' | 'compact'
}

const variantStyles = {
  default: 'self-start rounded-2xl bg-brand-green-100 p-3 text-brand-green-800 ring-1 ring-brand-gold/10',
  compact: 'h-8 w-8 rounded-lg bg-transparent p-0 text-brand-green-800',
} as const

export default function ServiceIcon({
  name,
  className,
  size,
  variant = 'default',
}: ServiceIconProps) {
  const Icon = iconMap[name] ?? Trees
  const iconSize = size ?? (variant === 'compact' ? 15 : 28)
  const strokeWidth = variant === 'compact' ? 2 : 1.75

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center transition-colors',
        variantStyles[variant],
        className,
      )}
    >
      <Icon size={iconSize} strokeWidth={strokeWidth} aria-hidden />
    </span>
  )
}
