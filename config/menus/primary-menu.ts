import type { MenuItem } from '@/types'
import { ROUTES } from '@/config/routes'

export const primaryMenu: MenuItem[] = [
  {
    id: 'about',
    label: 'About',
    href: ROUTES.ABOUT,
    position: 1,
  },
  {
    id: 'services',
    label: 'Services',
    href: ROUTES.SERVICES.ROOT,
    position: 2,
  },
  {
    id: 'work',
    label: 'Our Work',
    href: ROUTES.OUR_WORK,
    position: 3,
  },
  {
    id: 'studio-design',
    label: 'Studio Design',
    href: ROUTES.STUDIO_DESIGN,
    position: 4,
  },
  {
    id: 'process',
    label: 'Process',
    href: ROUTES.PROCESS,
    position: 5,
  },
  {
    id: 'contact',
    label: 'Contact',
    href: ROUTES.CONTACT,
    position: 6,
  },
]
