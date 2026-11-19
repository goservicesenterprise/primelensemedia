'use client'

import React from 'react'
import { Flame, Award, ShieldCheck, Clock, Sparkles, CheckCircle2, HeartHandshake, Layers, Target } from 'lucide-react'
import { useSection } from '@/components/shared/context/CMSContext'

const DEFAULT_PILLARS = [
  {
    title: 'Hands-On Experience',
    desc: 'Our practical experience across cinematography, editing, directing, producing, and design gives us a well-rounded understanding of the production process.',
  },
  {
    title: 'Creativity with Purpose',
    desc: 'We combine fresh ideas with practical execution to create solutions that meet our clients’ objectives.',
  },
  {
    title: 'A Passionate Team',
    desc: 'Our talented team brings creativity, collaboration, and dedication to every project.',
  },
  {
    title: 'Integrated Solutions',
    desc: 'We offer both media production and studio design and fabrication, helping clients create compelling content and the spaces needed to produce it.',
  },
  {
    title: 'Commitment to Excellence',
    desc: 'We value integrity, attention to detail, and timely delivery in every client engagement.',
  },
]

const PILLAR_ICONS = [
  { icon: Flame, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
  { icon: Target, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  { icon: HeartHandshake, color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
  { icon: Layers, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  { icon: Award, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { icon: ShieldCheck, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
]

export default function WhyChooseUsSection() {
  const cms = useSection('why-choose-us')

  const badgeText = cms?.badge || 'Core Values'
  const titleText = cms?.title || 'Why Productions and Studios Choose PrimeLense'
  const descriptionText =
    cms?.description ||
    'We bring camera crew, post-production, and studio carpentry together so you work with one accountable team.'

  // Dynamic pillars from CMS metadata (with fallback to the requested 5 items)
  const rawPillars =
    cms?.metadata?.pillars ||
    cms?.metadata?.items ||
    DEFAULT_PILLARS

  const pillars = Array.isArray(rawPillars) && rawPillars.length > 0
    ? rawPillars.map((p: any, idx: number) => {
        const style = PILLAR_ICONS[idx % PILLAR_ICONS.length]
        return {
          icon: style.icon,
          color: style.color,
          title: p.title || p.label || 'Commitment to Quality',
          desc: p.description || p.desc || '',
        }
      })
    : DEFAULT_PILLARS.map((p, idx) => ({
        ...p,
        ...PILLAR_ICONS[idx % PILLAR_ICONS.length],
      }))

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
