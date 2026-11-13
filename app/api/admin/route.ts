import { NextRequest, NextResponse } from 'next/server'
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const resource = searchParams.get('resource') || 'stats'

  if (resource === 'enquiries') {
    return NextResponse.json({ success: true, data: await getEnquiries() })
  }

  if (resource === 'testimonials') {
    return NextResponse.json({ success: true, data: await getTestimonials() })
  }

  if (resource === 'sections') {
    return NextResponse.json({ success: true, data: await getSections() })
  }

  // Default: stats
  const [enquiries, testimonials, sections] = await Promise.all([
    getEnquiries(),
    getTestimonials(),
    getSections(),
  ])

  return NextResponse.json({
    success: true,
    data: {
      stats: {
        totalEnquiries: enquiries.length,
        newEnquiries: enquiries.filter((e) => e.status === 'new').length,
        totalTestimonials: testimonials.length,
        featuredTestimonials: testimonials.filter((t) => t.isFeatured).length,
        totalSections: Object.keys(sections).length,
      },
      recentEnquiries: enquiries.slice(0, 5),
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { resource, action, payload } = body

    if (resource === 'enquiries') {
      if (action === 'create') {
        const item = await saveEnquiry(payload)
        return NextResponse.json({ success: true, item })
      }
      if (action === 'updateStatus') {
        const item = await updateEnquiryStatus(payload.id, payload.status, payload.notes)
        return NextResponse.json({ success: !!item, item })
      }
      if (action === 'delete') {
        const success = await deleteEnquiry(payload.id)
        return NextResponse.json({ success })
      }
    }

    if (resource === 'testimonials') {
      if (action === 'create') {
        const item = await saveTestimonial(payload)
        return NextResponse.json({ success: true, item })
      }
      if (action === 'update') {
        const item = await updateTestimonial(payload.id, payload)
        return NextResponse.json({ success: !!item, item })
      }
      if (action === 'delete') {
        const success = await deleteTestimonial(payload.id)
        return NextResponse.json({ success })
      }
    }

    if (resource === 'sections') {
      if (action === 'save') {
        const item = await saveSection(payload)
        return NextResponse.json({ success: true, item })
      }
    }

    return NextResponse.json({ success: false, error: 'Invalid action or resource' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 })
  }
}
