'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { Target, Award, Sparkles, Users } from 'lucide-react'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about-us" className="relative py-28 px-4 sm:px-6 md:px-12 bg-neutral-950/80 border-t border-white/10 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Company Profile</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black sm:font-bold tracking-tight text-white max-w-3xl mb-4 leading-tight">
            We Create. We Produce. We Build.
          </h2>
          <p className="text-base sm:text-base md:text-lg text-neutral-300 font-medium sm:font-normal max-w-2xl leading-relaxed">
            Born out of a deep passion for cinematography, directing, and design, PrimeLense Media Ltd. brings a combination of hands-on experience, creative, practical, and professional solutions tailored to our clients' needs.
          </p>
        </div>

        {/* Story & Background Two-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-5 text-base sm:text-base text-neutral-200 sm:text-neutral-300 leading-relaxed font-normal sm:font-light">
            <p>
              At PrimeLense Media, we believe every great idea deserves exceptional execution. Born out of hands-on experience in cinematography and editing that evolved into directing, producing, and turnkey studio fabrication, we have served television stations, corporate organisations, government parastatals, churches, individuals, and digital creators.
            </p>
            <p>
              Whether you are looking to tell a powerful documentary story, launch a high-impact advertising campaign, produce a multi-camera event/television programme, create engaging digital content, or construct an acoustically tuned broadcast studio, our team brings creativity, strategy, and execution tailored to your vision.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-white/80">
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-semibold sm:font-normal">
                Lagos Studio Headquarters
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-semibold sm:font-normal">
                Operating Hours: {siteConfig.operatingHours}
              </span>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video lg:aspect-square bg-neutral-900 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80"
              alt="PrimeLense Media Production Studio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs sm:text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Turnkey Execution
              </span>
              <h3 className="text-2xl sm:text-xl font-bold text-white">
                From Raw Space to Broadcast Reality
              </h3>
            </div>
          </div>
        </div>

        {/* Mission, Vision & Target Audience */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
            <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
              <Target className="w-6 h-6 sm:w-5 sm:h-5" />
            </div>
            <h4 className="text-xl sm:text-lg font-bold text-white mb-3">Our Mission</h4>
            <p className="text-sm sm:text-sm text-neutral-300 sm:text-neutral-400 leading-relaxed font-normal">
              To provide creative, innovative, and high-quality media and studio solutions that empower individuals, brands, and organisations to communicate powerful stories and ideas.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
            <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
              <Award className="w-6 h-6 sm:w-5 sm:h-5" />
            </div>
            <h4 className="text-xl sm:text-lg font-bold text-white mb-3">Our Vision</h4>
            <p className="text-sm sm:text-sm text-neutral-300 sm:text-neutral-400 leading-relaxed font-normal">
              To become a leading creative media and studio solutions company recognised for excellence, technical innovation, and impactful storytelling.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
            <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
              <Users className="w-6 h-6 sm:w-5 sm:h-5" />
            </div>
            <h4 className="text-xl sm:text-lg font-bold text-white mb-3">Who We Serve</h4>
            <p className="text-sm sm:text-sm text-neutral-300 sm:text-neutral-400 leading-relaxed font-normal">
              Corporate organisations, SMEs and growing brands, broadcast stations, government institutions, advertising agencies, churches, NGOs, content creators, and individuals.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
