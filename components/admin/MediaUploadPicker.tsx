'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  Cloud,
  PlaySquare,
  HardDrive,
  Link as LinkIcon,
  Upload,
  CheckCircle2,
  AlertCircle,
  Video,
  Image as ImageIcon,
  Loader2,
  XCircle,
  Eye,
} from 'lucide-react'
import { MediaType, MediaSource } from '@/types/admin'
import {
  getCloudinarySignature,
  uploadFileDirectToCloudinary,
} from '@/lib/cloudinary-client'
import UniversalMedia from '@/components/shared/ui/UniversalMedia'

interface MediaUploadPickerProps {
  mediaType: MediaType
  mediaSource: MediaSource
  mediaUrl: string
  mediaPoster?: string
  onMediaTypeChange: (type: MediaType) => void
  onMediaSourceChange: (source: MediaSource) => void
  onMediaUrlChange: (url: string) => void
  onMediaPosterChange?: (poster: string) => void
  showInlinePreview?: boolean
}

export default function MediaUploadPicker({
  mediaType = 'image',
  mediaSource = 'cloudinary',
  mediaUrl = '',
  mediaPoster = '',
  onMediaTypeChange,
  onMediaSourceChange,
  onMediaUrlChange,
  onMediaPosterChange,
  showInlinePreview = true,
}: MediaUploadPickerProps) {
  // Local input state for immediate responsiveness and sync
  const [localUrl, setLocalUrl] = useState(mediaUrl || '')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Keep local input in sync whenever parent mediaUrl changes
  useEffect(() => {
    setLocalUrl(mediaUrl || '')
  }, [mediaUrl])

  const handleCancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      setIsUploading(false)
      setUploadProgress(0)
      setUploadError('Upload cancelled')
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)
    setUploadError(null)
    setUploadSuccess(null)

    abortControllerRef.current = new AbortController()

    const isVideoFile =
      file.type.startsWith('video/') ||
      file.name.match(/\.(mp4|webm|mov|mkv)$/i) !== null
    const resourceType = isVideoFile ? 'video' : 'image'

    try {
      if (mediaSource === 'cloudinary') {
        // DIRECT CLOUDINARY UPLOAD via SDK signature
        const signature = await getCloudinarySignature()
        const result = await uploadFileDirectToCloudinary(file, signature, resourceType, {
          abortSignal: abortControllerRef.current.signal,
          onProgress: (_loaded, _total, percent) => {
            setUploadProgress(percent)
          },
        })

        const uploadedUrl = result.secure_url || (result as any).url
        if (!uploadedUrl) {
          throw new Error('Cloudinary response did not return a secure URL')
        }

        // Immediately update local input display, parent state, and media presentation type
        setLocalUrl(uploadedUrl)
        onMediaUrlChange(uploadedUrl)
        onMediaTypeChange(isVideoFile ? 'video' : 'image')
        setUploadSuccess(
          `Uploaded to Cloudinary (folder: ${signature.folder}) successfully!`
        )
      } else {
        // LOCAL SERVER STORAGE FALLBACK
        const formData = new FormData()
        formData.append('file', file)
        formData.append('destination', 'local')

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
          signal: abortControllerRef.current.signal,
        })
        const data = await res.json()

        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Local upload failed')
        }

        const uploadedUrl = data.url
        setLocalUrl(uploadedUrl)
        onMediaUrlChange(uploadedUrl)
        if (data.mediaType) {
          onMediaTypeChange(data.mediaType)
        }
        setUploadSuccess(`Saved file locally to /public/uploads!`)
      }

      setTimeout(() => setUploadSuccess(null), 4000)
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setUploadError('Upload cancelled')
      } else {
        setUploadError(err.message || 'Error uploading file')
      }
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      abortControllerRef.current = null
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleUrlInputChange = (val: string) => {
    setLocalUrl(val)
    onMediaUrlChange(val)
  }

  return (
    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-4">
      {/* 1. Media Type Selector: Image vs Video */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <span className="text-xs font-mono uppercase font-semibold text-neutral-300">
          Media Presentation Type
        </span>
        <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => onMediaTypeChange('image')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              mediaType === 'image'
                ? 'bg-red-600 text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Image</span>
          </button>
          <button
            type="button"
            onClick={() => onMediaTypeChange('video')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              mediaType === 'video'
                ? 'bg-red-600 text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video</span>
          </button>
        </div>
      </div>

      {/* 2. Destination / Source Picker: Cloudinary vs YouTube vs Local vs Direct URL */}
      <div className="space-y-2">
        <label className="block text-neutral-400 uppercase font-mono text-[11px] font-semibold">
          Upload Destination & Source
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Cloudinary Direct SDK */}
          <button
            type="button"
            onClick={() => onMediaSourceChange('cloudinary')}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-all cursor-pointer ${
              mediaSource === 'cloudinary'
                ? 'bg-red-600/15 border-red-500 text-white font-semibold'
                : 'bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Cloud className="w-4 h-4 text-red-400" />
            <span>Cloudinary Direct</span>
          </button>

          {/* YouTube */}
          <button
            type="button"
            onClick={() => {
              onMediaSourceChange('youtube')
              onMediaTypeChange('video')
            }}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-all cursor-pointer ${
              mediaSource === 'youtube'
                ? 'bg-red-600/15 border-red-500 text-white font-semibold'
                : 'bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <PlaySquare className="w-4 h-4 text-red-500" />
            <span>YouTube</span>
          </button>

          {/* Local Storage */}
          <button
            type="button"
            onClick={() => onMediaSourceChange('local')}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-all cursor-pointer ${
              mediaSource === 'local'
                ? 'bg-red-600/15 border-red-500 text-white font-semibold'
                : 'bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span>Local Storage</span>
          </button>

          {/* Direct External URL */}
          <button
            type="button"
            onClick={() => onMediaSourceChange('url')}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-all cursor-pointer ${
              mediaSource === 'url'
                ? 'bg-red-600/15 border-red-500 text-white font-semibold'
                : 'bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <LinkIcon className="w-4 h-4 text-blue-400" />
            <span>Direct URL</span>
          </button>
        </div>
      </div>

      {/* 3. Action Area for Cloudinary or Local Upload */}
      {(mediaSource === 'cloudinary' || mediaSource === 'local') && (
        <div className="space-y-2 pt-1">
          <input
            ref={fileInputRef}
            type="file"
            accept={mediaType === 'video' ? 'video/mp4,video/webm,video/quicktime' : 'image/*'}
            onChange={handleFileUpload}
            className="hidden"
          />

          {!isUploading ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-4 rounded-xl border border-dashed border-white/20 hover:border-red-500 bg-neutral-900/80 hover:bg-neutral-800/80 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4 text-red-400" />
              <span>
                Select {mediaType.toUpperCase()} file to upload via{' '}
                {mediaSource === 'cloudinary' ? 'Cloudinary SDK (Direct)' : 'Local Disk'}
              </span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-neutral-900 border border-white/15 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-neutral-300 font-mono">
                  <Loader2 className="w-3.5 h-3.5 text-red-500 animate-spin" />
                  Uploading directly to {mediaSource === 'cloudinary' ? 'Cloudinary (primelensemedia)' : 'Local server'}...
                </span>
                <span className="font-mono text-red-400 font-bold">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-red-600 h-full transition-all duration-200 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCancelUpload}
                  className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <XCircle className="w-3 h-3" /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Direct URL input: Immediately populated with uploaded URL */}
      <div className="space-y-1">
        <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold">
          {mediaSource === 'youtube'
            ? 'YouTube Video Link (e.g. https://www.youtube.com/watch?v=... or youtu.be/...)'
            : 'Media File URL (Cloudinary / Local / CDN Link)'}
        </label>
        <input
          type="text"
          value={localUrl}
          onChange={(e) => handleUrlInputChange(e.target.value)}
          placeholder={
            mediaSource === 'youtube'
              ? 'https://www.youtube.com/watch?v=...'
              : 'https://res.cloudinary.com/... or /uploads/video.mp4'
          }
          className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-red-500 transition-colors"
        />
      </div>

      {/* Video Poster input if Video is selected */}
      {mediaType === 'video' && onMediaPosterChange && (
        <div className="space-y-1 pt-1 border-t border-white/5">
          <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold">
            Video Poster Frame / Fallback Thumbnail Image URL (Optional)
          </label>
          <input
            type="text"
            value={mediaPoster || ''}
            onChange={(e) => onMediaPosterChange(e.target.value)}
            placeholder="https://... or /poster.jpg"
            className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-red-500"
          />
        </div>
      )}

      {/* INLINE LIVE PREVIEW OF MEDIA (Shows image or video immediately upon upload/url entry) */}
      {showInlinePreview && localUrl && (
        <div className="pt-2 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-300 font-semibold flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-red-400" />
              Live Media Preview ({mediaType.toUpperCase()} • {mediaSource.toUpperCase()})
            </span>
            <span className="text-[10px] font-mono text-neutral-500 truncate max-w-[200px]">
              {localUrl}
            </span>
          </div>

          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/90 border border-white/15 shadow-inner">
            <UniversalMedia
              src={localUrl}
              mediaType={mediaType}
              mediaSource={mediaSource}
              poster={mediaPoster}
              alt="Media Preview"
              containerClassName="w-full h-full"
              className="object-contain w-full h-full"
              controls={mediaType === 'video'}
              autoPlay={false}
            />
          </div>
        </div>
      )}

      {/* Feedback Messages */}
      {uploadSuccess && (
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-mono">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {uploadError && (
        <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}
    </div>
  )
}
