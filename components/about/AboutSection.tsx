'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { Target, Award, Sparkles, Users } from 'lucide-react'
import { useSection } from '@/components/shared/context/CMSContext'
import UniversalMedia from '@/components/shared/ui/UniversalMedia'

export default function AboutSection() {
  const aboutCms = useSection('about')
  const missionCms = useSection('mission')
  const visionCms = useSection('vision')
  const whoWeServeCms = useSection('who-we-serve')

  // About main texts
  const badgeText = aboutCms?.badge || 'Company Profile'
  const titleText = aboutCms?.title || 'We Create. We Produce. We Build.'
  const descriptionText =
    aboutCms?.description ||
    ''

  // Media
  const mediaType = aboutCms?.mediaType || 'image'
  const mediaSource = aboutCms?.mediaSource || 'cloudinary'
  const mediaUrl =
    aboutCms?.mediaUrl ||
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80'
  const mediaPoster = aboutCms?.mediaPoster
  const mediaOverlayTitle = aboutCms?.highlightText || 'From Raw Space to Broadcast Reality'
  const mediaOverlayBadge = aboutCms?.tagline || 'Custom Execution'

  // Mission, Vision, Who We Serve
  const missionTitle = missionCms?.title || 'Our Mission'
  const missionDesc =
    missionCms?.description ||
    'Deliver dependable video production and custom studio builds that help businesses and creators present their work clearly.'

  const visionTitle = visionCms?.title || 'Our Vision'
  const visionDesc =
    visionCms?.description ||
    'Build a reliable media house and studio design firm known across Nigeria for technical quality and straightforward execution.'

  const whoWeServeTitle = whoWeServeCms?.title || 'Who We Serve'
  const whoWeServeDesc =
    whoWeServeCms?.description ||
    'Companies, television stations, government parastatals, advertising agencies, churches, NGOs, and independent video creators.'

  return (
    <section id="about-us" className="relative py-28 px-4 sm:px-6 md:px-12 bg-neutral-950/80 border-t border-white/10 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-[11px] font-mono uppercase tracking-widest text-red-400 font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>{badgeText}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black sm:font-bold tracking-tight text-white max-w-3xl mb-4 leading-tight">
            {titleText}
          </h2>
          <p className="text-lg sm:text-lg md:text-xl text-neutral-300 font-medium sm:font-normal max-w-2xl leading-relaxed">
            {descriptionText}
          </p>
        </div>

        {/* Story & Background Two-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-5 text-lg sm:text-lg text-neutral-200 sm:text-neutral-300 leading-relaxed font-normal sm:font-light">
            {aboutCms?.richTextHtml ? (
              <div
                dangerouslySetInnerHTML={{ __html: aboutCms.richTextHtml }}
                className="space-y-4 prose prose-invert max-w-none text-neutral-200 text-xl"
              />
            ) : (
              <>
                <p>
                  We started behind the camera in cinematography and editing, then expanded into directing, production management, and studio fabrication. Over the years, we have worked with television networks, corporate teams, government agencies, churches, and independent creators.
                </p>
                <p>
                  We handle projects across five areas: documentaries, television and event coverage, commercial ads, short-form digital content, and acoustically treated production sets.
                </p>
              </>
            )}

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-white/80">
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-semibold sm:font-normal">
                Lagos Studio Headquarters
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-semibold sm:font-normal">
                Operating Hours: {siteConfig.operatingHours}
              </span>
            </div>
          </div>

          {/* Media Box: Video or Image from CMS (Cloudinary, YouTube, Local) */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video lg:aspect-square bg-neutral-900 shadow-2xl group">
            <UniversalMedia
              mediaType={mediaType}
              mediaSource={mediaSource}
              src={mediaUrl}
              poster={mediaPoster}
              alt="PrimeLense Media Production Studio"
              className="object-cover w-full h-full"
              autoPlay={true}
              loop={true}
              muted={true}
              controls={mediaType === 'video'}
            />

            {/* Gradient & Overlay Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
              <span className="text-xs sm:text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block mb-1">
                {mediaOverlayBadge}
              </span>
              <h3 className="text-2xl sm:text-xl font-bold text-white">
                {mediaOverlayTitle}
              </h3>
            </div>
          </div>
        </div>

        {/* Mission, Vision & Target Audience */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
            <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6">
              <Target className="w-6 h-6 sm:w-5 sm:h-5" />
            </div>
            <h4 className="text-xl sm:text-lg font-bold text-white mb-3">{missionTitle}</h4>
            <p className="text-lg sm:text-xl text-neutral-300 sm:text-neutral-400 leading-relaxed font-normal">
              {missionDesc}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
            <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
              <Award className="w-6 h-6 sm:w-5 sm:h-5" />
            </div>
            <h4 className="text-xl sm:text-lg font-bold text-white mb-3">{visionTitle}</h4>
            <p className="text-lg sm:text-xl text-neutral-300 sm:text-neutral-400 leading-relaxed font-normal">
              {visionDesc}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
            <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
              <Users className="w-6 h-6 sm:w-5 sm:h-5" />
            </div>
            <h4 className="text-xl sm:text-lg font-bold text-white mb-3">{whoWeServeTitle}</h4>
            <p className="text-lg sm:text-xl text-neutral-300 sm:text-neutral-400 leading-relaxed font-normal">
              {whoWeServeDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
