'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { themeStore } from '@/store/theme.store'
import { consultationStore } from '@/store/consultation.store'
import { primaryMenu } from '@/config/menus/primary-menu'
import { Disc, Eye, EyeOff, Sparkles } from 'lucide-react'
import AppButton from '@/components/shared/ui/AppButton'

const Header = observer(function Header() {
  const { currentDiscipline, isHudVisible } = themeStore

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 pointer-events-auto">
        {/* Brand Logo Pill */}
        <a
          href="#"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-white/30 transition-all duration-300 group"
        >
          <div className="relative w-7 h-7 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center overflow-hidden">
            <Disc className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-700" />
            <div
              className="absolute inset-0 opacity-40 blur-xs transition-colors duration-500"
              style={{ backgroundColor: currentDiscipline.accentHex }}
            />
          </div>
          <span className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
            PRIMELENSE<span className="font-light text-white/50">MEDIA</span>
          </span>
        </a>

        {/* Central Discipline Navigation */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
          {primaryMenu.map((item) => {
            const isActive = currentDiscipline.id === item.id || (item.id === 'content' && currentDiscipline.id === 'content-creation') || (item.id === 'consultation' && currentDiscipline.id === 'media-consultation') || (item.id === 'fabrication' && currentDiscipline.id === 'set-fabrication') || (item.id === 'podcast' && currentDiscipline.id === 'podcast-brand-videos')

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDisciplinePill"
                    className="absolute inset-0 rounded-full border"
                    style={{
                      backgroundColor: `${currentDiscipline.accentHex}20`,
                      borderColor: `${currentDiscipline.accentHex}60`,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Action Controls & Global CTA */}
        <div className="flex items-center gap-2">
          {/* HUD Toggle Button */}
          <button
            onClick={() => themeStore.toggleHud()}
            className="p-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all duration-300"
            title={isHudVisible ? 'Hide Cinema HUD' : 'Show Cinema HUD'}
          >
            {isHudVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-white/40" />}
          </button>

          {/* Book Consultation Trigger */}
          <AppButton
            variant="glass"
            size="sm"
            onClick={() => consultationStore.open(currentDiscipline.id)}
            className="border-white/20 hover:border-white/50 text-xs font-semibold shadow-lg shadow-black/50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Book Consultation
          </AppButton>
        </div>
      </div>
    </header>
  )
})

export default Header
