/**
 * Direct Cloudinary Upload utility adapted from fansidol architecture.
 * Uploads directly from browser/client to Cloudinary via signed requests
 * with progress tracking, caching, and abort control.
 */

export type CloudinarySignature = {
  signature: string
  timestamp: number
  api_key: string
  cloud_name: string
  folder: string
  eager?: string
  eager_async?: boolean
  notification_url?: string
}

export type CloudinaryUploadResult = {
  secure_url: string
  public_id: string
  bytes: number
  format: string
  duration?: number
  width?: number
  height?: number
  resource_type?: string
}

export type CloudinaryUploadOptions = {
  onProgress?: (loaded: number, total: number, percent: number) => void
  abortSignal?: AbortSignal
  skipCache?: boolean
  folder?: string
}

export async function getCloudinarySignature(folder?: string): Promise<CloudinarySignature> {
  const res = await fetch('/api/admin/cloudinary/signature', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder }),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Failed to acquire Cloudinary signature')
  }
  return {
    signature: json.signature,
    timestamp: json.timestamp,
    api_key: json.api_key,
    cloud_name: json.cloud_name,
    folder: json.folder,
  }
}

export function findCachedUploadForFile(file: File): CloudinaryUploadResult | null {
  if (typeof window === 'undefined') return null
  try {
    const key = `pl_cld_${file.name}_${file.size}`
    const item = localStorage.getItem(key)
    if (item) {
      return JSON.parse(item) as CloudinaryUploadResult
    }
  } catch (e) {
    console.warn('Failed reading upload cache:', e)
  }
  return null
}

export function setCachedUpload(file: File, result: CloudinaryUploadResult): void {
  if (typeof window === 'undefined') return
  try {
    const key = `pl_cld_${file.name}_${file.size}`
    localStorage.setItem(key, JSON.stringify(result))
  } catch (e) {
    console.warn('Failed writing upload cache:', e)
  }
}

export function clearCachedUpload(file?: File | null): void {
  if (typeof window === 'undefined' || !file) return
  try {
    localStorage.removeItem(`pl_cld_${file.name}_${file.size}`)
  } catch {}
}

/**
 * Upload single file directly to Cloudinary using XMLHttpRequest for real progress
 */
export function uploadFileDirectToCloudinary(
  file: File,
  signature: CloudinarySignature,
  resourceType: 'video' | 'image' | 'auto' = 'auto',
  options?: CloudinaryUploadOptions
): Promise<CloudinaryUploadResult> {
  if (!options?.skipCache) {
    const cached = findCachedUploadForFile(file)
    if (cached) {
      options?.onProgress?.(file.size, file.size, 100)
      return Promise.resolve(cached)
    }
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const url = `https://api.cloudinary.com/v1_1/${signature.cloud_name}/${resourceType}/upload`

    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', signature.api_key)
    formData.append('timestamp', String(signature.timestamp))
    formData.append('signature', signature.signature)
    formData.append('folder', signature.folder)

    if (options?.abortSignal) {
      options.abortSignal.addEventListener('abort', () => {
        xhr.abort()
        reject(new DOMException('Upload aborted by user', 'AbortError'))
      })
    }

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && options?.onProgress) {
        const percent = Math.min(100, Math.round((event.loaded / event.total) * 100))
        options.onProgress(event.loaded, event.total, percent)
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText)
          const uploadResult: CloudinaryUploadResult = {
            secure_url: res.secure_url,
            public_id: res.public_id,
            bytes: res.bytes,
            format: res.format,
            duration: res.duration,
            width: res.width,
            height: res.height,
            resource_type: res.resource_type,
          }
          setCachedUpload(file, uploadResult)
          resolve(uploadResult)
        } catch (err) {
          reject(new Error('Failed to parse Cloudinary response'))
        }
      } else {
        try {
          const errorRes = JSON.parse(xhr.responseText)
          reject(
            new Error(
              errorRes.error?.message || `Cloudinary upload failed with status ${xhr.status}`
            )
          )
        } catch {
          reject(new Error(`Cloudinary upload failed with status ${xhr.status}`))
        }
      }
    }

    xhr.onerror = () => {
      reject(new Error('Network error connecting to Cloudinary upload endpoint'))
    }

    xhr.open('POST', url, true)
    xhr.send(formData)
  })
}
