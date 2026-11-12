'use server'

import { revalidatePath } from 'next/cache'
import {
  getEnquiries,
  saveEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
  getTestimonials,
  saveTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getSections,
  saveSection,
} from '@/lib/admin-store'
import { EnquiryItem, TestimonialItem, SectionContent, DashboardStats } from '@/types/admin'

// --- DASHBOARD STATS ---
export async function getDashboardStatsAction(): Promise<DashboardStats> {
  const enquiries = getEnquiries()
  const testimonials = getTestimonials()
  const sections = getSections()

  return {
    totalEnquiries: enquiries.length,
    newEnquiries: enquiries.filter((e) => e.status === 'new').length,
    totalTestimonials: testimonials.length,
    featuredTestimonials: testimonials.filter((t) => t.isFeatured).length,
    totalSections: Object.keys(sections).length,
  }
}

// --- ENQUIRIES ACTIONS ---
export async function getEnquiriesAction() {
  return getEnquiries()
}

export async function createEnquiryAction(
  data: Omit<EnquiryItem, 'id' | 'createdAt' | 'status'> & { status?: EnquiryItem['status'] }
) {
  const item = saveEnquiry(data)
  revalidatePath('/admin')
  revalidatePath('/admin/enquiries')
  return { success: true, item }
}

export async function updateEnquiryStatusAction(
  id: string,
  status: EnquiryItem['status'],
  notes?: string
) {
  const updated = updateEnquiryStatus(id, status, notes)
  revalidatePath('/admin')
  revalidatePath('/admin/enquiries')
  return { success: !!updated, item: updated }
}

export async function deleteEnquiryAction(id: string) {
  const success = deleteEnquiry(id)
  revalidatePath('/admin')
  revalidatePath('/admin/enquiries')
  return { success }
}

// --- TESTIMONIALS ACTIONS ---
export async function getTestimonialsAction() {
  return getTestimonials()
}

export async function createTestimonialAction(
  data: Omit<TestimonialItem, 'id' | 'createdAt'>
) {
  const item = saveTestimonial(data)
  revalidatePath('/admin')
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
  return { success: true, item }
}

export async function updateTestimonialAction(
  id: string,
  data: Partial<Omit<TestimonialItem, 'id' | 'createdAt'>>
) {
  const updated = updateTestimonial(id, data)
  revalidatePath('/admin')
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
  return { success: !!updated, item: updated }
}

export async function deleteTestimonialAction(id: string) {
  const success = deleteTestimonial(id)
  revalidatePath('/admin')
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
  return { success }
}

// --- CMS SECTIONS ACTIONS ---
export async function getSectionsAction() {
  return getSections()
}

export async function saveSectionAction(section: SectionContent) {
  const saved = saveSection(section)
  revalidatePath('/admin')
  revalidatePath('/admin/cms')
  revalidatePath('/')
  return { success: true, item: saved }
}
