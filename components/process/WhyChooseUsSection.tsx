'use client'

import React from 'react'
import { Flame, Award, ShieldCheck, Clock, Sparkles } from 'lucide-react'
import { useSection } from '@/components/shared/context/CMSContext'

export default function WhyChooseUsSection() {
  const cms = useSection('why-choose-us')

  const badgeText = cms?.badge || 'Core Values'
  const titleText = cms?.title || 'Why PrimeLense Media'
  const descriptionText =
    cms?.description ||
    'We bring camera crew, post-production, and studio carpentry together so you work with one accountable team.'
  const pillars = [
    {
      icon: Flame,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      title: 'Practical Focus',
      desc: 'We care about framing, clean audio, and durable set builds on every job.',
    },
    {
      icon: Award,
      color: 'text-red-400 bg-red-500/10 border-red-500/20',
      title: 'Standards',
      desc: 'Our video files and audio levels meet broadcast and streaming technical guidelines.',
    },
    {
      icon: ShieldCheck,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: 'Transparency',
      desc: 'Itemised quotes, clear timelines, and direct communication throughout production.',
    },
    {
      icon: Clock,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      title: 'Timely Delivery',
      desc: 'We plan shoot days and post-production milestones carefully to hit your deadlines.',
    },
  ]

  const workflow = [
    {
      num: '01',
      title: 'Discover',
      desc: 'We review your goals, audience, deliverables, and budget.',
    },
    {
      num: '02',
      title: 'Develop',
      desc: 'We draft scripts, storyboards, shoot schedules, or 3D room plans.',
    },
    {
      num: '03',
      title: 'Plan',
      desc: 'We confirm call sheets, equipment packages, and build materials.',
    },
    {
      num: '04',
      title: 'Create',
      desc: 'Our camera crew shoots on location, or our carpentry team builds on site.',
    },
    {
      num: '05',
      title: 'Deliver',
      desc: 'We complete editing, audio mixing, color grading, and deliver finished masters.',
    },
  ]

  return (
    <section id="why-choose-us" className="relative py-28 px-4 sm:px-6 md:px-12 bg-black border-t border-white/10 z-10">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Why Choose Us */}
        <div>
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-[11px] font-mono uppercase tracking-widest text-red-400 font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              <span>{badgeText}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black sm:font-bold tracking-tight text-white max-w-3xl mb-4 leading-tight">
              {titleText}
            </h2>
            <p className="text-base sm:text-base md:text-lg text-neutral-200 sm:text-neutral-400 font-medium sm:font-normal max-w-2xl leading-relaxed">
              {descriptionText}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon
              return (
                <div
                  key={i}
                  className="p-7 sm:p-8 rounded-3xl bg-neutral-950 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-14 h-14 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border mb-6 ${p.color}`}
                    >
                      <Icon className="w-7 h-7 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-2xl sm:text-xl font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-sm sm:text-sm text-neutral-300 sm:text-neutral-400 leading-relaxed font-normal sm:font-light">
                      {p.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* The 5-Step Process */}
        <div id="process" className="pt-8 border-t border-white/10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-4">
              <span>Production Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black sm:font-bold tracking-tight text-white max-w-3xl mb-4 leading-tight">
              From Idea to Final Delivery
            </h2>
            <p className="text-base sm:text-sm text-neutral-200 sm:text-neutral-400 font-medium sm:font-normal max-w-2xl leading-relaxed">
              How we take projects from early discussions to final delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflow.map((w, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between relative group hover:border-white/30 transition-all"
              >
                <div>
                  <span className="text-2xl sm:text-2xl font-bold font-mono text-red-400/90 block mb-3">
                    {w.num}
                  </span>
                  <h4 className="text-lg sm:text-base font-bold text-white mb-2">{w.title}</h4>
                  <p className="text-sm sm:text-xs text-neutral-300 sm:text-neutral-400 leading-relaxed font-normal">
                    {w.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
