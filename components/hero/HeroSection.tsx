'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { themeStore } from '@/store/theme.store'
import { consultationStore } from '@/store/consultation.store'
import { siteConfig } from '@/config/site'
import { ArrowDown, Clapperboard, Sparkles, Play } from 'lucide-react'
import AppButton from '@/components/shared/ui/AppButton'

const HeroSection = observer(function HeroSection() {
  const { currentDiscipline } = themeStore

  const scrollToServices = () => {
    const el = document.getElementById('services')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToWork = () => {
    const el = document.getElementById('our-work')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-28 sm:pt-32 pb-16 overflow-hidden z-10">
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-[140px] pointer-events-none opacity-30 transition-all duration-1000 -z-10"
        style={{ backgroundColor: currentDiscipline.accentHex }}
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-[10px] sm:text-[11px] uppercase tracking-widest text-white/80 mb-6"
        >
          <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
          <span>Creative Media Production & Studio Solutions</span>
        </motion.div>

        {/* Primary Headline from Technical Requirements */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white max-w-4xl leading-[1.02] mb-6"
        >
          Ideas in Motion.{' '}
          <span
            className="italic font-light transition-colors duration-700 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40"
            style={{
              textShadow: `0 0 40px ${currentDiscipline.accentHex}40`,
            }}
          >
            Spaces with Purpose.
          </span>{' '}
          Stories That Last.
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed mb-10 tracking-tight"
        >
          {siteConfig.description} From documentaries and commercials to podcasts, television productions, and custom-built studios, we combine creativity, strategy, and technical expertise to bring visions to life.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14"
        >
          <AppButton
            variant="primary"
            size="lg"
            onClick={() => consultationStore.open('media-production')}
            className="w-full sm:w-auto font-semibold text-sm shadow-[0_0_40px_rgba(255,255,255,0.25)]"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Start a Project
          </AppButton>

          <AppButton
            variant="glass"
            size="lg"
            onClick={scrollToWork}
            className="w-full sm:w-auto text-sm border-white/20 hover:border-white/40 text-neutral-200"
          >
            <Play className="w-3.5 h-3.5 fill-current text-white/70" />
            View Our Work
          </AppButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToServices}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white text-xs font-mono tracking-wider transition-colors"
          aria-label="Scroll to explore services"
        >
          <span className="uppercase text-[10px]">Explore Capabilities</span>
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  )
})

export default HeroSection
