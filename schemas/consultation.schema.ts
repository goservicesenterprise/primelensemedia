import { z } from 'zod'

export const consultationSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone / WhatsApp number'),
  organization: z.string().default(''),
  service: z.string().min(1, 'Please select a primary service'),
  shootType: z.string().default('Corporate & Brand Video Production'),
  stages: z.array(z.string()).default(['production']),
  location: z.string().default('Lagos, Nigeria'),
  timeline: z.string().default('Next 30 Days'),
  budget: z.string().default('₦1,500,000 – ₦5,000,000 / $1k–$3.5k / £800–£2.8k'),
  referenceLinks: z.string().default(''),
  projectScope: z.string().min(3, 'Please describe what you need or project inspiration'),
})

export type ConsultationFormValues = z.infer<typeof consultationSchema>
