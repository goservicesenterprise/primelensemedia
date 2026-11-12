import React from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { getCurrentAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Console | PrimeLense Media',
  description: 'Manage testimonials, client enquiries, and dynamic content sections.',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerList = await headers()
  const pathname = headerList.get('x-pathname') || ''

  // Allow login page without redirect loop
  const admin = await getCurrentAdmin()

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col lg:flex-row antialiased selection:bg-red-600 selection:text-white">
      {admin && <AdminSidebar />}
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
