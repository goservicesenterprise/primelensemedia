'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { themeStore } from '@/store/theme.store'
import { consultationStore } from '@/store/consultation.store'
import { siteConfig } from '@/config/site'
import { ArrowDown, Clapperboard, Sparkles } from 'lucide-react'
import AppButton from '@/components/shared/ui/AppButton'

const HeroSection = observer(function HeroSection() {
  const { currentDiscipline } = themeStore

  const scrollToFirstDiscipline = () => {
    const el = document.getElementById('filmmaking')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 overflow-hidden z-10">
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none opacity-40 transition-all duration-1000 -z-10"
        style={{ backgroundColor: currentDiscipline.accentHex }}
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Top Minimalist Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-[11px] uppercase tracking-widest text-white/70 mb-8"
        >
          <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
          <span>International Creative Production & Architecture</span>
        </motion.div>

        {/* Primary Kinetic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-white max-w-4xl leading-[0.95] mb-8"
        >
          Cinema crafted with{' '}
          <span
            className="italic font-light transition-colors duration-700 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40"
            style={{
              textShadow: `0 0 40px ${currentDiscipline.accentHex}40`,
            }}
          >
            architectural
          </span>{' '}
          intent.
        </motion.h1>

        {/* Human-Friendly Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed mb-10 tracking-tight"
        >
          {siteConfig.description} Every swipe, angle, and frame is sculpted to command international authority.
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <AppButton
            variant="primary"
            size="lg"
            onClick={() => consultationStore.open('filmmaking')}
            className="gap-2.5 font-semibold text-sm shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            Book Creative Consultation
          </AppButton>

          <AppButton
            variant="outline"
            size="lg"
            onClick={scrollToFirstDiscipline}
            className="text-sm font-medium border-white/20 hover:border-white/40"
          >
            Explore Services
            <ArrowDown className="w-4 h-4 text-white/70" />
          </AppButton>
        </motion.div>

        {/* Quick Specs Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left w-full max-w-3xl"
        >
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/40">Headquarters</p>
            <p className="text-xs font-semibold text-white/90 mt-1">Ojodu Berger Lagos. Nigeria.</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/40">Camera Package</p>
            <p className="text-xs font-semibold text-white/90 mt-1">ARRI Alexa 35 / RED</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/40">Optic Standards</p>
            <p className="text-xs font-semibold text-white/90 mt-1">Cooke Anamorphic /i</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/40">Soundstage Status</p>
            <p className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active // Ready
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
})

export default HeroSection
