import { NextRequest, NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'
import { cloudinary, defaultFolder } from '@/lib/cloudinary'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json().catch(() => ({}))
    const folder = body.folder || defaultFolder
    const timestamp = Math.round(new Date().getTime() / 1000)

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || ''
    const apiKey = process.env.CLOUDINARY_API_KEY || ''
    const apiSecret = process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY || ''

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { success: false, error: 'Cloudinary credentials not properly configured on server' },
        { status: 500 }
      )
    }

    // Parameters to sign
    const paramsToSign: Record<string, any> = {
      timestamp,
      folder,
    }

    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret)

    return NextResponse.json({
      success: true,
      signature,
      timestamp,
      api_key: apiKey,
      cloud_name: cloudName,
      folder,
    })
  } catch (error: any) {
    console.error('Signature generation error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate signature' },
      { status: 500 }
    )
  }
}
