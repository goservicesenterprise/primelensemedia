import { z } from 'zod'

export const consultationSchema = z.object({
  fullName: z.string().min(2, 'Please provide your full name'),
  email: z.string().email('Please enter a valid business email address'),
  organization: z.string().min(2, 'Company or production entity required'),
  discipline: z.string().min(1, 'Please select a discipline'),
  timeline: z.string().min(1, 'Please select a timeline'),
  disciplineSpecificChoice: z.string().min(1, 'Please select an option for this discipline'),
  projectScope: z
    .string()
    .min(5, 'Please share brief details on location, deliverables, or desired aesthetic'),
})

export type ConsultationFormValues = z.infer<typeof consultationSchema>
