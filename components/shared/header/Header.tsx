'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { themeStore } from '@/store/theme.store'
import { consultationStore } from '@/store/consultation.store'
import { primaryMenu } from '@/config/menus/primary-menu'
import { siteConfig } from '@/config/site'
import Image from 'next/image'
import { Menu, X, Sparkles, MessageSquare, Phone } from 'lucide-react'
import AppButton from '@/components/shared/ui/AppButton'

const Header = observer(function Header() {
  const { currentDiscipline } = themeStore
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className="fixed top-3 sm:top-5 inset-x-0 z-40 flex justify-center px-3 sm:px-6 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4 pointer-events-auto">
          {/* Brand Logo: Clean transparent presentation with NO enclosing box or pill border */}
          <a
            href="#"
            className="flex items-center transition-transform duration-300 hover:scale-105 active:scale-95 group focus:outline-none"
            aria-label={`${siteConfig.name} Home`}
          >
            <div className="relative h-11 sm:h-14 w-44 sm:w-56 flex items-center justify-start">
              <Image
                src="/primelense_media_logo_clean.png"
                alt="PrimeLense Media"
                fill
                priority
                sizes="(max-width: 640px) 176px, 224px"
                className="object-contain object-left drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
              />
            </div>
          </a>

          {/* Central Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
            {primaryMenu.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative px-3.5 py-1.5 rounded-full text-xs font-medium text-white/70 hover:text-white transition-all duration-300"
              >
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Action Controls & Global CTA */}
          <div className="flex items-center gap-2">
            {/* Direct WhatsApp Quick Contact */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp.international}?text=${encodeURIComponent(
                siteConfig.whatsapp.defaultMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-all"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Start a Project Trigger */}
            <AppButton
              variant="glass"
              size="sm"
              onClick={() => consultationStore.open(currentDiscipline.id)}
              className="border-white/20 hover:border-white/50 text-xs font-semibold shadow-lg shadow-black/50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xs:inline">Start a Project</span>
              <span className="xs:hidden">Enquire</span>
            </AppButton>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 text-white/90 hover:text-white transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-3 top-20 z-40 lg:hidden p-6 rounded-3xl bg-neutral-950/95 backdrop-blur-2xl border border-white/15 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                  Navigation
                </span>
                <span className="text-xs text-amber-400 font-mono">
                  {siteConfig.registrationNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {primaryMenu.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-sm font-medium text-white/90 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href={`tel:${siteConfig.phoneNumbers[0]}`}
                  className="flex items-center gap-2 text-xs text-white/70 hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{siteConfig.phoneNumbers[0]}</span>
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.international}?text=${encodeURIComponent(
                    siteConfig.whatsapp.defaultMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp ({siteConfig.whatsapp.number})</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

export default Header
