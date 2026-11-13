import React, { Suspense } from 'react'
import { getSections } from '@/lib/admin-store'
import CMSSectionManager from '@/components/admin/CMSSectionManager'
import { getCurrentAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Section CMS & Dynamic Content | PrimeLense Admin',
}

export default async function CMSPage() {
  const current = await getCurrentAdmin()
  if (!current) {
    redirect('/admin/login')
  }

  const sections = await getSections()

  return (
    <Suspense fallback={<div className="p-12 text-center text-neutral-400">Loading CMS Console...</div>}>
      <CMSSectionManager initialSections={sections} />
    </Suspense>
  )
}
