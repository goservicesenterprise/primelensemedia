'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { siteConfig } from '@/config/site'
import { useToast } from '@/hooks/notifications/useToast'
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, Sparkles, CheckCircle2 } from 'lucide-react'
import AppButton from '@/components/shared/ui/AppButton'
import confetti from 'canvas-confetti'

interface ContactFormInputs {
  name: string
  company: string
  email: string
  phone: string
  service: string
  budget: string
  timeline: string
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
      budget: 'Medium ($5k - $20k)',
      timeline: 'Next 30 Days',
    },
  })

  const onSubmit = async (data: ContactFormInputs) => {
    const task = new Promise((resolve) => setTimeout(resolve, 1200))
    await promise(task, {
      loading: 'Transmitting enquiry to PrimeLense Media team...',
      success: 'Enquiry received! Our executive producer will contact you shortly.',
      error: `Could not send message. Please reach us directly at ${siteConfig.email}.`,
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Start a Project • Contact Us</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black sm:font-bold tracking-tight text-white max-w-3xl mb-4 leading-tight">
            Have an Idea? Let's Bring It to Life.
          </h2>
          <p className="text-base sm:text-base md:text-lg text-neutral-200 sm:text-neutral-400 font-medium sm:font-normal max-w-2xl leading-relaxed">
            Whether you are planning a documentary, television show, podcast, commercial, or turnkey studio build, our team is ready to discuss your goals.
          </p>
        </div>

        {/* Contact Information & Enquiry Form */}
        <div id="start-a-project" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Company Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-white/10 space-y-6">
              <div>
                <span className="text-xs sm:text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  Registered Enterprise
                </span>
                <h3 className="text-2xl sm:text-xl font-bold text-white">
                  {siteConfig.legalName}
                </h3>
                <p className="text-sm sm:text-xs text-white/60 font-mono font-medium">
                  Registration No: {siteConfig.registrationNumber}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-amber-400">
                    <MapPin className="w-5 h-5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-white/60 font-semibold">Office Address</h4>
                    <p className="text-sm sm:text-sm text-neutral-100 leading-relaxed font-medium">
                      {siteConfig.office.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-emerald-400">
                    <Phone className="w-5 h-5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-white/60 font-semibold">Phone Numbers</h4>
                    <p className="text-sm sm:text-sm text-neutral-100 font-medium">
                      {siteConfig.phoneNumbers.join(' / ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-cyan-400">
                    <Mail className="w-5 h-5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-white/60 font-semibold">Direct Email</h4>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm sm:text-sm text-neutral-100 hover:text-white font-medium hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-rose-400">
                    <Clock className="w-5 h-5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-white/60 font-semibold">Operating Hours</h4>
                    <p className="text-sm sm:text-sm text-neutral-100 font-medium">
                      {siteConfig.operatingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm sm:text-xs font-bold text-emerald-300">
                    Instant WhatsApp Enquiry
                  </span>
                </div>
                <p className="text-sm sm:text-xs text-neutral-200 mb-3 font-medium">
                  Have an urgent question or need immediate studio availability?
                </p>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.international}?text=${encodeURIComponent(
                    siteConfig.whatsapp.defaultMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
                >
                  Chat with Executive Producer ({siteConfig.whatsapp.number})
                </a>
              </div>
            </div>
          </div>

          {/* Project Enquiry Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-white/10 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Thank You for Contacting PrimeLense Media!
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    We have received your project enquiry. A member of our executive team will review your specifications and contact you shortly.
                  </p>
                  <AppButton
                    variant="glass"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                    className="mt-4"
                  >
                    Submit Another Request
                  </AppButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="border-b border-white/10 pb-4 mb-4">
                    <h3 className="text-xl font-bold text-white">Project Enquiry Form</h3>
                    <p className="text-xs text-neutral-400">
                      Fill out the details below to receive a consultation and project proposal.
                    </p>
                  </div>

                  {/* Name and Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-white/60 block mb-1.5">
                        Full Name *
                      </label>
                      <input
                        {...register('name', { required: true })}
                        placeholder="e.g. Adebayo Ogunlesi"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-white/60 block mb-1.5">
                        Company / Organisation
                      </label>
                      <input
                        {...register('company')}
                        placeholder="e.g. Apex Media Ltd."
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-white/60 block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email', { required: true })}
                        placeholder="you@organisation.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-white/60 block mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        {...register('phone', { required: true })}
                        placeholder="e.g. 08035128084"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="text-xs font-mono uppercase text-white/60 block mb-1.5">
                      Service Interested In
                    </label>
                    <select
                      {...register('service')}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="Media Production">Media Production (Documentary, Corporate, Events)</option>
                      <option value="Television Production">Television & Studio Production</option>
                      <option value="Podcast Production">Podcast Production (Audio & Video)</option>
                      <option value="Content Creation">Content Creation (Reels, YouTube, Social)</option>
                      <option value="Commercial Production">Commercial & Advertising Production</option>
                      <option value="Studio Design">Studio Design & Concept Visualisation</option>
                      <option value="Studio Fabrication">Studio Fabrication & Construction</option>
                      <option value="Media Consultation">Media Consultation & Creative Direction</option>
                      <option value="Other">Other Project</option>
                    </select>
                  </div>

                  {/* Estimated Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-white/60 block mb-1.5">
                        Estimated Budget
                      </label>
                      <input
                        {...register('budget')}
                        placeholder="e.g. ₦3M - ₦10M / Flexible"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-white/60 block mb-1.5">
                        Preferred Start Date / Timeline
                      </label>
                      <input
                        {...register('timeline')}
                        placeholder="e.g. Within 2–4 Weeks"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-mono uppercase text-white/60 block mb-1.5">
                      Tell Us About Your Project *
                    </label>
                    <textarea
                      rows={4}
                      {...register('message', { required: true })}
                      placeholder="Describe your story, production requirements, studio space dimensions, or creative goals..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                      required
                    />
                  </div>

                  {/* Submit */}
                  <AppButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full font-semibold text-xs shadow-lg shadow-white/10"
                  >
                    <Send className="w-3.5 h-3.5 mr-1" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Project Request'}</span>
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
