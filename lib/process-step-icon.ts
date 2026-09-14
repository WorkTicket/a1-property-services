import {
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Droplets,
  Hammer,
  Layers,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  Settings,
  Shovel,
  Snowflake,
  Sparkles,
  Sprout,
  Trees,
  Truck,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

export function getProcessStepIcon(title: string): LucideIcon {
  const t = title.toLowerCase()

  if (t.includes('walkthrough') || t.includes('final check') || t.includes('handoff')) return CheckCircle2
  if (t.includes('consult')) return MessageSquare
  if (t.includes('call') || t.includes('phone')) return Phone
  if (t.includes('schedule')) return Calendar
  if (t.includes('review')) return ClipboardCheck
  if (t.includes('diagnos') || t.includes('assess') || t.includes('survey') || t.includes('testing') || t.includes('locate')) {
    return Search
  }
  if (
    t.includes('design') ||
    t.includes('plan') ||
    t.includes('layout') ||
    t.includes('concept') ||
    t.includes('program') ||
    t.includes('proposal') ||
    t.includes('contract') ||
    t.includes('selection') ||
    t.includes('ordering') ||
    t.includes('assignment')
  ) {
    return ClipboardList
  }
  if (t.includes('drain') || t.includes('pump') || t.includes('filtration') || t.includes('watering') || t.includes('ice')) {
    return Droplets
  }
  if (t.includes('snow') || t.includes('storm')) return Snowflake
  if (t.includes('tree') || t.includes('stump') || t.includes('species')) return Trees
  if (
    t.includes('plant') ||
    t.includes('sod') ||
    t.includes('seed') ||
    t.includes('mulch') ||
    t.includes('weed') ||
    t.includes('landscap') ||
    t.includes('shrub') ||
    t.includes('care')
  ) {
    return Sprout
  }
  if (
    t.includes('excavat') ||
    t.includes('grading') ||
    t.includes('grade') ||
    t.includes('soil') ||
    t.includes('base prep') ||
    t.includes('prep') ||
    t.includes('hole')
  ) {
    return Shovel
  }
  if (
    t.includes('install') ||
    t.includes('paver') ||
    t.includes('block') ||
    t.includes('stone') ||
    t.includes('hardscape') ||
    t.includes('application') ||
    t.includes('rockwork') ||
    t.includes('features')
  ) {
    return Layers
  }
  if (t.includes('equipment') || t.includes('setup') || t.includes('startup')) return Settings
  if (t.includes('haul') || t.includes('placement')) return Truck
  if (t.includes('compact') || t.includes('execution') || t.includes('removal') || t.includes('clearing') || t.includes('work')) {
    return Hammer
  }
  if (t.includes('cleanup') || t.includes('finish') || t.includes('detail')) return Sparkles
  if (t.includes('visit') || t.includes('maintenance') || t.includes('service')) return Wrench
  if (t.includes('property') || t.includes('site')) return MapPin
  return CheckCircle2
}
