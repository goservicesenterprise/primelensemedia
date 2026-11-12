import React from 'react'
import Link from 'next/link'
import {
  Inbox,
  MessageSquareQuote,
  FileText,
  Clock,
  ArrowUpRight,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Eye,
} from 'lucide-react'
import { getEnquiries, getTestimonials, getSections } from '@/lib/admin-store'
import { getCurrentAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const current = await getCurrentAdmin()
  if (!current) {
    redirect('/admin/login')
  }

  const enquiries = getEnquiries()
  const testimonials = getTestimonials()
  const sections = getSections()

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length
  const featuredTestimonialsCount = testimonials.filter((t) => t.isFeatured).length
  const totalSectionsCount = Object.keys(sections).length

  const recentEnquiries = enquiries.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-400 font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Executive Studio Command</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Real-time briefing pipeline, testimonial management, and live site content controls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/enquiries"
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs tracking-wide transition-all shadow-lg shadow-red-600/30 inline-flex items-center gap-1.5"
          >
            <Inbox className="w-4 h-4" />
            <span>Review Enquiries</span>
          </Link>
          <Link
            href="/admin/cms"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wide transition-all border border-white/10 inline-flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Edit Sections</span>
          </Link>
        </div>
      </div>

      {/* Basic Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Enquiries */}
        <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">Total Enquiries</span>
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{enquiries.length}</div>
          <div className="mt-2 text-xs text-neutral-400 flex items-center gap-1">
            <span className="text-red-400 font-semibold">{newEnquiriesCount} new</span> awaiting response
          </div>
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
        </div>

        {/* Card 2: New Actionable Leads */}
        <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">Pending Bookings</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{newEnquiriesCount}</div>
          <div className="mt-2 text-xs text-neutral-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-red-400" />
            <span>Updated in real time</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
        </div>

        {/* Card 3: Testimonials */}
        <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">Client Testimonials</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{testimonials.length}</div>
          <div className="mt-2 text-xs text-neutral-400">
            <span className="text-white font-semibold">{featuredTestimonialsCount}</span> featured on home
          </div>
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
        </div>

        {/* Card 4: CMS Sections */}
        <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">CMS Sections</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{totalSectionsCount}</div>
          <div className="mt-2 text-xs text-neutral-400">
            Rich-Text & OpenGraph Enabled
          </div>
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
        </div>
      </div>

      {/* Main Grid: Recent Enquiries & Quick CMS Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Enquiries List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Recent Client Enquiries</h2>
              <p className="text-xs text-neutral-400">Latest consultations and production briefs.</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>View All ({enquiries.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-900/60 overflow-hidden shadow-xl">
            {recentEnquiries.length === 0 ? (
              <div className="p-8 text-center text-neutral-500 text-sm">
                <Inbox className="w-8 h-8 mx-auto mb-2 opacity-40 text-red-400" />
                <p>No enquiries recorded yet.</p>
                <p className="text-xs text-neutral-600 mt-1">Form submissions from the site will appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {recentEnquiries.map((item) => (
                  <div key={item.id} className="p-4 sm:p-5 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{item.fullName}</span>
                        {item.organization && (
                          <span className="text-xs text-neutral-400 font-normal">
                            • {item.organization}
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border font-semibold ${
                            item.status === 'new'
                              ? 'bg-red-500/10 border-red-500/30 text-red-400'
                              : item.status === 'in-progress'
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-300 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-neutral-400">{item.email}</span>
                        {item.phone && <span className="text-neutral-500">| {item.phone}</span>}
                        <span className="text-red-400 font-mono text-[11px] font-medium">
                          {item.service}
                        </span>
                        {item.budget && (
                          <span className="text-neutral-400 font-mono text-[11px]">
                            Budget: {item.budget}
                          </span>
                        )}
                      </div>
                      {item.projectScope && (
                        <p className="text-xs text-neutral-400 line-clamp-1 italic mt-1">
                          "{item.projectScope}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <span className="text-[11px] font-mono text-neutral-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                      <Link
                        href="/admin/enquiries"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: CMS Quick Links & Testimonial Spotlights */}
        <div className="lg:col-span-4 space-y-6">
          {/* CMS Sections Quick View */}
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">CMS Sections</h3>
              <Link href="/admin/cms" className="text-xs text-red-400 hover:text-red-300 font-semibold">
                Manage
              </Link>
            </div>
            <div className="space-y-2 text-xs">
              {Object.values(sections).map((sec) => (
                <div
                  key={sec.id}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:bg-white/[0.04] transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-semibold text-white truncate">{sec.title}</p>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">{sec.id}</span>
                  </div>
                  <Link
                    href={`/admin/cms?section=${sec.id}`}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-600 text-neutral-300 hover:text-white transition-colors shrink-0"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Quick View */}
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Active Testimonials</h3>
              <Link href="/admin/testimonials" className="text-xs text-red-400 hover:text-red-300 font-semibold">
                All ({testimonials.length})
              </Link>
            </div>
            <div className="space-y-3">
              {testimonials.slice(0, 2).map((test) => (
                <div key={test.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{test.author}</span>
                    <span className="text-[10px] font-mono text-red-400 uppercase font-semibold">
                      {test.rating}★
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 italic">
                    "{test.content}"
                  </p>
                  <span className="text-[10px] text-neutral-500 block">{test.company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
