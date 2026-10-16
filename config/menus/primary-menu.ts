import type { MenuItem } from '@/types'
import { ROUTES } from '@/config/routes'

export const primaryMenu: MenuItem[] = [
  {
    id: 'filmmaking',
    label: 'Filmmaking',
    href: ROUTES.SERVICES.FILMMAKING,
    position: 1,
  },
  {
    id: 'content',
    label: 'Content Creation',
    href: ROUTES.SERVICES.CONTENT,
    position: 2,
  },
  {
    id: 'consultation',
    label: 'Consultation',
    href: ROUTES.SERVICES.CONSULTATION,
    position: 3,
  },
  {
    id: 'fabrication',
    label: 'Set Fabrication',
    href: ROUTES.SERVICES.FABRICATION,
    position: 4,
  },
  {
    id: 'podcast',
    label: 'Podcast Studios',
    href: ROUTES.SERVICES.PODCAST,
    position: 5,
  },
]
