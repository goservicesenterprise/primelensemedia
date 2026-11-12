'use client'

import React, { createContext, useContext } from 'react'
import { SectionContent } from '@/types/admin'

const CMSContext = createContext<Record<string, SectionContent>>({})

export function CMSProvider({
  sections,
  children,
}: {
  sections: Record<string, SectionContent>
  children: React.ReactNode
}) {
  return <CMSContext.Provider value={sections}>{children}</CMSContext.Provider>
}

export function useSection(id: string): SectionContent | undefined {
  const sections = useContext(CMSContext)
  return sections[id]
}
