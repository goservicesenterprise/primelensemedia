'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { consultationStore } from '@/store/consultation.store'
import { consultationSchema, ConsultationFormValues } from '@/schemas/consultation.schema'
import { useToast } from '@/hooks/notifications/useToast'
import { X, CheckCircle, Sparkles, Building2, Calendar, FileText, User, Mail } from 'lucide-react'
import AppButton from '@/components/shared/ui/AppButton'
import confetti from 'canvas-confetti'

const ConsultationDrawer = observer(function ConsultationDrawer() {
  const { isOpen, activeConfig } = consultationStore
  const { promise } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      discipline: activeConfig.id,
      timeline: 'Next 30–60 Days',
      disciplineSpecificChoice: activeConfig.customInquiryFields.options[0],
      fullName: '',
      email: '',
      organization: '',
      projectScope: '',
    },
  })

  // Sync active discipline when store updates
  useEffect(() => {
    if (activeConfig) {
      setValue('discipline', activeConfig.id)
      setValue('disciplineSpecificChoice', activeConfig.customInquiryFields.options[0])
    }
  }, [activeConfig, setValue])

  const onSubmit = async (data: ConsultationFormValues) => {
    const submitTask = new Promise((resolve) => setTimeout(resolve, 1400))

    await promise(submitTask, {
      loading: 'Securing director availability & registering inquiry...',
      success: `Consultation confirmed! Our executive producer will contact ${data.email} within 24 hours.`,
      error: 'Unable to schedule at this moment. Please email studio@primelensemedia.com.',
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
    consultationStore.close()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-hidden">
        {/* Backdrop Blur Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => consultationStore.close()}
          className="fixed inset-0 bg-black/80 backdrop-blur-2xl"
        />

        {/* Apple Keynote Style Drawer Modal */}
        <motion.div
          initial={{ y: '100%', opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0.8 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] flex flex-col bg-neutral-950 border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10"
        >
          {/* Drawer Header with Dynamic Discipline Gradient */}
          <div
            className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${activeConfig.ambientColor}, rgba(10, 10, 10, 0.95))`,
            }}
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-amber-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Direct Consultation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Book {activeConfig.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                Direct engagement with our London & Paris creative directors and technical leads.
              </p>
            </div>

            <button
              onClick={() => consultationStore.close()}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content Body */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left"
          >
            {/* Discipline-Specific Inquiry Options */}
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10">
              <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-3">
                {activeConfig.customInquiryFields.questionLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeConfig.customInquiryFields.options.map((option, idx) => (
                  <label
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-black/40 hover:bg-white/5 cursor-pointer transition-all"
                  >
                    <input
                      type="radio"
                      value={option}
                      {...register('disciplineSpecificChoice')}
                      className="mt-1 text-white bg-black focus:ring-0"
                    />
                    <span className="text-xs font-medium text-white/90">{option}</span>
                  </label>
                ))}
              </div>
              {errors.disciplineSpecificChoice && (
                <p className="text-xs text-red-400 mt-2 font-mono">
                  {errors.disciplineSpecificChoice.message}
                </p>
              )}
            </div>

            {/* Client Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Elena Rostova"
                  {...register('fullName')}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-400 mt-1 font-mono">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Business Email
                </label>
                <input
                  type="email"
                  placeholder="elena@vanguardgroup.com"
                  {...register('email')}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1 font-mono">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Company / Studio Entity
                </label>
                <input
                  type="text"
                  placeholder="Vanguard Luxury / Independent Production"
                  {...register('organization')}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
                {errors.organization && (
                  <p className="text-xs text-red-400 mt-1 font-mono">{errors.organization.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Production Timeline
                </label>
                <select
                  {...register('timeline')}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                >
                  <option value="Immediate (Within 14 Days)">Immediate (Within 14 Days)</option>
                  <option value="Next 30–60 Days">Next 30–60 Days</option>
                  <option value="Upcoming Quarter (Q3/Q4)">Upcoming Quarter (Q3/Q4)</option>
                  <option value="Long-Term Strategic Advisory">Long-Term Strategic Advisory</option>
                </select>
              </div>
            </div>

            {/* Project Scope & Location Details */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Project Brief & Key Requirements
              </label>
              <textarea
                rows={3}
                placeholder={activeConfig.customInquiryFields.placeholder}
                {...register('projectScope')}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40 transition-colors resize-none"
              />
              {errors.projectScope && (
                <p className="text-xs text-red-400 mt-1 font-mono">{errors.projectScope.message}</p>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-white/40 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Zero obligation inquiry. NDA available upon request.
              </span>

              <AppButton
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                className="w-full sm:w-auto font-semibold px-8"
                style={{
                  boxShadow: `0 0 25px ${activeConfig.accentHex}40`,
                }}
              >
                Submit Consultation Request
              </AppButton>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
})

export default ConsultationDrawer
