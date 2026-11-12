'use client'

import React, { useState, useRef } from 'react'
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
} from 'lucide-react'
import { MediaType, MediaSource } from '@/types/admin'

interface MediaUploadPickerProps {
  mediaType: MediaType
  mediaSource: MediaSource
  mediaUrl: string
  mediaPoster?: string
  onMediaTypeChange: (type: MediaType) => void
  onMediaSourceChange: (source: MediaSource) => void
  onMediaUrlChange: (url: string) => void
  onMediaPosterChange?: (poster: string) => void
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
}: MediaUploadPickerProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError(null)
    setUploadSuccess(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('destination', mediaSource === 'local' ? 'local' : 'cloudinary')

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed')
      }

      onMediaUrlChange(data.url)
      if (data.mediaType) {
        onMediaTypeChange(data.mediaType)
      }
      setUploadSuccess(`Successfully uploaded to ${mediaSource.toUpperCase()}!`)
      setTimeout(() => setUploadSuccess(null), 3500)
    } catch (err: any) {
      setUploadError(err.message || 'Error uploading file')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
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
          {/* Cloudinary */}
          <button
            type="button"
            onClick={() => onMediaSourceChange('cloudinary')}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-all ${
              mediaSource === 'cloudinary'
                ? 'bg-red-600/15 border-red-500 text-white font-semibold'
                : 'bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Cloud className="w-4 h-4 text-red-400" />
            <span>Cloudinary</span>
          </button>

          {/* YouTube */}
          <button
            type="button"
            onClick={() => {
              onMediaSourceChange('youtube')
              onMediaTypeChange('video')
            }}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-all ${
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
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-all ${
              mediaSource === 'local'
                ? 'bg-red-600/15 border-red-500 text-white font-semibold'
                : 'bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span>Local File</span>
          </button>

          {/* Direct External URL */}
          <button
            type="button"
            onClick={() => onMediaSourceChange('url')}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-all ${
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

      {/* 3. Action Area depending on Source */}
      {/* Upload button for Cloudinary or Local */}
      {(mediaSource === 'cloudinary' || mediaSource === 'local') && (
        <div className="space-y-2 pt-1">
          <input
            ref={fileInputRef}
            type="file"
            accept={mediaType === 'video' ? 'video/mp4,video/webm,video/quicktime' : 'image/*'}
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 px-4 rounded-xl border border-dashed border-white/20 hover:border-red-500 bg-neutral-900/80 hover:bg-neutral-800/80 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                <span>Uploading {mediaType} to {mediaSource === 'cloudinary' ? 'Cloudinary (folder: primelensemedia)' : 'Local Storage'}...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-red-400" />
                <span>Choose {mediaType.toUpperCase()} File from Local Computer to Upload</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Direct URL input */}
      <div className="space-y-1">
        <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold">
          {mediaSource === 'youtube'
            ? 'YouTube Video Link (e.g. https://www.youtube.com/watch?v=... or youtu.be/...)'
            : 'Media File URL (Cloudinary / Local / CDN Link)'}
        </label>
        <input
          type="text"
          value={mediaUrl}
          onChange={(e) => onMediaUrlChange(e.target.value)}
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
