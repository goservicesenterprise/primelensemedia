export type DisciplineId =
  | 'media-production'
  | 'television-studio'
  | 'podcast-production'
  | 'content-creation'
  | 'commercial-advertising'
  | 'studio-design'
  | 'media-consultation'
  | 'filmmaking'
  | 'set-fabrication'
  | 'podcast-brand-videos'

export interface DisciplineMetric {
  label: string
  value: string
  sublabel: string
}

export interface DisciplineShowcase {
  title: string
  client: string
  year: string
  aspectRatio: string
  imageUrl: string
  description: string
  tags: string[]
}

export interface DisciplineConfig {
  id: DisciplineId
  title: string
  tagline: string
  heroBadge: string
  ambientColor: string
  ambientGlow: string
  accentHex: string
  description: string
  leadParagraph: string
  specialties: string[]
  specs: { label: string; value: string }[]
  metrics: DisciplineMetric[]
  showcases: DisciplineShowcase[]
  customInquiryFields: {
    questionLabel: string
    options: string[]
    placeholder: string
  }
}

export interface MenuItem {
  id: string
  label: string
  href: string
  icon?: string
  position: number
}
