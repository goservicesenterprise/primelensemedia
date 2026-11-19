'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { observer } from 'mobx-react-lite'
import Header from '@/components/shared/header/Header'
import HeroSection from '@/components/hero/HeroSection'
import AboutSection from '@/components/about/AboutSection'
import ServicesOverview from '@/components/services/ServicesOverview'
import StudioDesignSection from '@/components/studio/StudioDesignSection'
import WorkShowcaseSection from '@/components/work/WorkShowcaseSection'
import ShowreelSection from '@/components/showreel/ShowreelSection'
import WhyChooseUsSection from '@/components/process/WhyChooseUsSection'
import WhoWeWorkWithSection from '@/components/about/WhoWeWorkWithSection'
import TestimonialSection from '@/components/testimonials/TestimonialSection'
import ContactAndEnquirySection from '@/components/contact/ContactAndEnquirySection'
import ConsultationDrawer from '@/components/consultation/ConsultationDrawer'
import FloatingWhatsApp from '@/components/shared/ui/FloatingWhatsApp'
import Footer from '@/components/shared/footer/Footer'
import { themeStore } from '@/store/theme.store'
import { CMSProvider } from '@/components/shared/context/CMSContext'
import { SectionContent } from '@/types/admin'

const StudioScene = dynamic(() => import('@/components/canvas/StudioScene'), {
  ssr: false,
})

interface Props {
  initialSections: Record<string, SectionContent>
}

const HomePageClient = observer(function HomePageClient({ initialSections }: Props) {
  const [sections, setSections] = useState<Record<string, SectionContent>>(initialSections)
  const { currentDiscipline } = themeStore
  const accentHex = currentDiscipline?.accentHex || '#8B0A1A'

  // Refetch latest content from API on mount to guarantee fresh client updates
  useEffect(() => {
    fetch('/api/admin?resource=sections')
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data.data) {
          setSections((prev) => ({ ...prev, ...data.data }))
        }
      })
      .catch(() => {
        // Fallback to initialSections
      })
  }, [])

  return (
    <CMSProvider sections={sections}>
      <main
        className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black transition-colors duration-1000 overflow-x-hidden"
        style={
          {
            '--current-accent': accentHex,
          } as React.CSSProperties
        }
      >
        {/* 3D Three.js Studio Scene */}
        <StudioScene />

        {/* Dynamic Header */}
        <Header />

        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Company Profile & Overview */}
        <AboutSection />

        {/* 3. 7 Core Services Directory */}
        <ServicesOverview />

        {/* 4. Studio Design & Custom Fabrication Feature */}
        <StudioDesignSection />

        {/* 5. Featured Work & Portfolio */}
        <WorkShowcaseSection />

        {/* 6. Official Showreel Experience */}
        <ShowreelSection />

        {/* 7. Why Choose Us & 5-Step Process */}
        <WhyChooseUsSection />

        {/* 7b. Who We Work With */}
        <WhoWeWorkWithSection />

        {/* 8. Client Testimonials & Endorsements */}
        <TestimonialSection />

        {/* 9. Dedicated Enquiry & Contact Section */}
        <ContactAndEnquirySection />

        {/* 10. Comprehensive Corporate Footer */}
        <Footer />

        {/* Floating WhatsApp Quick Action Button */}
        <FloatingWhatsApp />

        {/* Quick Interactive Project Consultation Drawer */}
        <ConsultationDrawer />
      </main>
    </CMSProvider>
  )
})

export default HomePageClient
