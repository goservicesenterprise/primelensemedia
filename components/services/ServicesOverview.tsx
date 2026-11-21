'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SERVICES_CONFIG } from '@/config/disciplines'
import { consultationStore } from '@/store/consultation.store'
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react'
import AppButton from '@/components/shared/ui/AppButton'
import { useSection } from '@/components/shared/context/CMSContext'
import UniversalMedia from '@/components/shared/ui/UniversalMedia'
import { CapabilityServiceItem } from '@/types/admin'
import { DEFAULT_CAPABILITY_SERVICES } from '@/components/admin/CapabilityServicesManager'

export default function ServicesOverview() {
  const cms = useSection('services')

  const badgeText = cms?.badge || 'Our Capabilities'
  const titleText = cms?.title || 'Media Production & Studio Solutions'
  const descriptionText =
    cms?.description ||
    'Full-service media production and studio design. Select a category below to view scope, specifications, and previous work.'

  // Dynamic capabilities & services from CMS metadata or fallback to the 7 defaults
  const servicesList: CapabilityServiceItem[] =
    (cms?.metadata?.services || cms?.metadata?.items) &&
    Array.isArray(cms.metadata?.services || cms.metadata?.items) &&
    (cms.metadata?.services || cms.metadata?.items).length > 0
      ? (cms.metadata?.services || cms.metadata?.items)
      : DEFAULT_CAPABILITY_SERVICES

  const [activeTab, setActiveTab] = useState<string>(servicesList[0]?.id || 'media-production')

  // Resolve current active service item
  const currentItem =
    servicesList.find((s) => s.id === activeTab) ||
    servicesList[0] ||
    DEFAULT_CAPABILITY_SERVICES[0]

  // Optional fallback to static SERVICES_CONFIG for any missing rich properties like metrics
  const fallbackConfig = SERVICES_CONFIG[currentItem.id || ''] || SERVICES_CONFIG['media-production']

  const heroBadge = currentItem.heroBadge || fallbackConfig?.heroBadge || 'Our Capability'
  const title = currentItem.title || fallbackConfig?.title || 'Service Title'
  const tagline = currentItem.tagline || fallbackConfig?.tagline || ''
  const description =
    currentItem.description ||
    `${fallbackConfig?.description || ''} ${fallbackConfig?.leadParagraph || ''}`.trim()
  const specialties =
    currentItem.specialties && currentItem.specialties.length > 0
      ? currentItem.specialties
      : fallbackConfig?.specialties || []
  const clientName = currentItem.client || fallbackConfig?.showcases?.[0]?.client || 'Client Partner'
  const showcaseTitle =
    currentItem.featuredShowcaseTitle || fallbackConfig?.showcases?.[0]?.title || 'Featured Showcase'
  const mediaUrl =
    currentItem.mediaUrl ||
    fallbackConfig?.showcases?.[0]?.imageUrl ||
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80'
  const mediaType = currentItem.mediaType || 'image'
  const mediaSource = currentItem.mediaSource || 'cloudinary'
  const mediaPoster = currentItem.mediaPoster || ''

  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 md:px-12 bg-black border-t border-white/10 z-10">
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
          <p className="text-lg sm:text-lg md:text-xl text-neutral-200 sm:text-neutral-300 font-medium sm:font-normal max-w-3xl leading-relaxed">
            {descriptionText}
          </p>
        </div>

        {/* Category Pills Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12">
          {servicesList.map((cat, idx) => {
            const isSelected = (currentItem.id || idx.toString()) === (cat.id || idx.toString())
            return (
              <button
                key={cat.id || idx}
                onClick={() => setActiveTab(cat.id || idx.toString())}
                className={`flex items-center gap-2 px-4 sm:px-4 py-3 sm:py-2.5 rounded-full text-sm sm:text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-white text-black shadow-lg shadow-white/10 scale-105'
                    : 'bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white border border-white/10'
                }`}
              >
                <span>{cat.icon || '⚙️'}</span>
                <span>{cat.title}</span>
              </button>
            )
          })}
        </div>

        {/* Selected Service Interactive Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id || activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="p-6 sm:p-12 rounded-3xl bg-neutral-950/90 border border-white/10 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Info & Specs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-xs font-mono font-semibold text-red-400">
                  <span>{heroBadge}</span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-black sm:font-bold text-white mb-2 leading-tight">
                    {title}
                  </h3>
                  {tagline && (
                    <p className="text-lg sm:text-lg text-red-200/90 font-medium sm:font-light italic">
                      &quot;{tagline}&quot;
                    </p>
                  )}
                </div>

                {description && (
                  <p className="text-lg sm:text-lg text-neutral-200 sm:text-neutral-300 font-medium sm:font-normal leading-relaxed">
                    {description}
                  </p>
                )}

                {/* Specialties Grid */}
                {specialties.length > 0 && (
                  <div>
                    <h4 className="text-xs sm:text-xs font-mono uppercase tracking-widest text-white/70 sm:text-white/50 mb-3 font-semibold">
                      Services Included
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2.5">
                      {specialties.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-base sm:text-sm text-neutral-200 font-medium sm:font-normal"
                        >
                          <CheckCircle2 className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-red-400 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action CTA */}
                <div className="pt-4 flex flex-wrap gap-4">
                  <AppButton
                    variant="primary"
                    size="md"
                    onClick={() => consultationStore.open((currentItem.id as any) || 'media-production')}
                    className="w-full sm:w-auto font-bold text-sm sm:text-xs py-3.5 cursor-pointer"
                  >
                    <span>Start {title}</span>
                    <ArrowUpRight className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </AppButton>
                </div>
              </div>

              {/* Right Column: Visual Showcase Preview (Cloudinary, Local, YouTube or Unsplash) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] bg-neutral-900 group">
                  <UniversalMedia
                    src={mediaUrl}
                    mediaType={mediaType}
                    mediaSource={mediaSource}
                    poster={mediaPoster || mediaUrl}
                    alt={title}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    controls={mediaType === 'video'}
                    autoPlay={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                    <span className="text-xs sm:text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold block mb-1">
                      Featured Showcase
                    </span>
                    <h4 className="text-xl sm:text-lg font-bold text-white">
                      {showcaseTitle}
                    </h4>
                    <p className="text-sm sm:text-xs text-neutral-300 sm:text-neutral-400 font-medium sm:font-normal">
                      Client: {clientName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
