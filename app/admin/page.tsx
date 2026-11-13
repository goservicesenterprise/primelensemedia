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

  const [enquiries, testimonials, sections] = await Promise.all([
    getEnquiries(),
    getTestimonials(),
    getSections(),
  ])

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

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-colors"
          >
            <Eye className="w-4 h-4 text-neutral-400" />
            <span>View Live Site</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
          </Link>
          <Link
            href="/admin/cms"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-900/40 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Edit Sections</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link
          href="/admin/enquiries"
          className="group p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-red-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/20"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Inbox className="w-6 h-6" />
            </div>
            {newEnquiriesCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                {newEnquiriesCount} New
              </span>
            )}
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white">{enquiries.length}</div>
            <div className="text-xs text-neutral-400 font-medium mt-1">Total Project Enquiries</div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 group-hover:text-blue-400 transition-colors">
            <span>Manage pipeline</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/admin/enquiries"
          className="group p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-red-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/20"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider">
              Pending
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white">{newEnquiriesCount}</div>
            <div className="text-xs text-neutral-400 font-medium mt-1">Awaiting Review</div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 group-hover:text-amber-400 transition-colors">
            <span>Review submissions</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/admin/testimonials"
          className="group p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-red-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/20"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <MessageSquareQuote className="w-6 h-6" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
              {featuredTestimonialsCount} Active
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white">{testimonials.length}</div>
            <div className="text-xs text-neutral-400 font-medium mt-1">Client Testimonials</div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 group-hover:text-emerald-400 transition-colors">
            <span>Manage reviews</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/admin/cms"
          className="group p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-red-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/20"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <FileText className="w-6 h-6" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-mono font-bold uppercase tracking-wider">
              Live
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white">{totalSectionsCount}</div>
            <div className="text-xs text-neutral-400 font-medium mt-1">Configured Sections</div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 group-hover:text-red-400 transition-colors">
            <span>Open CMS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* Recent Enquiries & Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Enquiries */}
        <div className="lg:col-span-2 rounded-2xl bg-neutral-900/60 border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Recent Project Briefs</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Latest submissions from website consultation and booking forms.
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-mono text-red-400 hover:text-red-300 uppercase tracking-wider flex items-center gap-1"
            >
              <span>View All ({enquiries.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 text-xs">
              No enquiries recorded yet. Submissions from the website will appear here in real-time.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {recentEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">{enq.fullName}</span>
                      {enq.organization && (
                        <span className="text-xs text-neutral-400">· {enq.organization}</span>
                      )}
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                          enq.status === 'new'
                            ? 'bg-blue-500/20 text-blue-400'
                            : enq.status === 'reviewed'
                            ? 'bg-amber-500/20 text-amber-400'
                            : enq.status === 'in-progress'
                            ? 'bg-purple-500/20 text-purple-400'
                            : enq.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                      <span>{enq.service}</span>
                      {enq.budget && <span>· Budget: {enq.budget}</span>}
                      {enq.location && <span>· {enq.location}</span>}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-mono text-neutral-500 block">
                      {new Date(enq.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <Link
                      href="/admin/enquiries"
                      className="text-xs text-red-400 hover:text-red-300 font-medium inline-block mt-0.5"
                    >
                      Open details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Quick Status & Info */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-neutral-900/60 border border-white/10 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-400" />
              <span>Platform Health & Status</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-neutral-400">Database Engine</span>
                <span className="font-mono text-emerald-400 font-semibold">SQLite / LibSQL</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-neutral-400">Cloud Storage</span>
                <span className="font-mono text-emerald-400 font-semibold">Cloudinary Active</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-neutral-400">Email Notifications</span>
                <span className="font-mono text-emerald-400 font-semibold">Resend Configured</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-neutral-400">CMS Dynamic Sync</span>
                <span className="font-mono text-emerald-400 font-semibold">Live Mode</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-red-950/40 to-neutral-900/60 border border-red-500/20 p-6 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
              Tip for Administrators
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              When updating website copy or images in the <strong>CMS Section Manager</strong>, changes propagate instantly to the live landing page without requiring a redeployment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
