import React from 'react'
import LoginForm from '@/components/admin/LoginForm'
import { getCurrentAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Gateway Authentication | PrimeLense Media',
}

export default async function LoginPage() {
  const current = await getCurrentAdmin()
  if (current) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 antialiased selection:bg-red-600 selection:text-white">
      <LoginForm />
    </div>
  )
}
