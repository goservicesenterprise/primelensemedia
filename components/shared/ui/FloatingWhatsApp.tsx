'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.international}?text=${encodeURIComponent(
    siteConfig.whatsapp.defaultMessage
  )}`

  return (
    <motion.aside
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.4, type: 'spring' }}
      className="fixed bottom-6 right-6 z-40"
      aria-label="Contact options"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-950/80 border border-emerald-400/30 transition-all duration-300 hover:scale-105 active:scale-95"
        title="Chat with PrimeLense Media on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageSquare className="w-5 h-5 fill-white text-emerald-600 group-hover:rotate-6 transition-transform" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          Chat With Us
        </span>
      </a>
    </motion.aside>
  )
}
