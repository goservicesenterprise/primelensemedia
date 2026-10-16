'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { observer } from 'mobx-react-lite'
import Header from '@/components/shared/header/Header'
import HeroSection from '@/components/hero/HeroSection'
import CameraHUD from '@/components/hud/CameraHUD'
import DisciplineSection from '@/components/services/DisciplineSection'
import ConsultationDrawer from '@/components/consultation/ConsultationDrawer'
import Footer from '@/components/shared/footer/Footer'
import { DISCIPLINES, DISCIPLINE_KEYS } from '@/config/disciplines'
import { themeStore } from '@/store/theme.store'

// Load 3D Studio Canvas dynamically on client side
const StudioScene = dynamic(() => import('@/components/canvas/StudioScene'), {
  ssr: false,
})

const HomePage = observer(function HomePage() {
  const { currentDiscipline } = themeStore

  return (
    <main
      className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black transition-colors duration-1000 overflow-x-hidden"
      style={
        {
          '--current-accent': currentDiscipline.accentHex,
        } as React.CSSProperties
      }
    >
      {/* 3D Three.js Studio Scene (Interactive Lens & Ambient Particles) */}
      <StudioScene />

      {/* Floating Cinema HUD Layer */}
      <CameraHUD />

      {/* Dynamic Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* 5 Elaborate Discipline Chapters */}
      <div className="relative z-10">
        {DISCIPLINE_KEYS.map((key, index) => (
          <DisciplineSection
            key={key}
            config={DISCIPLINES[key]}
            index={index}
          />
        ))}
      </div>

      {/* Footer */}
      <Footer />

      {/* Full-Screen Apple Keynote Consultation Drawer */}
      <ConsultationDrawer />
    </main>
  )
})

export default HomePage
