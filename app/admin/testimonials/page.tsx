import React from 'react'
import { getTestimonials } from '@/lib/admin-store'
import TestimonialsManager from '@/components/admin/TestimonialsManager'
import { getCurrentAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Testimonials Management | PrimeLense Admin',
}

export default async function TestimonialsPage() {
  const current = await getCurrentAdmin()
  if (!current) {
    redirect('/admin/login')
  }

  const testimonials = await getTestimonials()

  return <TestimonialsManager initialTestimonials={testimonials} />
}
