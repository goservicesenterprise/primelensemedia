'use client'

import React from 'react'
import { Flame, Award, ShieldCheck, Clock, Sparkles } from 'lucide-react'

export default function WhyChooseUsSection() {
  const pillars = [
    {
      icon: Flame,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      title: 'Passion',
      desc: 'We bring boundless energy, artistic curiosity, and genuine commitment to every frame and fabrication blueprint we undertake.',
    },
    {
      icon: Award,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      title: 'Excellence',
      desc: 'Great work is found in meticulous attention to detail. We pursue premier technical and creative standards from concept to finishing.',
    },
    {
      icon: ShieldCheck,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: 'Integrity',
      desc: 'We value transparent communication, truthful budgeting, and enduring working relationships founded on mutual trust.',
    },
    {
      icon: Clock,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      title: 'Timely Delivery',
      desc: 'We respect production deadlines and work diligently with disciplined schedules to deliver projects on or ahead of time.',
    },
  ]

  const workflow = [
    {
      num: '01',
      title: 'Discover',
      desc: 'We understand your core idea, objectives, target audience, and functional requirements.',
    },
    {
      num: '02',
      title: 'Develop',
      desc: 'We develop creative concepts, scripts, storyboards, and 3D architectural schemes.',
    },
    {
      num: '03',
      title: 'Plan',
      desc: 'We construct a clear production rundown, equipment schedule, and fabrication blueprint.',
    },
    {
      num: '04',
      title: 'Create',
      desc: 'Our directors and fabrication crews bring the vision to life with professional execution.',
    },
    {
      num: '05',
      title: 'Deliver',
      desc: 'We finish, master, and hand over the completed media or turnkey production studio.',
    },
  ]

  return (
    <section id="why-choose-us" className="relative py-28 px-4 sm:px-6 md:px-12 bg-black border-t border-white/10 z-10">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Why Choose Us */}
        <div>
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Values</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mb-4">
              Why PrimeLense Media
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
              We merge hands-on experience, creative vision, integrated production, and architectural capabilities under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon
              return (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-neutral-950 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 ${p.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-emerald-400 mb-4">
              <span>Production Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white max-w-3xl mb-4">
              From Idea to Final Delivery
            </h2>
            <p className="text-sm text-neutral-400 max-w-2xl">
              A structured, transparent methodology ensuring creative brilliance and punctual handovers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflow.map((w, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between relative group hover:border-white/30 transition-all"
              >
                <div>
                  <span className="text-2xl font-bold font-mono text-amber-400/80 block mb-3">
                    {w.num}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2">{w.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
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
