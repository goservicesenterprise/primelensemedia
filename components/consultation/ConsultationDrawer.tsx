'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { consultationStore } from '@/store/consultation.store'
import { consultationSchema, ConsultationFormValues } from '@/schemas/consultation.schema'
import { useToast } from '@/hooks/notifications/useToast'
import { siteConfig } from '@/config/site'
import {
  X,
  Sparkles,
  CheckCircle2,
  Calendar,
  FileText,
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Link as LinkIcon,
  Layers,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  MessageSquare,
} from 'lucide-react'
import AppButton from '@/components/shared/ui/AppButton'
import confetti from 'canvas-confetti'

const PRODUCTION_STAGES = [
  {
    id: 'pre-production',
    label: 'Pre-Production',
    detail: 'Concept & creative direction, scriptwriting, storyboards, location scouting, casting & scheduling',
  },
  {
    id: 'production',
    label: 'Production (Filming & Fabrication)',
    detail: 'Full camera crew, 4K/6K cinema kit, lighting, drone footage, on-set direction or studio construction',
  },
  {
    id: 'post-production',
    label: 'Post-Production',
    detail: 'Story editing, ACES color grading, sound design & mastering, review rounds & multi-platform cuts',
  },
]

const PROJECT_TYPES = [
  'Brand & Commercial Ads',
  'Documentary & Narrative Film',
  'Television & Talk Show Production',
  'Podcast Production (Audio + Video)',
  'Corporate Profile & Internal Video',
  'Event Production / Coverage',
  'Turnkey Studio Design & Fabrication',
  'Social Media Content Package (Reels/TikTok)',
  'Creative Consultation & Tech Blueprint',
]

const BUDGET_RANGES = [
  'Under ₦1,500,000 / $1,000 / £800',
  '₦1,500,000 – ₦5,000,000 / $1k–$3.5k / £800–£2.8k',
  '₦5,000,000 – ₦15,000,000 / $3.5k–$10k / £2.8k–£8k',
  '₦15,000,000+ / $10k+ / £8k+ (Comprehensive)',
  'Flexible / Open to Recommendation',
]

const ConsultationDrawer = observer(function ConsultationDrawer() {
  const { isOpen, activeConfig } = consultationStore
  const { promise } = useToast()
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      service: activeConfig?.title || 'Media Production',
      shootType: 'Brand & Commercial Ads',
      stages: ['pre-production', 'production', 'post-production'],
      location: 'Lagos, Nigeria',
      timeline: 'Next 30 Days',
      budget: '₦1,500,000 – ₦5,000,000 / $1k–$3.5k / £800–£2.8k',
      referenceLinks: '',
      projectScope: '',
    },
  })

  const selectedStages = watch('stages') || []

  // Sync active discipline when store updates
  useEffect(() => {
    if (activeConfig) {
      setValue('service', activeConfig.title)
    }
  }, [activeConfig, setValue])

  const toggleStage = (stageId: string) => {
    if (selectedStages.includes(stageId)) {
      setValue(
        'stages',
        selectedStages.filter((s) => s !== stageId)
      )
    } else {
      setValue('stages', [...selectedStages, stageId])
    }
  }

  const onSubmit = async (data: ConsultationFormValues) => {
    const submitTask = new Promise((resolve) => setTimeout(resolve, 1400))

    await promise(submitTask, {
      loading: 'Securing director availability & creating itemised brief...',
      success: `Brief received! Our executive producer will send an itemised quote to ${data.email} within 24 hours.`,
      error: `Unable to submit at this moment. Please WhatsApp us at ${siteConfig.whatsapp.number}.`,
    })

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      })
    } catch {
      // ignore
    }

    reset()
    setCurrentStep(1)
    consultationStore.close()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop Blur Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => consultationStore.close()}
          className="fixed inset-0 bg-black/85 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ y: '100%', opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0.8 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-4xl max-h-[94vh] sm:max-h-[90vh] flex flex-col bg-neutral-950 border border-white/20 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 text-white"
        >
          {/* Header */}
          <div
            className="p-6 sm:p-8 border-b border-white/15 flex items-center justify-between relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${activeConfig.ambientColor || 'rgba(107,1,11,0.2)'}, rgba(10, 10, 10, 0.98))`,
            }}
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-amber-400 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Build Your Creative Brief • Get Itemised Quote</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Tell Us About Your Project
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-medium">
                Structured like an industry production brief. Get an itemised estimate within 1 business day.
              </p>
            </div>

            <button
              onClick={() => consultationStore.close()}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all border border-white/10 shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step Progress Indicators */}
          <div className="px-6 sm:px-8 py-3 bg-black/40 border-b border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4 flex-1">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className={`flex items-center gap-2 text-xs font-mono font-bold uppercase transition-colors ${
                  currentStep === 1 ? 'text-amber-400' : 'text-white/40 hover:text-white'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[11px]">
                  1
                </span>
                <span className="hidden sm:inline">Project Type & Stages</span>
              </button>

              <span className="text-white/20">/</span>

              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className={`flex items-center gap-2 text-xs font-mono font-bold uppercase transition-colors ${
                  currentStep === 2 ? 'text-amber-400' : 'text-white/40 hover:text-white'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[11px]">
                  2
                </span>
                <span className="hidden sm:inline">Shoot Details & Scope</span>
              </button>

              <span className="text-white/20">/</span>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className={`flex items-center gap-2 text-xs font-mono font-bold uppercase transition-colors ${
                  currentStep === 3 ? 'text-amber-400' : 'text-white/40 hover:text-white'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[11px]">
                  3
                </span>
                <span className="hidden sm:inline">Contact Information</span>
              </button>
            </div>

            <span className="text-xs font-mono text-white/50 shrink-0">
              Step {currentStep} of 3
            </span>
          </div>

          {/* Form Body */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left"
          >
            {/* STEP 1: Type & Production Stages */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2">
                    1. Select Project Category *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {PROJECT_TYPES.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2.5 p-3 rounded-xl border border-white/10 bg-neutral-900/90 hover:bg-neutral-800 cursor-pointer transition-all"
                      >
                        <input
                          type="radio"
                          value={type}
                          {...register('shootType')}
                          className="text-amber-400 bg-black focus:ring-0"
                        />
                        <span className="text-xs font-semibold text-white">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2">
                    2. Production Stages Required (Select all that apply) *
                  </label>
                  <div className="space-y-2.5">
                    {PRODUCTION_STAGES.map((st) => {
                      const isChecked = selectedStages.includes(st.id)
                      return (
                        <div
                          key={st.id}
                          onClick={() => toggleStage(st.id)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                            isChecked
                              ? 'bg-amber-400/10 border-amber-400/50'
                              : 'bg-neutral-900/60 border-white/10 hover:border-white/25'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                              isChecked
                                ? 'bg-amber-400 text-black border-amber-400'
                                : 'border-white/30 bg-black'
                            }`}
                          >
                            {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white mb-0.5">{st.label}</h4>
                            <p className="text-xs text-neutral-300 font-normal leading-relaxed">
                              {st.detail}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {errors.stages && (
                    <p className="text-xs text-rose-400 mt-2 font-mono font-medium">
                      {errors.stages.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <AppButton
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={() => setCurrentStep(2)}
                    className="font-bold text-xs px-6"
                  >
                    <span>Continue to Shoot Details</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </AppButton>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Shoot Details & Brief Scope */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Shoot Location / City *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lagos (Victoria Island), Abuja, On-Location"
                      {...register('location')}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder-white/30 text-sm font-medium focus:outline-none focus:border-amber-400 transition-colors"
                    />
                    {errors.location && (
                      <p className="text-xs text-rose-400 mt-1 font-mono">{errors.location.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Shoot Date / Target Timeline *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. November 15–20, or Within 30 Days"
                      {...register('timeline')}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder-white/30 text-sm font-medium focus:outline-none focus:border-amber-400 transition-colors"
                    />
                    {errors.timeline && (
                      <p className="text-xs text-rose-400 mt-1 font-mono">{errors.timeline.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" /> Estimated Budget Range *
                  </label>
                  <select
                    {...register('budget')}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/15 text-white text-sm font-semibold focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2 flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5" /> Reference Links, Moodboards & Inspiration (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. YouTube/Vimeo links, Google Drive moodboard, or Instagram references"
                    {...register('referenceLinks')}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder-white/30 text-sm font-medium focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Project Brief & Key Requirements *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe what you need: deliverables (e.g. 60s brand film + 3 vertical reels), story concept, number of shoot days, or studio build room dimensions..."
                    {...register('projectScope')}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder-white/30 text-sm font-medium focus:outline-none focus:border-amber-400 transition-colors resize-none leading-relaxed"
                  />
                  {errors.projectScope && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">{errors.projectScope.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-1.5 text-xs font-mono uppercase text-white/60 hover:text-white"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <AppButton
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={() => setCurrentStep(3)}
                    className="font-bold text-xs px-6"
                  >
                    <span>Final Step: Your Details</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </AppButton>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Client Contact Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Adebayo Ogunlesi"
                      {...register('fullName')}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder-white/30 text-sm font-medium focus:outline-none focus:border-amber-400 transition-colors"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-400 mt-1 font-mono">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="you@organisation.com"
                      {...register('email')}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder-white/30 text-sm font-medium focus:outline-none focus:border-amber-400 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 mt-1 font-mono">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> Phone / WhatsApp Number *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 08035128084 or +234..."
                      {...register('phone')}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder-white/30 text-sm font-medium focus:outline-none focus:border-amber-400 transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-400 mt-1 font-mono">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" /> Company / Brand / Individual
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Media Ltd. or Private Client"
                      {...register('organization')}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/15 text-white placeholder-white/30 text-sm font-medium focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Direct WhatsApp Option */}
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-emerald-300">
                        Prefer Instant WhatsApp Response?
                      </h5>
                      <p className="text-[11px] text-neutral-300">
                        You can also chat directly with our executive producer right now.
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.international}?text=${encodeURIComponent(
                      siteConfig.whatsapp.defaultMessage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 transition-colors"
                  >
                    Open WhatsApp
                  </a>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-1.5 text-xs font-mono uppercase text-white/60 hover:text-white"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Scope</span>
                  </button>

                  <AppButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto font-black px-8 shadow-[0_0_35px_rgba(255,255,255,0.25)]"
                  >
                    {isSubmitting ? 'Transmitting Brief...' : 'Submit Brief & Request Itemised Quote'}
                  </AppButton>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
})

export default ConsultationDrawer
