import React from 'react'
import { getSections } from '@/lib/admin-store'
import HomePageClient from '@/components/home/HomePageClient'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const sections = getSections()

  return <HomePageClient initialSections={sections} />
}
