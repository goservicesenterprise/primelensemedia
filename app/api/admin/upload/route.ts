import { NextRequest, NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'
import { uploadToCloudinary, defaultFolder } from '@/lib/cloudinary'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const destination = (formData.get('destination') as string) || 'cloudinary' // 'cloudinary' | 'local'
    const folder = (formData.get('folder') as string) || defaultFolder

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const originalName = file.name || `upload-${Date.now()}`
    const mimeType = file.type || ''
    const isVideo = mimeType.startsWith('video/') || originalName.match(/\.(mp4|webm|mov|mkv)$/i)
    const resourceType = isVideo ? 'video' : 'image'

    if (destination === 'cloudinary') {
      try {
        const result = await uploadToCloudinary(buffer, originalName, resourceType, folder)
        return NextResponse.json({
          success: true,
          url: result.secure_url || result.url,
          mediaType: isVideo ? 'video' : 'image',
          mediaSource: 'cloudinary',
          publicId: result.public_id,
        })
      } catch (err: any) {
        console.error('Cloudinary error:', err)
        return NextResponse.json(
          {
            success: false,
            error: `Cloudinary upload failed: ${err.message || 'Check credentials'}`,
          },
          { status: 500 }
        )
      }
    }

    // Local file storage
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const safeName = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const filePath = path.join(uploadDir, safeName)
    fs.writeFileSync(filePath, buffer)

    return NextResponse.json({
      success: true,
      url: `/uploads/${safeName}`,
      mediaType: isVideo ? 'video' : 'image',
      mediaSource: 'local',
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Upload failed' }, { status: 500 })
  }
}
