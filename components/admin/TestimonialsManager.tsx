'use client'

import React, { useState, useTransition } from 'react'
import {
  MessageSquareQuote,
  Plus,
  Trash2,
  Edit2,
  Star,
  Sparkles,
  Check,
  X,
} from 'lucide-react'
import { TestimonialItem } from '@/types/admin'
import {
  createTestimonialAction,
  updateTestimonialAction,
  deleteTestimonialAction,
} from '@/lib/admin-actions'

interface Props {
  initialTestimonials: TestimonialItem[]
}

export default function TestimonialsManager({ initialTestimonials }: Props) {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Form state
  const [author, setAuthor] = useState('')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState<number>(5)
  const [serviceTag, setServiceTag] = useState('Media Production')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isFeatured, setIsFeatured] = useState<boolean>(true)

  const resetForm = () => {
    setAuthor('')
    setRole('')
    setCompany('')
    setContent('')
    setRating(5)
    setServiceTag('Media Production')
    setAvatarUrl('')
    setIsFeatured(true)
    setIsEditing(false)
    setEditingId(null)
  }

  const handleStartCreate = () => {
    resetForm()
    setIsEditing(true)
  }

  const handleStartEdit = (t: TestimonialItem) => {
    setAuthor(t.author)
    setRole(t.role)
    setCompany(t.company)
    setContent(t.content)
    setRating(t.rating)
    setServiceTag(t.serviceTag)
    setAvatarUrl(t.avatarUrl || '')
    setIsFeatured(t.isFeatured)
    setEditingId(t.id)
    setIsEditing(true)
  }

  const handleSave = () => {
    if (!author || !content) {
      alert('Author name and testimonial content are required.')
      return
    }

    startTransition(async () => {
      if (editingId) {
        // Update
        const res = await updateTestimonialAction(editingId, {
          author,
          role,
          company,
          content,
          rating,
          serviceTag,
          avatarUrl,
          isFeatured,
        })
        if (res.success && res.item) {
          setTestimonials((prev) =>
            prev.map((item) => (item.id === editingId ? res.item! : item))
          )
          resetForm()
        }
      } else {
        // Create
        const res = await createTestimonialAction({
          author,
          role,
          company,
          content,
          rating,
          serviceTag,
          avatarUrl,
          isFeatured,
        })
        if (res.success && res.item) {
          setTestimonials((prev) => [res.item!, ...prev])
          resetForm()
        }
      }
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    startTransition(async () => {
      const res = await deleteTestimonialAction(id)
      if (res.success) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id))
        if (editingId === id) resetForm()
      }
    })
  }

  const toggleFeatured = (t: TestimonialItem) => {
    startTransition(async () => {
      const res = await updateTestimonialAction(t.id, {
        isFeatured: !t.isFeatured,
      })
      if (res.success && res.item) {
        setTestimonials((prev) =>
          prev.map((item) => (item.id === t.id ? res.item! : item))
        )
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Client Testimonials
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Publish, edit, and highlight client endorsements, executive ratings, and production reviews.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={handleStartCreate}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs tracking-wide transition-all shadow-lg shadow-red-600/30 inline-flex items-center gap-1.5 self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        )}
      </div>

      {/* Editor Modal / Inline Form */}
      {isEditing && (
        <div className="p-6 rounded-2xl border border-red-500/30 bg-neutral-900/90 backdrop-blur-md space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span>{editingId ? 'Edit Testimonial' : 'New Testimonial'}</span>
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="p-1 rounded-lg text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
                Author Full Name *
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Chief Adebayo Adeleke"
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
                Role / Title
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Head of Communications"
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
                Organization / Company
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. First Sovereign Holdings"
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
                Service Tag
              </label>
              <select
                value={serviceTag}
                onChange={(e) => setServiceTag(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
              >
                <option value="Media Production">Media Production</option>
                <option value="Live Broadcast & Events">Live Broadcast & Events</option>
                <option value="Studio Design & Acoustic Engineering">Studio Design & Acoustic Engineering</option>
                <option value="Equipment Rental">Equipment Rental</option>
                <option value="Commercial Advertising">Commercial Advertising</option>
              </select>
            </div>
            <div>
              <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
                Rating (1 - 5 Stars)
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
              >
                <option value={5}>5 Stars (Exceptional)</option>
                <option value={4}>4 Stars (Very Good)</option>
                <option value={3}>3 Stars (Satisfactory)</option>
              </select>
            </div>
            <div>
              <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
                Avatar Image URL (Optional)
              </label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://..."
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
              Testimonial Quote / Endorsement *
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What did the client say about PrimeLense Media?"
              className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded accent-red-600 w-4 h-4"
              />
              <span>Feature prominently on public website</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isPending}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors disabled:opacity-50"
              >
                {isPending ? 'Saving...' : editingId ? 'Update Review' : 'Create Review'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.length === 0 ? (
          <div className="col-span-2 p-12 text-center text-neutral-500 rounded-2xl border border-white/10 bg-neutral-900/50">
            <MessageSquareQuote className="w-10 h-10 mx-auto mb-2 opacity-30 text-red-400" />
            <p>No testimonials added yet.</p>
          </div>
        ) : (
          testimonials.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {t.avatarUrl ? (
                      <img
                        src={t.avatarUrl}
                        alt={t.author}
                        className="w-10 h-10 rounded-full object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center font-bold text-red-400 text-sm">
                        {t.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-white text-sm leading-tight">{t.author}</h3>
                      <p className="text-[11px] text-neutral-400">
                        {t.role} {t.company ? `• ${t.company}` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              {/* Bottom Tags & Controls */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-neutral-400">
                    {t.serviceTag}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleFeatured(t)}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-all ${
                      t.isFeatured
                        ? 'bg-red-500/10 border-red-500/30 text-red-400 font-bold'
                        : 'border-white/10 text-neutral-500 hover:text-white'
                    }`}
                  >
                    {t.isFeatured ? '★ Featured' : 'Not featured'}
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(t)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(t.id)}
                    className="p-1.5 rounded-lg bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
