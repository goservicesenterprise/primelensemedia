'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { observer } from 'mobx-react-lite'
import Header from '@/components/shared/header/Header'
import HeroSection from '@/components/hero/HeroSection'
import CameraHUD from '@/components/hud/CameraHUD'
import AboutSection from '@/components/about/AboutSection'
import ServicesOverview from '@/components/services/ServicesOverview'
import StudioDesignSection from '@/components/studio/StudioDesignSection'
import WorkShowcaseSection from '@/components/work/WorkShowcaseSection'
import ShowreelSection from '@/components/showreel/ShowreelSection'
import WhyChooseUsSection from '@/components/process/WhyChooseUsSection'
import ContactAndEnquirySection from '@/components/contact/ContactAndEnquirySection'
import ConsultationDrawer from '@/components/consultation/ConsultationDrawer'
import FloatingWhatsApp from '@/components/shared/ui/FloatingWhatsApp'
import Footer from '@/components/shared/footer/Footer'
import { themeStore } from '@/store/theme.store'

// Load 3D Studio Canvas dynamically on client side
const StudioScene = dynamic(() => import('@/components/canvas/StudioScene'), {
  ssr: false,
})

const HomePage = observer(function HomePage() {
  const { currentDiscipline } = themeStore
  const accentHex = currentDiscipline?.accentHex || '#8B0A1A'

  return (
    <main
      className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black transition-colors duration-1000 overflow-x-hidden"
      style={
        {
          '--current-accent': accentHex,
        } as React.CSSProperties
      }
    >
      {/* 3D Three.js Studio Scene (Interactive Lens & Ambient Particles) */}
      <StudioScene />

      {/* Floating Cinema HUD Layer */}
      {/* <CameraHUD /> */}

      {/* Dynamic Header with Clean Logo & Responsive Mobile Menu */}
      <Header />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Company Profile & Overview */}
      <AboutSection />

      {/* 3. 7 Core Services Directory */}
      <ServicesOverview />

      {/* 4. Studio Design & Turnkey Fabrication Feature */}
      <StudioDesignSection />

      {/* 5. Featured Work & Portfolio */}
      <WorkShowcaseSection />

      {/* 6. Official Showreel Experience */}
      <ShowreelSection />

      {/* 7. Why Choose Us & 5-Step Process */}
      <WhyChooseUsSection />

      {/* 8. Dedicated Enquiry & Contact Section */}
      <ContactAndEnquirySection />

      {/* 9. Comprehensive Corporate Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Quick Interactive Project Consultation Drawer */}
      <ConsultationDrawer />
    </main>
  )
})

export default HomePage
