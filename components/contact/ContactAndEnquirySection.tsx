'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { siteConfig } from '@/config/site'
import { useToast } from '@/hooks/notifications/useToast'
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  Calendar,
  FileText,
  User,
  Building2,
  Link as LinkIcon,
  DollarSign,
} from 'lucide-react'
import AppButton from '@/components/shared/ui/AppButton'
import confetti from 'canvas-confetti'

interface ContactFormInputs {
  name: string
  company: string
  email: string
  phone: string
  service: string
  location: string
  budget: string
  timeline: string
  referenceLinks: string
  message: string
}

export default function ContactAndEnquirySection() {
  const { promise } = useToast()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({
    defaultValues: {
      service: 'Media Production',
      location: 'Lagos, Nigeria',
      budget: '₦1,500,000 – ₦5,000,000',
      timeline: 'Next 30 Days',
    },
  })

  const onSubmit = async (data: ContactFormInputs) => {
    const task = new Promise((resolve) => setTimeout(resolve, 1200))
    await promise(task, {
      loading: 'Transmitting brief to PrimeLense Media team...',
      success: 'Enquiry received! Our executive producer will send an itemised quote shortly.',
      error: `Could not send message. Please reach us directly on WhatsApp or at ${siteConfig.email}.`,
    })

    try {
      confetti({ particleCount: 70, spread: 50, origin: { y: 0.7 } })
    } catch {
      // ignore
    }

    setSubmitted(true)
    reset()
  }

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 md:px-12 bg-neutral-950 border-t border-white/10 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Start a Project • Contact Us</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-3xl mb-4 leading-tight">
            Have an Idea? Let's Bring It to Life.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-medium max-w-2xl leading-relaxed">
            Tell us about your shoot, production, or studio project. We'll prepare an itemised quote and tailored creative roadmap.
          </p>
        </div>

        {/* Contact Information & Enquiry Form */}
        <div id="start-a-project" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Company Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-white/10 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  Registered Enterprise
                </span>
                <h3 className="text-2xl font-black text-white">
                  {siteConfig.legalName}
                </h3>
                <p className="text-xs text-white/60 font-mono font-medium">
                  Registration No: {siteConfig.registrationNumber}
                </p>
              </div>

              {/* Direct Booking & Production Steps */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                  How Booking Works
                </span>
                <ul className="space-y-2.5 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-white shrink-0">1.</span>
                    <span><strong>Tell us about the shoot:</strong> Share your timeline, services, deliverables, and references.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-white shrink-0">2.</span>
                    <span><strong>Get your quote:</strong> Receive an itemised estimate within 1 business day.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-white shrink-0">3.</span>
                    <span><strong>Plan & shoot / build:</strong> We lock details, coordinate crew/fabrication, and execute.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-white shrink-0">4.</span>
                    <span><strong>Review & deliver:</strong> You send notes, and we deliver finished masters or turnkey handover.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 pt-1">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-amber-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-white/50 font-bold">Office Address</h4>
                    <p className="text-sm text-neutral-200 leading-relaxed font-semibold">
                      {siteConfig.office.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-white/50 font-bold">Phone Numbers</h4>
                    <p className="text-sm text-neutral-200 font-semibold">
                      {siteConfig.phoneNumbers.join(' / ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-white/50 font-bold">Direct Email</h4>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm text-neutral-200 hover:text-white font-semibold hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-rose-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-white/50 font-bold">Operating Hours</h4>
                    <p className="text-sm text-neutral-200 font-semibold">
                      {siteConfig.operatingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300">
                    Instant WhatsApp Enquiry
                  </span>
                </div>
                <p className="text-xs text-neutral-200 mb-3 font-medium">
                  Need quick availability, day rates, or urgent studio booking?
                </p>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.international}?text=${encodeURIComponent(
                    siteConfig.whatsapp.defaultMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-colors shadow-lg shadow-emerald-950"
                >
                  Chat with Executive Producer ({siteConfig.whatsapp.number})
                </a>
              </div>
            </div>
          </div>

          {/* Project Enquiry Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/70 border border-white/15 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    Thank You for Contacting PrimeLense Media!
                  </h3>
                  <p className="text-sm text-neutral-200 max-w-md mx-auto leading-relaxed font-medium">
                    We have received your project enquiry. Our executive team will review your specifications and send an itemised quote within 24 hours.
                  </p>
                  <AppButton
                    variant="glass"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 font-bold"
                  >
                    Submit Another Request
                  </AppButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="border-b border-white/10 pb-4 mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                      Project Brief
                    </span>
                    <h3 className="text-2xl font-black text-white">Tell Us About the Shoot</h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
                      Fill out your requirements below to receive a custom itemised quote.
                    </p>
                  </div>

                  {/* Name and Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" /> Full Name *
                      </label>
                      <input
                        {...register('name', { required: true })}
                        placeholder="e.g. Adebayo Ogunlesi"
                        className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white text-sm font-semibold placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1.5 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" /> Company / Organisation
                      </label>
                      <input
                        {...register('company')}
                        placeholder="e.g. Apex Media Ltd. or Private Client"
                        className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white text-sm font-semibold placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email', { required: true })}
                        placeholder="you@organisation.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white text-sm font-semibold placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> Phone / WhatsApp *
                      </label>
                      <input
                        {...register('phone', { required: true })}
                        placeholder="e.g. 08035128084"
                        className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white text-sm font-semibold placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Service Category & Shoot Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1.5">
                        Service Category *
                      </label>
                      <select
                        {...register('service')}
                        className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white text-sm font-bold focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="Media Production">Media Production (Documentary, Corporate, Events)</option>
                        <option value="Television & Studio Production">Television & Studio Production</option>
                        <option value="Podcast Production">Podcast Production (Audio + 4K Video)</option>
                        <option value="Content Creation">Content Creation (Reels, TikTok, YouTube)</option>
                        <option value="Commercial & Advertising">Commercial & Advertising Production (TVC)</option>
                        <option value="Studio Design & Fabrication">Studio Design & Fabrication (Turnkey)</option>
                        <option value="Media Consultation">Media Consultation & Creative Direction</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> Shoot Location / City *
                      </label>
                      <input
                        {...register('location', { required: true })}
                        placeholder="e.g. Lagos (VI, Lekki), Abuja, On-Location"
                        className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white text-sm font-semibold placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Estimated Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1.5 flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5" /> Estimated Budget
                      </label>
                      <select
                        {...register('budget')}
                        className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white text-sm font-semibold focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="Under ₦1,500,000">Under ₦1,500,000</option>
                        <option value="₦1,500,000 – ₦5,000,000">₦1,500,000 – ₦5,000,000</option>
                        <option value="₦5,000,000 – ₦15,000,000">₦5,000,000 – ₦15,000,000</option>
                        <option value="₦15,000,000+">₦15,000,000+ (Full Production)</option>
                        <option value="Flexible">Flexible / Open to Quote</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Shoot Date / Target Timeline
                      </label>
                      <input
                        {...register('timeline')}
                        placeholder="e.g. Next Month, or Specific Date"
                        className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white text-sm font-semibold placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Reference Links & Inspiration */}
                  <div>
                    <label className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1.5 flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5" /> Reference Links & Inspiration (Optional)
                    </label>
                    <input
                      {...register('referenceLinks')}
                      placeholder="e.g. Links to YouTube, Vimeo, Google Drive moodboards, or Instagram styles"
                      className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white text-sm font-medium placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1.5 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> Tell Us What You Need *
                    </label>
                    <textarea
                      rows={4}
                      {...register('message', { required: true })}
                      placeholder="Describe what you need: target deliverables (e.g. 1 main brand video + 3 vertical cuts), story concept, desired styling, or studio room dimensions..."
                      className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white text-sm font-medium placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors resize-none leading-relaxed"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <AppButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full font-black text-sm shadow-[0_0_30px_rgba(255,255,255,0.25)] py-4"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    <span>{isSubmitting ? 'Transmitting Brief...' : 'Submit Brief & Request Itemised Quote'}</span>
                  </AppButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
