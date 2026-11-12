'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

interface UniversalMediaProps {
  mediaType?: 'image' | 'video'
  mediaSource?: 'cloudinary' | 'youtube' | 'local' | 'url'
  src?: string | null
  poster?: string | null
  alt?: string
  className?: string
  containerClassName?: string
  aspectRatio?: 'video' | 'square' | 'auto' | string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
}

// Extract YouTube ID from various YouTube URL formats
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  const videoId = match && match[2].length === 11 ? match[2] : null
  if (videoId) {
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1`
  }
  return null
}

function getVimeoEmbedUrl(url: string): string | null {
  if (!url) return null
  const regExp = /vimeo.*(?:\/|clip_id=)([0-9]+)/i
  const match = url.match(regExp)
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}?autoplay=1&loop=1&muted=1&background=1`
  }
  return null
}

export default function UniversalMedia({
  mediaType = 'image',
  mediaSource = 'cloudinary',
  src,
  poster,
  alt = 'PrimeLense Media Asset',
  className = 'w-full h-full object-cover',
  containerClassName = 'relative w-full h-full overflow-hidden',
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
}: UniversalMediaProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  if (!src) {
    return null
  }

  const isVideo =
    mediaType === 'video' ||
    mediaSource === 'youtube' ||
    src.includes('youtube.com') ||
    src.includes('youtu.be') ||
    src.includes('vimeo.com') ||
    src.match(/\.(mp4|webm|mov|mkv)($|\?)/i)

  // YouTube / Vimeo Embed
  const ytEmbed = getYouTubeEmbedUrl(src)
  const vimeoEmbed = getVimeoEmbedUrl(src)

  if (isVideo && (ytEmbed || vimeoEmbed)) {
    const embedUrl = ytEmbed || vimeoEmbed!
    return (
      <div className={containerClassName}>
        <iframe
          src={embedUrl}
          title={alt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0 pointer-events-auto"
        />
      </div>
    )
  }

  // Direct HTML5 Video (Cloudinary, Local, or external MP4/WebM)
  if (isVideo) {
    return (
      <div className={containerClassName}>
        <video
          src={src}
          poster={poster || undefined}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls={controls}
          playsInline
          className={className}
        />
      </div>
    )
  }

  // Next.js Image
  return (
    <div className={containerClassName}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={className}
      />
    </div>
  )
}
