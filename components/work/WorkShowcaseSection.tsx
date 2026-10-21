'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Play, Film, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function WorkShowcaseSection() {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const filters = [
    'ALL',
    'FILM & DOCUMENTARIES',
    'COMMERCIALS',
    'TELEVISION',
    'PODCASTS',
    'EVENTS',
    'STUDIO DESIGN',
  ]

  const projects = [
    {
      title: 'Legacy of Vision',
      client: 'Pan-African Leadership Initiative',
      category: 'FILM & DOCUMENTARIES',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
      description: 'Feature documentary exploring leadership, continental infrastructure, and generational change.',
      tags: ['Documentary', 'Cinema 4K', 'Global Broadcast'],
    },
    {
      title: 'Apex Newsroom & Studio 01',
      client: 'Continental Media Network',
      category: 'STUDIO DESIGN',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
      description: 'Complete 3D design, acoustic fabrication, custom anchor desk, and DMX lighting array.',
      tags: ['Studio Design', 'Turnkey Build', 'Broadcast'],
    },
    {
      title: 'Beyond the Curve',
      client: 'Founders Circle Africa',
      category: 'PODCASTS',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
      description: 'Flagship multi-cam video podcast capturing in-depth dialogue with prominent African business leaders.',
      tags: ['Video Podcast', 'Multi-Cam', 'Social Cutdowns'],
    },
    {
      title: 'Essence of Purity',
      client: 'Aura Luxury Fragrances',
      category: 'COMMERCIALS',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80',
      description: 'High-speed television commercial and digital ad campaign driving premier luxury engagement.',
      tags: ['Commercial', 'TVC', 'High-Speed Cinema'],
    },
    {
      title: 'The Dialogue Hour',
      client: 'National Broadcast Service',
      category: 'TELEVISION',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1200&q=80',
      description: 'Syndicated weekly talk show featuring multi-camera live switching and custom set backdrop.',
      tags: ['Television', 'Talk Show', 'Syndication'],
    },
    {
      title: 'Global Summit 2025',
      client: 'West African Economic Forum',
      category: 'EVENTS',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      description: 'Live broadcast production, keynote recording, and real-time social media video clip delivery.',
      tags: ['Event Production', 'Live Stream', 'Multi-Cam'],
    },
  ]

  const filteredProjects =
    activeFilter === 'ALL'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="our-work" className="relative py-28 px-4 sm:px-6 md:px-12 bg-black border-t border-white/10 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mb-4">
            Ideas Brought to Life. Stories Told. Spaces Transformed.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Explore selected documentaries, commercials, television broadcasts, podcast series, and turnkey studio fabrication projects.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all ${
                activeFilter === f
                  ? 'bg-white text-black font-semibold'
                  : 'bg-white/[0.03] text-white/60 hover:text-white border border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                key={proj.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-3xl overflow-hidden bg-neutral-950 border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-white/80 border border-white/10">
                    {proj.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 block mb-1">
                      Client: {proj.client} • {proj.year}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] font-mono text-white/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
