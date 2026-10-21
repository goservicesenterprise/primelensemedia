'use client'

import React from 'react'
import { siteConfig } from '@/config/site'
import { consultationStore } from '@/store/consultation.store'
import { primaryMenu } from '@/config/menus/primary-menu'
import Image from 'next/image'
import { Sparkles, MapPin, Phone, Mail, MessageSquare } from 'lucide-react'
import AppButton from '@/components/shared/ui/AppButton'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const servicesList = [
    'Media Production',
    'Television & Studio Production',
    'Podcast Production',
    'Content Creation',
    'Commercial Production',
    'Studio Design & Fabrication',
    'Media Consultation',
  ]

  return (
    <footer className="relative bg-neutral-950 border-t border-white/10 pt-20 pb-12 px-4 sm:px-6 md:px-12 text-white overflow-hidden z-20">
      <div className="max-w-6xl mx-auto">
        {/* Top Callout Card */}
        <div className="p-7 sm:p-12 rounded-3xl bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-20 shadow-2xl">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Full-Service Creative Media & Studio Solutions</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black sm:font-bold tracking-tight text-white mb-2 leading-tight">
              Have an Idea? Let's Bring It to Life.
            </h3>
            <p className="text-base sm:text-sm text-neutral-200 sm:text-neutral-400 font-medium sm:font-normal max-w-xl leading-relaxed">
              From documentaries and commercials to custom-fabricated podcast and television studios, PrimeLense Media is ready to help turn your vision into reality.
            </p>
          </div>

          <AppButton
            variant="primary"
            size="lg"
            onClick={() => consultationStore.open('media-production')}
            className="w-full sm:w-auto shrink-0 font-bold text-base sm:text-sm shadow-[0_0_35px_rgba(255,255,255,0.25)] py-4 sm:py-3.5"
          >
            Start a Project
          </AppButton>
        </div>

        {/* Global Studio Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Registration */}
          <div className="md:col-span-1 space-y-4">
            <div className="relative h-12 w-48 mb-2">
              <Image
                src="/primelense_media_logo_clean.png"
                alt="PrimeLense Media"
                fill
                sizes="192px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm sm:text-xs text-neutral-300 sm:text-neutral-400 leading-relaxed font-normal">
              {siteConfig.description}
            </p>
            <div className="text-xs sm:text-[11px] font-mono text-white/70 sm:text-white/50 space-y-1 pt-1 font-medium sm:font-normal">
              <p>Registered: {siteConfig.legalName}</p>
              <p>RC Number: {siteConfig.registrationNumber}</p>
              <p>{siteConfig.office.coordinates}</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-xs sm:text-xs font-mono uppercase tracking-widest text-white/70 sm:text-white/50 mb-4 font-bold">
              Quick Links
            </h4>
            <ul className="space-y-3 sm:space-y-2.5 text-sm sm:text-xs text-neutral-300 sm:text-neutral-400 font-medium sm:font-normal">
              {primaryMenu.map((m) => (
                <li key={m.id}>
                  <a
                    href={m.href}
                    className="hover:text-white transition-colors"
                  >
                    {m.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div className="md:col-span-1">
            <h4 className="text-xs sm:text-xs font-mono uppercase tracking-widest text-white/70 sm:text-white/50 mb-4 font-bold">
              Our Services
            </h4>
            <ul className="space-y-3 sm:space-y-2.5 text-sm sm:text-xs text-neutral-300 sm:text-neutral-400 font-medium sm:font-normal">
              {servicesList.map((service, i) => (
                <li key={i}>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="md:col-span-1 space-y-3">
            <h4 className="text-xs sm:text-xs font-mono uppercase tracking-widest text-white/70 sm:text-white/50 mb-4 font-bold">
              Connect With Us
            </h4>
            <div className="space-y-3 sm:space-y-2 text-sm sm:text-xs text-neutral-200 sm:text-neutral-400 font-medium sm:font-normal">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
                <span>{siteConfig.phoneNumbers[0]}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-cyan-400 shrink-0" />
                <span>{siteConfig.email}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-tight">Oyodu Berger, Lagos</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-3">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/70 hover:text-white"
              >
                Instagram
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/70 hover:text-white"
              >
                Facebook
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/70 hover:text-white"
              >
                YouTube
              </a>
              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/70 hover:text-white"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-mono">
          <p>© {new Date().getFullYear()} PrimeLense Media Ltd. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  )
}
