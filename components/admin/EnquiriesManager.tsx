'use client'

import React, { useState, useTransition } from 'react'
import {
  Inbox,
  Filter,
  CheckCircle2,
  Clock,
  Archive,
  Trash2,
  Mail,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  ExternalLink,
  ChevronDown,
} from 'lucide-react'
import { EnquiryItem } from '@/types/admin'
import { updateEnquiryStatusAction, deleteEnquiryAction } from '@/lib/admin-actions'

interface Props {
  initialEnquiries: EnquiryItem[]
}

export default function EnquiriesManager({ initialEnquiries }: Props) {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(initialEnquiries)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(
    initialEnquiries[0] || null
  )
  const [notesInput, setNotesInput] = useState<string>(
    initialEnquiries[0]?.notes || ''
  )
  const [isPending, startTransition] = useTransition()

  const filtered = enquiries.filter((e) => {
    if (statusFilter === 'all') return true
    return e.status === statusFilter
  })

  const handleSelect = (item: EnquiryItem) => {
    setSelectedEnquiry(item)
    setNotesInput(item.notes || '')
  }

  const handleStatusChange = (id: string, newStatus: EnquiryItem['status']) => {
    startTransition(async () => {
      const res = await updateEnquiryStatusAction(id, newStatus, notesInput)
      if (res.success && res.item) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? res.item! : item))
        )
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry(res.item)
        }
      }
    })
  }

  const handleSaveNotes = () => {
    if (!selectedEnquiry) return
    startTransition(async () => {
      const res = await updateEnquiryStatusAction(
        selectedEnquiry.id,
        selectedEnquiry.status,
        notesInput
      )
      if (res.success && res.item) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === selectedEnquiry.id ? res.item! : item))
        )
        setSelectedEnquiry(res.item)
      }
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this enquiry?')) return
    startTransition(async () => {
      const res = await deleteEnquiryAction(id)
      if (res.success) {
        const nextList = enquiries.filter((e) => e.id !== id)
        setEnquiries(nextList)
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry(nextList[0] || null)
          setNotesInput(nextList[0]?.notes || '')
        }
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Enquiries & Bookings Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Review client consultation requests, stage pipelines, budget allocations, and contact briefs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-neutral-900/80 p-1.5 rounded-xl border border-white/10 text-xs">
          {['all', 'new', 'reviewed', 'in-progress', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                statusFilter === st
                  ? 'bg-red-600 text-white font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List */}
        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-neutral-900/50 overflow-hidden shadow-xl max-h-[750px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-10 text-center text-neutral-500">
              <Inbox className="w-10 h-10 mx-auto mb-2 opacity-30 text-red-400" />
              <p className="text-sm font-semibold">No enquiries found</p>
              <p className="text-xs text-neutral-600 mt-1">Check back once clients submit the consultation drawer or contact forms.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filtered.map((item) => {
                const isSelected = selectedEnquiry?.id === item.id
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-red-950/30 border-l-4 border-l-red-500 pl-3'
                        : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-white text-sm truncate">{item.fullName}</span>
                      <span
                        className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border font-bold ${
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

                    <p className="text-xs text-neutral-300 font-medium truncate mb-1">
                      {item.service} {item.shootType ? `• ${item.shootType}` : ''}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                      <span>{item.email}</span>
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right Column: Detailed Inspector */}
        <div className="lg:col-span-7">
          {selectedEnquiry ? (
            <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-6 space-y-6 shadow-2xl backdrop-blur-md">
              {/* Top Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block mb-1">
                    Enquiry ID: {selectedEnquiry.id}
                  </span>
                  <h2 className="text-xl font-black text-white">{selectedEnquiry.fullName}</h2>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedEnquiry.status}
                    disabled={isPending}
                    onChange={(e) =>
                      handleStatusChange(
                        selectedEnquiry.id,
                        e.target.value as EnquiryItem['status']
                      )
                    }
                    className="bg-neutral-950 border border-white/20 text-white text-xs rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-red-500"
                  >
                    <option value="new">Status: New</option>
                    <option value="reviewed">Status: Reviewed</option>
                    <option value="in-progress">Status: In Progress</option>
                    <option value="completed">Status: Completed</option>
                    <option value="archived">Status: Archived</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDelete(selectedEnquiry.id)}
                    className="p-2 rounded-xl bg-red-600/10 border border-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <Mail className="w-4 h-4 text-red-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-neutral-500 block text-[10px] uppercase font-mono">Email</span>
                    <a href={`mailto:${selectedEnquiry.email}`} className="text-white hover:underline truncate block">
                      {selectedEnquiry.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <Phone className="w-4 h-4 text-red-400 shrink-0" />
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-mono">Phone / WhatsApp</span>
                    <span className="text-white">{selectedEnquiry.phone || 'Not provided'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <Building2 className="w-4 h-4 text-red-400 shrink-0" />
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-mono">Organization</span>
                    <span className="text-white">{selectedEnquiry.organization || 'Independent'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-mono">Location</span>
                    <span className="text-white">{selectedEnquiry.location || 'Lagos, Nigeria'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <DollarSign className="w-4 h-4 text-red-400 shrink-0" />
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-mono">Budget</span>
                    <span className="text-white font-mono">{selectedEnquiry.budget || 'Custom estimate'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <Calendar className="w-4 h-4 text-red-400 shrink-0" />
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-mono">Timeline</span>
                    <span className="text-white">{selectedEnquiry.timeline || 'Flexible'}</span>
                  </div>
                </div>
              </div>

              {/* Scope & Message */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-red-400 font-bold block">
                  Project Scope & Brief
                </span>
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-sm text-neutral-200 leading-relaxed min-h-[80px] whitespace-pre-wrap">
                  {selectedEnquiry.projectScope || 'No detailed brief submitted.'}
                </div>
              </div>

              {/* Reference Links if any */}
              {selectedEnquiry.referenceLinks && (
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase text-neutral-400 font-bold block">
                    Reference Links / Moodboard
                  </span>
                  <p className="text-xs font-mono text-red-400 underline break-all">
                    {selectedEnquiry.referenceLinks}
                  </p>
                </div>
              )}

              {/* Production Stages */}
              {selectedEnquiry.stages && selectedEnquiry.stages.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-neutral-400 font-bold block">
                    Selected Production Stages
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedEnquiry.stages.map((st) => (
                      <span
                        key={st}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-200 font-mono"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Internal Producer Notes */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-red-400 font-bold">
                    Internal Producer Notes
                  </span>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    disabled={isPending}
                    className="text-xs text-white bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Record quotes sent, call schedules, meeting summaries, or director notes..."
                  rows={3}
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl border border-white/10 bg-neutral-900/40 text-center text-neutral-500">
              <p>Select an enquiry from the left to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
