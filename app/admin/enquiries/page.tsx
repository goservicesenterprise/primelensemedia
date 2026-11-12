import React from 'react'
import { getEnquiries } from '@/lib/admin-store'
import EnquiriesManager from '@/components/admin/EnquiriesManager'
import { getCurrentAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Enquiries & Bookings Pipeline | PrimeLense Admin',
}

export default async function EnquiriesPage() {
  const current = await getCurrentAdmin()
  if (!current) {
    redirect('/admin/login')
  }

  const enquiries = getEnquiries()

  return <EnquiriesManager initialEnquiries={enquiries} />
}
