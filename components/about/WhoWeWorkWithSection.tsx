'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, CheckCircle2, Building2, Tv, Landmark, Megaphone, Church, Heart, Users, Sparkle } from 'lucide-react'
import { useSection } from '@/components/shared/context/CMSContext'

const CLIENT_GROUPS = [
  { label: 'Corporate Organisations', icon: Building2 },
  { label: 'SMEs & Growing Brands', icon: Sparkles },
  { label: 'Television Stations & Broadcasters', icon: Tv },
  { label: 'Government Institutions', icon: Landmark },
  { label: 'Advertising Agencies', icon: Megaphone },
  { label: 'Churches', icon: Church },
  { label: 'NGOs', icon: Heart },
  { label: 'Content Creators', icon: Sparkle },
  { label: 'Individuals', icon: Users },
]

export default function WhoWeWorkWithSection() {
  const cms = useSection('who-we-work-with')

  const badgeText = cms?.badge || 'Partnerships & Clients'
  const titleText = cms?.title || 'Who We Work With'
  const descriptionText =
    cms?.description ||
    'We work with corporate organisations, SMEs and growing brands, television stations and broadcasters, government institutions, advertising agencies, churches, NGOs, content creators, and individuals.'

  const ctaPrimaryLabel = cms?.ctaPrimaryLabel || "Let's Bring Your Vision to Life"
  const ctaPrimaryLink = cms?.ctaPrimaryLink || '#start-a-project'

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById('start-a-project') || document.getElementById('enquiry')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="who-we-work-with"
      className="relative py-28 px-4 sm:px-6 md:px-12 bg-neutral-950/80 border-t border-white/10 z-10 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-[11px] font-mono uppercase tracking-widest text-red-400 font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>{badgeText}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black sm:font-bold tracking-tight text-white mb-6 leading-tight">
            {titleText}
          </h2>

          <p className="text-lg sm:text-xl text-neutral-300 font-medium max-w-3xl leading-relaxed">
            {descriptionText}
          </p>
        </div>

        {/* Client Categories Grid / Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
          {CLIENT_GROUPS.map((group, i) => {
            const Icon = group.icon
            return (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-red-500/40 hover:bg-white/[0.04] transition-all flex items-center gap-3.5 group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                  {group.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Callout Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/15 p-8 sm:p-12 text-center overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-normal">
              Whatever the scale of your project, we take the time to understand your vision and develop an approach suited to your goals.
            </p>

            <div className="pt-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                Let&apos;s Bring Your Vision to Life.
              </h3>
              <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-xl mx-auto">
                Have an idea you want to produce, a story you want to tell, or a studio space you want to create? We would love to hear from you.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={ctaPrimaryLink}
                onClick={scrollToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-red-600/25 group"
              >
                <span>{ctaPrimaryLabel}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <p className="text-xs sm:text-sm font-mono text-neutral-500 pt-4">
              PrimeLense Media Ltd. — Ideas in Motion. Spaces with Purpose.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
