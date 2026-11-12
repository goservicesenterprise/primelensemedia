import { v2 as cloudinary } from 'cloudinary'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || ''
const apiKey = process.env.CLOUDINARY_API_KEY || ''
// Support both CLOUDINARY and CLOUDINARY_API_SECRET
const apiSecret = process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY || ''
export const defaultFolder = process.env.CLOUDINARY_FOLDER || 'primelensemedia'

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
})

export { cloudinary }

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  filename: string,
  resourceType: 'auto' | 'image' | 'video' = 'auto',
  folder: string = defaultFolder
): Promise<{ url: string; secure_url: string; public_id: string; format: string; resource_type: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: filename.replace(/\.[^/.]+$/, ''),
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          return reject(error)
        }
        if (!result) {
          return reject(new Error('Cloudinary upload returned empty response'))
        }
        resolve({
          url: result.url,
          secure_url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          resource_type: result.resource_type,
        })
      }
    )

    uploadStream.end(fileBuffer)
  })
}
