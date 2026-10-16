'use client'

import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { DisciplineConfig } from '@/types'
import { themeStore } from '@/store/theme.store'
import { consultationStore } from '@/store/consultation.store'
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Film,
  Zap,
  Compass,
  Hammer,
  Mic,
} from 'lucide-react'
import AppButton from '@/components/shared/ui/AppButton'

interface DisciplineSectionProps {
  config: DisciplineConfig
  index: number
}

const iconsMap: Record<string, React.ReactNode> = {
  filmmaking: <Film className="w-5 h-5" />,
  'content-creation': <Zap className="w-5 h-5" />,
  'media-consultation': <Compass className="w-5 h-5" />,
  'set-fabrication': <Hammer className="w-5 h-5" />,
  'podcast-brand-videos': <Mic className="w-5 h-5" />,
}

const DisciplineSection = observer(function DisciplineSection({ config, index }: DisciplineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, {
    amount: 0.35,
    margin: '-10% 0px -10% 0px',
  })

  // Whenever this section enters the viewport, trigger the global ambient theme change
  useEffect(() => {
    if (isInView) {
      themeStore.setActiveDiscipline(config.id)
    }
  }, [isInView, config.id])

  return (
    <section
      id={config.id}
      ref={sectionRef}
      className="relative min-h-screen py-28 px-6 md:px-12 flex flex-col justify-center border-t border-white/[0.06] overflow-hidden"
    >
      {/* Dynamic Background Hues & Gradients */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 -z-10"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${config.ambientColor}, transparent 80%)`,
          opacity: isInView ? 1 : 0.2,
        }}
      />

      <div className="max-w-6xl mx-auto w-full">
        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs tracking-wider uppercase font-mono font-medium backdrop-blur-md"
            style={{
              borderColor: `${config.accentHex}40`,
              backgroundColor: `${config.accentHex}10`,
              color: config.accentHex,
            }}
          >
            {iconsMap[config.id]}
            <span>{config.heroBadge}</span>
          </div>

          <span className="font-mono text-xs text-white/40 tracking-widest">
            {`0${index + 1} / 05`}
          </span>
        </div>

        {/* Title & Tagline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline mb-14">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
              {config.title}
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
              {config.tagline}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed mb-6">
              {config.leadParagraph}
            </p>

            {/* Section Localized Consultation CTA */}
            <div>
              <AppButton
                variant="primary"
                size="md"
                onClick={() => consultationStore.open(config.id)}
                className="gap-2 font-semibold shadow-xl group"
                style={{
                  boxShadow: `0 0 25px ${config.accentHex}40`,
                }}
              >
                <Sparkles className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                Book {config.title.split(' ')[0]} Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </AppButton>
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {config.metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-6 rounded-2xl bg-neutral-950/60 backdrop-blur-xl border border-white/[0.08] hover:border-white/20 transition-all duration-300"
            >
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1">
                {metric.value}
              </p>
              <p className="text-xs uppercase tracking-wider font-semibold text-white/80">
                {metric.label}
              </p>
              <p className="text-xs text-white/40 mt-1">{metric.sublabel}</p>
            </motion.div>
          ))}
        </div>

        {/* Visual Showcase & Specs Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Showcase Project Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {config.showcases.map((project, pIdx) => (
              <div
                key={pIdx}
                className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-white/30 transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/80">
                    {project.aspectRatio}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between bg-neutral-950/80 backdrop-blur-md">
                  <div>
                    <div className="flex items-center justify-between text-xs text-white/40 mb-1 font-mono">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Specs & Specialties Panel */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-neutral-950/80 backdrop-blur-xl border border-white/10 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 pb-2 border-b border-white/10">
                Core Specialties
              </h4>
              <ul className="space-y-3 mb-8">
                {config.specialties.map((spec, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-snug">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5 transition-colors"
                      style={{ color: config.accentHex }}
                    />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 pb-2 border-b border-white/10">
                Technical Rig Standards
              </h4>
              <div className="space-y-3">
                {config.specs.map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-mono">{item.label}</span>
                    <span className="text-xs text-white/90 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <button
                onClick={() => consultationStore.open(config.id)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-center flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Customize {config.title.split(' ')[0]} Scope
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default DisciplineSection
