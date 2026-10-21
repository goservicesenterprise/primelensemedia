import { z } from 'zod'

export const consultationSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone / WhatsApp number'),
  organization: z.string(),
  service: z.string().min(1, 'Please select a primary service'),
  shootType: z.string().min(1, 'Please select project category'),
  stages: z.array(z.string()).min(1, 'Select at least one production stage'),
  location: z.string().min(2, 'Please specify shoot location or city'),
  timeline: z.string().min(1, 'Please specify shoot date or target timeline'),
  budget: z.string().min(1, 'Please select budget range'),
  referenceLinks: z.string(),
  projectScope: z.string().min(10, 'Please describe what you need, deliverables, or inspiration'),
})

export type ConsultationFormValues = z.infer<typeof consultationSchema>
