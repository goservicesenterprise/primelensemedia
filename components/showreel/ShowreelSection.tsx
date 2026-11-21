'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Sparkles, Volume2 } from 'lucide-react'
import Image from 'next/image'
import { useSection } from '@/components/shared/context/CMSContext'
import UniversalMedia from '@/components/shared/ui/UniversalMedia'

export default function ShowreelSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const cms = useSection('showreel')

  const badgeText = cms?.badge || 'Cinematic Experience'
  const titleText = cms?.title || 'Experience PrimeLense Media'
  const descriptionText =
    cms?.description ||
    'A montage of moments, productions, studio transformations, and creative stories that define our craft.'
  const mediaUrl = cms?.mediaUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  const posterUrl = cms?.mediaPoster || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80'
  const mediaType = cms?.mediaType || 'video'
  const mediaSource = cms?.mediaSource || 'youtube'

  return (
    <section id="showreel" className="relative py-28 px-4 sm:px-6 md:px-12 bg-neutral-950 border-t border-white/10 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-[11px] font-mono uppercase tracking-widest text-rose-400 font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>{badgeText}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black sm:font-bold tracking-tight text-white max-w-3xl mb-4 leading-tight">
            {titleText}
          </h2>
          <p className="text-lg sm:text-lg md:text-xl text-neutral-200 sm:text-neutral-400 font-medium sm:font-normal max-w-2xl leading-relaxed">
            {descriptionText}
          </p>
        </div>

        {/* Video Player Display Frame */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 aspect-video bg-black shadow-2xl max-w-5xl mx-auto group">
          {isPlaying ? (
            <div className="w-full h-full flex items-center justify-center bg-black">
              <UniversalMedia
                mediaType={mediaType}
                mediaSource={mediaSource}
                src={mediaUrl}
                poster={posterUrl}
                alt="PrimeLense Media Showreel"
                autoPlay={true}
                controls={true}
              />
            </div>
          ) : (
            <div
              onClick={() => setIsPlaying(true)}
              className="relative w-full h-full cursor-pointer flex items-center justify-center"
            >
              <Image
                src={posterUrl}
                alt="PrimeLense Media Showreel Thumbnail"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30" />

              {/* Play Button Orb */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.4)] group-hover:scale-110 active:scale-95 transition-all">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                </div>
                <span className="text-sm sm:text-sm font-mono uppercase tracking-widest text-white font-bold">
                  ▶ Watch Official Showreel
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
