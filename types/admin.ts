export type MediaType = 'image' | 'video'
export type MediaSource = 'cloudinary' | 'youtube' | 'local' | 'url'

export interface ShowcaseProject {
  id?: string
  title: string
  client: string
  category: string
  year: string
  image: string
  mediaType?: MediaType
  mediaSource?: MediaSource
  mediaUrl?: string
  mediaPoster?: string
  description: string
  tags: string[]
}

export interface CapabilityServiceItem {
  id?: string
  title: string
  tagline?: string
  heroBadge?: string
  icon?: string
  description?: string
  specialties?: string[]
  client?: string
  featuredShowcaseTitle?: string
  mediaType?: MediaType
  mediaSource?: MediaSource
  mediaUrl?: string
  mediaPoster?: string
}

export interface SectionContent {
  id: string
  title: string
  badge?: string
  tagline?: string
  highlightText?: string
  description?: string
  richTextHtml?: string
  mediaType?: MediaType
  mediaSource?: MediaSource
  mediaUrl?: string
  mediaPoster?: string
  ctaPrimaryLabel?: string
  ctaPrimaryLink?: string
  ctaSecondaryLabel?: string
  ctaSecondaryLink?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  metadata?: Record<string, any>
  updatedAt: string
}

export interface EnquiryItem {
  id: string
  type: 'consultation' | 'contact'
  fullName: string
  email: string
  phone?: string
  organization?: string
  service: string
  shootType?: string
  budget?: string
  timeline?: string
  location?: string
  projectScope?: string
  referenceLinks?: string
  stages?: string[]
  status: 'new' | 'reviewed' | 'in-progress' | 'completed' | 'archived'
  createdAt: string
  notes?: string
}

export interface TestimonialItem {
  id: string
  author: string
  role: string
  company: string
  avatarUrl?: string
  content: string
  rating: number
  serviceTag: string
  isFeatured: boolean
  createdAt: string
}

export interface DashboardStats {
  totalEnquiries: number
  newEnquiries: number
  totalTestimonials: number
  featuredTestimonials: number
  totalSections: number
}
