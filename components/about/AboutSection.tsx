'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { CheckCircle2, Target, Award, Sparkles, Building2, Users } from 'lucide-react'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about-us" className="relative py-28 px-4 sm:px-6 md:px-12 bg-neutral-950/80 border-t border-white/10 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Company Profile</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mb-4">
            We Create. We Produce. We Build.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Born out of a deep passion for cinematography, directing, and design, PrimeLense Media Ltd. ({siteConfig.registrationNumber}) unites creative storytelling with practical production knowledge.
          </p>
        </div>

        {/* Story & Background Two-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-5 text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
            <p>
              At PrimeLense Media, we believe every great idea deserves exceptional execution. Born out of hands-on experience in cinematography and editing that evolved into directing, producing, and turnkey studio architecture, we have served television stations, corporate organisations, government parastatals, churches, and digital creators.
            </p>
            <p>
              Whether you are looking to tell a powerful documentary story, launch a high-impact advertising campaign, produce a multi-camera television programme, or construct an acoustically tuned broadcast studio, our team brings creativity, strategy, and execution tailored to your vision.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-white/60">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                Lagos Studio Headquarters
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                Turnkey Execution
              </span>
              <h3 className="text-xl font-bold text-white">
                From Raw Space to Broadcast Reality
              </h3>
            </div>
          </div>
        </div>

        {/* Mission, Vision & Target Audience */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Our Mission</h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              To provide creative, innovative, and high-quality media and studio solutions that empower individuals, brands, and organisations to communicate powerful stories and ideas.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Our Vision</h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              To become a leading creative media and studio solutions company recognised for excellence, technical innovation, and culturally impactful storytelling across Africa and globally.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Who We Serve</h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Corporate organisations, broadcasters, growing brands, churches and religious institutions, NGOs, and ambitious content creators who need professional media and studios.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
