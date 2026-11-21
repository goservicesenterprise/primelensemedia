'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { TestimonialItem } from '@/types/admin'

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    author: 'Chief Adebayo Adeleke',
    role: 'Executive Director of Communications',
    company: 'Pan-African Leadership Initiative',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    content: 'PrimeLense Media managed camera operation, lighting, and sound for our continental documentary. The final master met our international broadcast partner specifications without review delays.',
    rating: 5,
    serviceTag: 'Media Production',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 't-2',
    author: 'Folashade Balogun',
    role: 'Head of Brand Marketing',
    company: 'Vanguard Sovereign Holdings',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    content: 'They handled our corporate profiles and multi-cam live event broadcast reliably and on schedule. We have already booked them for our next annual showcase.',
    rating: 5,
    serviceTag: 'Live Broadcast & Events',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 't-3',
    author: 'David O. Mensah',
    role: 'Founder & Managing Director',
    company: 'Helios Industrial Group',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    content: 'The acoustic wall treatment and camera setup they built for our in-house studio cut our production time in half and improved our video quality noticeably.',
    rating: 5,
    serviceTag: 'Studio Design & Acoustic Engineering',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
]

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(FALLBACK_TESTIMONIALS)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    fetch('/api/admin?resource=testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.data) && data.data.length > 0) {
          const featured = data.data.filter((t: TestimonialItem) => t.isFeatured)
          setTestimonials(featured.length > 0 ? featured : data.data)
        }
      })
      .catch(() => {
        // Fallback already initialized
      })
  }, [])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="testimonials" className="relative py-28 px-4 sm:px-6 md:px-12 bg-black border-t border-white/10 z-10 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-[11px] font-mono uppercase tracking-widest text-red-400 font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mb-4 leading-tight">
            What Clients Say About Working With Us
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-medium max-w-2xl leading-relaxed">
            Feedback from companies, directors, and organizations who hired us for production and studio work.
          </p>
        </div>

        {/* Featured Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-7 rounded-3xl bg-neutral-950/70 border border-white/10 hover:border-red-500/40 transition-all flex flex-col justify-between group shadow-xl backdrop-blur-sm relative"
            >
              <div className="space-y-4">
                {/* Top Quote Icon & Service Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <Quote className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
                    {item.serviceTag}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Content */}
                <p className="text-base sm:text-base text-neutral-200 font-medium leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-3.5">
                {item.avatarUrl ? (
                  <img
                    src={item.avatarUrl}
                    alt={item.author}
                    className="w-11 h-11 rounded-full object-cover border border-white/15 shrink-0"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center font-bold text-red-400 text-sm shrink-0">
                    {item.author.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{item.author}</h4>
                  <p className="text-xs text-neutral-400 truncate">
                    {item.role}
                  </p>
                  <p className="text-[11px] font-mono text-red-400/90 truncate font-semibold">
                    {item.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mt-0.5">
              Broadcast Spec Delivery
            </div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">150+</div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mt-0.5">
              Films & Productions
            </div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">5.0 ★</div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mt-0.5">
              Client Satisfaction
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
