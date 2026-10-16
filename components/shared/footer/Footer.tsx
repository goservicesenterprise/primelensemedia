'use client'

import React from 'react'
import { siteConfig } from '@/config/site'
import { consultationStore } from '@/store/consultation.store'
import { primaryMenu } from '@/config/menus/primary-menu'
import { Disc, Sparkles, MapPin, ArrowUpRight } from 'lucide-react'
import AppButton from '@/components/shared/ui/AppButton'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-neutral-950 border-t border-white/10 pt-20 pb-12 px-6 md:px-12 text-white overflow-hidden z-20">
      <div className="max-w-6xl mx-auto">
        {/* Top Callout Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-neutral-900/80 to-neutral-950 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Worldwide Availability</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Ready to command the room?
            </h3>
            <p className="text-sm text-neutral-400 max-w-xl">
              Initiate a tailored consultation for feature film direction, modular brand content, set architecture, or podcast studio builds.
            </p>
          </div>

          <AppButton
            variant="primary"
            size="lg"
            onClick={() => consultationStore.open('filmmaking')}
            className="shrink-0 font-semibold text-sm shadow-[0_0_35px_rgba(255,255,255,0.25)]"
          >
            Schedule Session
          </AppButton>
        </div>

        {/* Global Studio Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-16 border-b border-white/10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center">
                <Disc className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-sm tracking-tight">
                PRIMELENSE<span className="font-light text-white/50">MEDIA</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              {siteConfig.tagline}
            </p>
            <p className="text-[10px] font-mono text-white/40">
              {siteConfig.coordinates}
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
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

          <div className="md:col-span-1">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">
              Studio Network
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400">
              {siteConfig.studios.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-white/50 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">{s.city}</span>
                    <p className="text-[10px] text-white/40">{s.location} ({s.timezone})</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">
              Social Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {Object.entries(siteConfig.socials).map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors capitalize flex items-center gap-1 group"
                  >
                    <span>{name}</span>
                    <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-white transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-mono">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Back to top [▲]</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
