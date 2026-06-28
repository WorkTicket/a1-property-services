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
}

export default function ServiceIcon({ name, className, size = 28 }: ServiceIconProps) {
  const Icon = iconMap[name] ?? Trees
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-lg bg-brand-green-100 p-2.5 text-brand-green-800',
        className,
      )}
    >
      <Icon size={size} strokeWidth={1.75} aria-hidden />
    </span>
  )
}
