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
        style={{ backgroundColor: currentDiscipline?.accentHex || '#8B0A1A' }}
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-xs sm:text-[11px] uppercase tracking-wider sm:tracking-widest font-semibold text-white/90 mb-6"
        >
          <Clapperboard className="w-4 h-4 text-amber-400" />
          <span>Creative Media Production & Studio Solutions</span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight sm:tracking-tighter text-white max-w-5xl leading-[1.05] sm:leading-[1.0] mb-6"
        >
          Ideas in Motion.{' '}
          <span
            className="italic font-extrabold transition-colors duration-700 block sm:inline mt-1 sm:mt-0"
            style={{
              color: currentDiscipline?.accentHex || '#8B0A1A',
              textShadow: `0 0 35px ${currentDiscipline?.accentHex || '#8B0A1A'}80`,
            }}
          >
            Spaces with Purpose.
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-neutral-200 font-medium sm:font-normal max-w-2xl leading-relaxed mb-10 tracking-normal"
        >
          Creative media production and turnkey studio solutions. From documentaries, commercials, and podcasts to broadcast television and custom-built studios.
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
            className="w-full sm:w-auto font-bold text-base sm:text-sm shadow-[0_0_40px_rgba(255,255,255,0.25)] py-4 sm:py-3.5"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Start a Project
          </AppButton>

          <AppButton
            variant="glass"
            size="lg"
            onClick={scrollToWork}
            className="w-full sm:w-auto text-base sm:text-sm font-semibold border-white/20 hover:border-white/40 text-neutral-100 py-4 sm:py-3.5"
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
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white text-xs font-mono tracking-wider transition-colors"
          aria-label="Scroll to explore services"
        >
          <span className="uppercase text-xs sm:text-[10px] font-bold sm:font-normal">Explore Capabilities</span>
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  )
})

export default HeroSection
