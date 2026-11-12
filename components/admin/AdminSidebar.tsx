'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  MessageSquareQuote,
  Inbox,
  FileText,
  ExternalLink,
  Film,
  Menu,
  X,
  Sparkles,
  LogOut,
} from 'lucide-react'
import { logoutAction } from '@/lib/auth-actions'

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/enquiries', label: 'Enquiries & Bookings', icon: Inbox },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/admin/cms', label: 'CMS & Sections', icon: FileText },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-white/10 sticky top-0 z-50">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold">
            <Film className="w-4 h-4" />
          </div>
          <span className="font-bold text-white text-sm">PrimeLense Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Desktop & Mobile drawer */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-neutral-950 border-r border-white/10 flex flex-col justify-between p-4 transition-transform duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Brand header */}
          <div className="flex items-center gap-3 px-2 py-3 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-900/50">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">PrimeLense Media</h2>
              <span className="text-[11px] font-mono text-red-400 font-semibold tracking-wider uppercase">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer info & Return to site */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-red-400 font-bold uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engine Status</span>
            </div>
            <p className="text-[11px] text-neutral-400">Next.js 16 • Turbo Actions Ready</p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 text-xs font-medium transition-all"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-red-600/10 border border-red-600/20 text-red-400 hover:bg-red-600 hover:text-white text-xs font-medium transition-all"
            >
              <span>Sign Out</span>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
        />
      )}
    </>
  )
}
