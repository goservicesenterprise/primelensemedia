import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '#filmmaking',
    '#content',
    '#fabrication',
    '#consultation',
    '#podcast',
  ]

  const now = new Date()

  return routes.map((route) => ({
    url: `${siteConfig.url}/${route}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}
