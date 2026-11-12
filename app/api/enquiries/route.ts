import { NextRequest, NextResponse } from 'next/server'
import { saveEnquiry } from '@/lib/admin-store'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, email, phone, organization, service, shootType, budget, timeline, location, projectScope, referenceLinks, stages, type } = body

    if (!fullName || !email) {
      return NextResponse.json({ success: false, error: 'Full name and email are required' }, { status: 400 })
    }

    const item = saveEnquiry({
      type: type || 'consultation',
      fullName,
      email,
      phone,
      organization,
      service: service || 'Media Production',
      shootType,
      budget,
      timeline,
      location,
      projectScope,
      referenceLinks,
      stages,
    })

    return NextResponse.json({ success: true, item })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Error saving enquiry' }, { status: 500 })
  }
}
