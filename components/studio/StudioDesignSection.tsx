'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { consultationStore } from '@/store/consultation.store'
import { Sparkles, Layers, ArrowRight, Check } from 'lucide-react'
import AppButton from '@/components/shared/ui/AppButton'
import Image from 'next/image'

export default function StudioDesignSection() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: '01. Original Space',
      subtitle: 'Client Space & Site Assessment',
      desc: 'We inspect room dimensions, natural light, structural pillars, HVAC noise, and acoustic reflection points.',
      img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: '02. 3D Concept & Renders',
      subtitle: 'Architectural Photorealistic Visualisation',
      desc: 'We render the set from every camera shooting angle, dialing in wood finishes, feature walls, and DMX lighting schemes.',
      img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: '03. Fabrication & Carpentry',
      subtitle: 'Precision Construction & Acoustics',
      desc: 'Our fabrication workshops build custom host desks, acoustic slatting, floating display brackets, and backdrops.',
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: '04. Completed Studio',
      subtitle: 'Turnkey Handover & Broadcast Ready',
      desc: 'Final acoustic tuning, lighting programming, camera pedestal alignment, and client team handover.',
      img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
    },
  ]

  const spacesDesigned = [
    'Television Studios & Broadcast News Sets',
    'High-End Video Podcast Studios',
    'YouTube Creator Sets & Multi-Angle Studios',
    'Custom Talk Show Sets & Anchor Desks',
    'Corporate In-House Content Studios',
    'Church Media Auditoriums & Broadcast Rooms',
    'Acoustic Feature Walls & Modern Backdrops',
  ]

  return (
    <section id="studio-design" className="relative py-28 px-4 sm:px-6 md:px-12 bg-neutral-950 border-t border-white/10 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-emerald-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey Studio Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mb-4">
            We Don't Just Produce Content. We Build the Spaces Where It Comes Alive.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            PrimeLense Media designs and fabricates custom production environments tailored to broadcasters, corporate organisations, brands, churches, and digital creators.
          </p>
        </div>

        {/* What We Design List + Transformation Interactive Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Studio Environments Tailored to Your Vision
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Every great broadcast begins with an inspiring environment. Whether turning an ordinary corporate boardroom into a multi-cam podcast studio or fabricating a prime-time television set, our fabrication teams deliver turnkey excellence.
            </p>

            <div className="space-y-2.5">
              {spacesDesigned.map((space, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span>{space}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <AppButton
                variant="primary"
                size="md"
                onClick={() => consultationStore.open('studio-design')}
                className="font-semibold text-xs bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              >
                Start a Studio Project
              </AppButton>
            </div>
          </div>

          {/* Interactive 4-Stage Showcase (Before -> 3D -> Build -> Result) */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-3xl bg-black/60 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                  Project Evolution Workflow
                </span>
                <span className="text-xs text-white/50 font-mono">
                  Stage {activeStep + 1} of 4
                </span>
              </div>

              {/* Progress tabs */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {steps.map((st, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`py-2 px-1 text-[11px] font-mono rounded-lg transition-all text-center truncate ${
                      activeStep === i
                        ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-semibold'
                        : 'bg-white/5 hover:bg-white/10 text-white/50'
                    }`}
                  >
                    {st.title.split('.')[1]}
                  </button>
                ))}
              </div>

              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-neutral-900 border border-white/10 mb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={steps[activeStep].img}
                      alt={steps[activeStep].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-lg font-bold text-white">
                    {steps[activeStep].title}
                  </h4>
                  <p className="text-xs text-amber-300/90 font-mono">
                    {steps[activeStep].subtitle}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {steps[activeStep].desc}
              </p>
            </div>
          </div>
        </div>

        {/* 7-Step Process Bar */}
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10">
          <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-6 text-center">
            Our 7-Step Fabrication Methodology
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {[
              { num: '01', name: 'Consultation' },
              { num: '02', name: 'Assessment' },
              { num: '03', name: 'Concepts' },
              { num: '04', name: '3D Render' },
              { num: '05', name: 'Fabrication' },
              { num: '06', name: 'Installation' },
              { num: '07', name: 'Handover' },
            ].map((p, i) => (
              <div key={i} className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono text-emerald-400 block mb-1">{p.num}</span>
                <span className="text-xs font-semibold text-white">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
