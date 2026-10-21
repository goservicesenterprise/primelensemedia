'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SERVICES_CONFIG } from '@/config/disciplines'
import { consultationStore } from '@/store/consultation.store'
import { ArrowUpRight, Sparkles, Layers, CheckCircle2 } from 'lucide-react'
import AppButton from '@/components/shared/ui/AppButton'
import Image from 'next/image'

export default function ServicesOverview() {
  const [activeTab, setActiveTab] = useState<string>('media-production')
  const currentService = SERVICES_CONFIG[activeTab] || SERVICES_CONFIG['media-production']

  const serviceCategories = [
    { id: 'media-production', icon: '🎥', label: 'Media Production' },
    { id: 'television-studio', icon: '📺', label: 'Television & Studio' },
    { id: 'podcast-production', icon: '🎙️', label: 'Podcast Production' },
    { id: 'content-creation', icon: '📱', label: 'Content Creation' },
    { id: 'commercial-advertising', icon: '📢', label: 'Commercial & Ads' },
    { id: 'studio-design', icon: '🏗️', label: 'Studio Design & Build' },
    { id: 'media-consultation', icon: '🎬', label: 'Media Consultation' },
  ]

  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 md:px-12 bg-black border-t border-white/10 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Solutions for Powerful Ideas</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mb-4">
            Full-Spectrum Production & Studio Engineering
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            We provide seven core disciplines engineered to help brands, organisations, and creators communicate, connect, and build memorable spaces.
          </p>
        </div>

        {/* Category Pills Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {serviceCategories.map((cat) => {
            const isSelected = activeTab === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-white text-black shadow-lg shadow-white/10 font-semibold scale-105'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/10'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Selected Service Interactive Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="p-8 sm:p-12 rounded-3xl bg-neutral-950/90 border border-white/10 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Info & Specs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-amber-400">
                  <span>{currentService.heroBadge}</span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                    {currentService.title}
                  </h3>
                  <p className="text-sm sm:text-base text-amber-200/90 font-light italic">
                    "{currentService.tagline}"
                  </p>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  {currentService.description} {currentService.leadParagraph}
                </p>

                {/* Specialties Grid */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
                    Services Included
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentService.specialties.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 flex flex-wrap gap-4">
                  <AppButton
                    variant="primary"
                    size="md"
                    onClick={() => consultationStore.open(currentService.id)}
                    className="font-semibold text-xs"
                  >
                    <span>Start {currentService.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </AppButton>
                </div>
              </div>

              {/* Right Column: Visual Showcase Preview */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] bg-neutral-900 group">
                  <Image
                    src={currentService.showcases[0]?.imageUrl || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80'}
                    alt={currentService.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                      Featured Showcase
                    </span>
                    <h4 className="text-lg font-bold text-white">
                      {currentService.showcases[0]?.title}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Client: {currentService.showcases[0]?.client}
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
