import { Resend } from 'resend'
import { siteConfig } from '@/config/site'
import { EnquiryItem } from '@/types/admin'

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

function resolveSenderEmail(): string {
  const envFrom = process.env.RESEND_FROM_EMAIL || process.env.RESEND_FROM
  if (envFrom) {
    // If user provided a raw domain without email/angle brackets, e.g. "gosolutionsenterprise.com"
    if (!envFrom.includes('@')) {
      return `PrimeLense Media <notifications@${envFrom.trim()}>`
    }
    // If user provided "email@domain.com" without name
    if (!envFrom.includes('<') && envFrom.includes('@')) {
      return `PrimeLense Media <${envFrom.trim()}>`
    }
    return envFrom.trim()
  }
  return 'PrimeLense Media <notifications@gosolutionsenterprise.com>'
}

export const SENDER_EMAIL = resolveSenderEmail()

export const ADMIN_NOTIFICATION_EMAILS = [
  'siscorule@gmail.com',
  siteConfig.email, // primelensemediatv@gmail.com
]

const LOGO_URL = `${siteConfig.url}/primelense_media_logo_clean.png`

/**
 * 1. Admin & Internal Team Notification Template
 */
export function renderAdminNotificationEmail(enquiry: EnquiryItem): string {
  const dateFormatted = new Date().toLocaleString('en-US', {
    timeZone: 'Africa/Lagos',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Enquiry - ${enquiry.fullName}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ededed; }
    .wrapper { width: 100%; max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid #262626; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(180deg, #1f0b0e 0%, #121212 100%); padding: 36px 32px 24px; text-align: center; border-bottom: 1px solid #262626; }
    .badge { display: inline-block; padding: 4px 12px; background: rgba(220, 38, 38, 0.15); border: 1px solid rgba(220, 38, 38, 0.3); border-radius: 9999px; font-size: 11px; font-weight: 700; color: #f87171; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 14px; }
    .title { margin: 0; font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px; }
    .subtitle { margin: 8px 0 0; font-size: 13px; color: #a3a3a3; }
    .body-content { padding: 32px; }
    .grid { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .grid td { padding: 12px 14px; font-size: 13px; border-bottom: 1px solid #1f1f1f; vertical-align: top; }
    .grid td.label { width: 34%; font-weight: 600; color: #888888; text-transform: uppercase; font-size: 11px; letter-spacing: 0.8px; font-family: monospace; }
    .grid td.val { width: 66%; color: #ffffff; font-weight: 500; }
    .grid td.val a { color: #f87171; text-decoration: none; font-weight: 600; }
    .scope-box { background: #080808; border: 1px solid #262626; border-radius: 12px; padding: 18px 20px; font-size: 14px; line-height: 1.6; color: #d4d4d4; white-space: pre-wrap; margin-bottom: 28px; }
    .btn-wrap { text-align: center; margin: 30px 0 10px; }
    .btn { display: inline-block; background-color: #dc2626; color: #ffffff !important; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; }
    .footer { background-color: #080808; padding: 24px 32px; text-align: center; border-top: 1px solid #1f1f1f; font-size: 12px; color: #666666; }
    .social-links { margin: 14px 0 16px; }
    .social-links a { display: inline-block; margin: 0 8px; color: #a3a3a3; text-decoration: none; font-size: 11px; font-weight: 600; }
    .social-links a:hover { color: #ffffff; }
  </style>
</head>
<body>
  <div style="padding: 24px 12px;">
    <div class="wrapper">
      <!-- Header -->
      <div class="header">
        <a href="${siteConfig.url}" target="_blank" style="text-decoration: none;">
          <img src="${LOGO_URL}" alt="PrimeLense Media" style="max-height: 38px; width: auto; margin-bottom: 16px;" />
        </a>
        <br />
        <span class="badge">New Incoming Brief // ID: ${enquiry.id}</span>
        <h1 class="title">New Project Enquiry Received</h1>
        <p class="subtitle">Discipline: <strong style="color: #ffffff;">${enquiry.service}</strong> • ${dateFormatted}</p>
      </div>

      <!-- Main Data Table -->
      <div class="body-content">
        <table class="grid">
          <tr>
            <td class="label">Client Name</td>
            <td class="val"><strong style="font-size: 15px; color: #ffffff;">${enquiry.fullName}</strong></td>
          </tr>
          <tr>
            <td class="label">Email Address</td>
            <td class="val"><a href="mailto:${enquiry.email}">${enquiry.email}</a></td>
          </tr>
          <tr>
            <td class="label">Phone / WhatsApp</td>
            <td class="val">${enquiry.phone ? `<a href="tel:${enquiry.phone}">${enquiry.phone}</a>` : '<span style="color: #666;">Not provided</span>'}</td>
          </tr>
          <tr>
            <td class="label">Organization / Brand</td>
            <td class="val">${enquiry.organization || '<span style="color: #666;">Independent / Creator</span>'}</td>
          </tr>
          <tr>
            <td class="label">Service Scope</td>
            <td class="val"><span style="color: #f87171; font-weight: 700;">${enquiry.service}</span> ${enquiry.shootType ? `• ${enquiry.shootType}` : ''}</td>
          </tr>
          ${enquiry.budget ? `<tr><td class="label">Budget Range</td><td class="val" style="color: #34d399; font-weight: 700;">${enquiry.budget}</td></tr>` : ''}
          ${enquiry.timeline ? `<tr><td class="label">Target Timeline</td><td class="val">${enquiry.timeline}</td></tr>` : ''}
          ${enquiry.location ? `<tr><td class="label">Shoot Location</td><td class="val">${enquiry.location}</td></tr>` : ''}
          ${enquiry.referenceLinks ? `<tr><td class="label">Reference Links</td><td class="val"><a href="${enquiry.referenceLinks}" target="_blank">${enquiry.referenceLinks}</a></td></tr>` : ''}
          ${enquiry.stages && enquiry.stages.length > 0 ? `<tr><td class="label">Stages Selected</td><td class="val">${enquiry.stages.join(', ')}</td></tr>` : ''}
        </table>

        <!-- Project Scope -->
        <div style="font-size: 12px; font-weight: 700; color: #f87171; text-transform: uppercase; font-family: monospace; margin-bottom: 8px; letter-spacing: 1px;">
          Project Scope & Creative Brief:
        </div>
        <div class="scope-box">
          ${enquiry.projectScope || 'No descriptive brief was entered.'}
        </div>

        <!-- Action Button -->
        <div class="btn-wrap">
          <a href="${siteConfig.url}/admin/enquiries" class="btn" target="_blank">
            Open in Admin Dashboard &rarr;
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="social-links">
          <a href="${siteConfig.socials.instagram}" target="_blank">Instagram</a> •
          <a href="${siteConfig.socials.youtube}" target="_blank">YouTube</a> •
          <a href="${siteConfig.socials.facebook}" target="_blank">Facebook</a> •
          <a href="${siteConfig.socials.tiktok}" target="_blank">TikTok</a> •
          <a href="${siteConfig.socials.whatsapp}" target="_blank">WhatsApp</a>
        </div>
        <p style="margin: 4px 0;">${siteConfig.legalName} • ${siteConfig.registrationNumber}</p>
        <p style="margin: 4px 0; color: #555;">${siteConfig.office.address}</p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * 2. Client Auto-Responder Confirmation Email Template
 */
export function renderClientConfirmationEmail(enquiry: EnquiryItem): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Received Your Creative Brief - PrimeLense Media</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ededed; }
    .wrapper { width: 100%; max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid #262626; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(180deg, #1f0b0e 0%, #121212 100%); padding: 40px 32px 28px; text-align: center; border-bottom: 1px solid #262626; }
    .badge { display: inline-block; padding: 4px 12px; background: rgba(220, 38, 38, 0.15); border: 1px solid rgba(220, 38, 38, 0.3); border-radius: 9999px; font-size: 11px; font-weight: 700; color: #f87171; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 14px; }
    .title { margin: 0; font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2; }
    .body-content { padding: 32px; font-size: 15px; line-height: 1.65; color: #d4d4d4; }
    .highlight-card { background: #080808; border: 1px solid #262626; border-left: 4px solid #dc2626; border-radius: 12px; padding: 20px 22px; margin: 24px 0; }
    .steps-list { margin: 24px 0 28px; padding-left: 20px; }
    .steps-list li { margin-bottom: 12px; color: #e5e5e5; }
    .steps-list strong { color: #ffffff; }
    .btn-wrap { text-align: center; margin: 32px 0 16px; }
    .btn { display: inline-block; background-color: #25D366; color: #ffffff !important; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px; }
    .footer { background-color: #080808; padding: 28px 32px; text-align: center; border-top: 1px solid #1f1f1f; font-size: 12px; color: #666666; }
    .social-links { margin: 16px 0 16px; }
    .social-links a { display: inline-block; margin: 0 8px; color: #a3a3a3; text-decoration: none; font-size: 11px; font-weight: 600; }
  </style>
</head>
<body>
  <div style="padding: 24px 12px;">
    <div class="wrapper">
      <!-- Header -->
      <div class="header">
        <a href="${siteConfig.url}" target="_blank" style="text-decoration: none;">
          <img src="${LOGO_URL}" alt="PrimeLense Media" style="max-height: 38px; width: auto; margin-bottom: 16px;" />
        </a>
        <br />
        <span class="badge">Brief Confirmation</span>
        <h1 class="title">Thank You, ${enquiry.fullName.split(' ')[0]}.<br/><span style="color: #f87171; font-weight: 700;">Your Project Brief is in Good Hands.</span></h1>
      </div>

      <!-- Content -->
      <div class="body-content">
        <p>Dear ${enquiry.fullName},</p>
        <p>
          We have successfully received your project details for <strong>${enquiry.service}</strong>. Our executive production team and technical directors are currently reviewing your specifications and timeline.
        </p>

        <!-- Brief Snapshot Card -->
        <div class="highlight-card">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #f87171; font-family: monospace; letter-spacing: 1px; margin-bottom: 6px;">
            Brief Reference ID: ${enquiry.id}
          </div>
          <p style="margin: 0; font-size: 14px; color: #ffffff;">
            <strong>Discipline:</strong> ${enquiry.service}
          </p>
          ${enquiry.budget ? `<p style="margin: 4px 0 0; font-size: 13px; color: #a3a3a3;"><strong>Budget:</strong> ${enquiry.budget}</p>` : ''}
          ${enquiry.timeline ? `<p style="margin: 4px 0 0; font-size: 13px; color: #a3a3a3;"><strong>Target Timeline:</strong> ${enquiry.timeline}</p>` : ''}
        </div>

        <h3 style="font-size: 16px; font-weight: 800; color: #ffffff; margin-top: 24px; margin-bottom: 8px;">
          What Happens Next:
        </h3>
        <ol class="steps-list">
          <li><strong>Director Review:</strong> Our producer inspects your shoot scale, technical requirements, and acoustic or camera package needs.</li>
          <li><strong>Itemised Proposal:</strong> You will receive a tailored creative quote and schedule directly to this email within 24 hours.</li>
          <li><strong>Kickoff Call:</strong> We can schedule a video discovery call or studio consultation at our Lagos headquarters.</li>
        </ol>

        <p>
          Need urgent director availability or immediate technical answers? You can chat with our Executive Producer directly on WhatsApp:
        </p>

        <div class="btn-wrap">
          <a href="https://wa.me/${siteConfig.whatsapp.international}?text=Hello%20PrimeLense%20Media,%20I%20just%20submitted%20a%20project%20brief%20(Ref:%20${enquiry.id})." class="btn" target="_blank">
            💬 Chat with Producer on WhatsApp
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p style="font-weight: 700; color: #ffffff; margin: 0 0 4px;">Follow PrimeLense Media</p>
        <p style="margin: 0 0 10px; font-size: 11px; color: #777;">Stories worth telling. Productions worth watching.</p>
        <div class="social-links">
          <a href="${siteConfig.socials.instagram}" target="_blank">Instagram</a> •
          <a href="${siteConfig.socials.youtube}" target="_blank">YouTube</a> •
          <a href="${siteConfig.socials.facebook}" target="_blank">Facebook</a> •
          <a href="${siteConfig.socials.tiktok}" target="_blank">TikTok</a> •
          <a href="${siteConfig.socials.linkedin}" target="_blank">LinkedIn</a>
        </div>
        <p style="margin: 8px 0 2px;">${siteConfig.legalName} • ${siteConfig.registrationNumber}</p>
        <p style="margin: 0; color: #555;">${siteConfig.office.address}</p>
        <p style="margin: 8px 0 0; font-size: 11px; color: #444;">
          Direct Office Lines: ${siteConfig.phoneNumbers.join(' / ')} • ${siteConfig.email}
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * Helper to dispatch both emails via Resend
 */
export async function sendEnquiryEmails(enquiry: EnquiryItem): Promise<{
  adminSent: boolean
  clientSent: boolean
  errors?: string[]
}> {
  const errors: string[] = []
  let adminSent = false
  let clientSent = false

  const resend = getResendClient()
  if (!resend) {
    console.warn('[Resend] RESEND_API_KEY is not set in environment. Skipping email dispatch.')
    return { adminSent: false, clientSent: false, errors: ['RESEND_API_KEY is not configured'] }
  }

  // 1. Send Admin Notification to siscorule@gmail.com and company email
  try {
    const adminHtml = renderAdminNotificationEmail(enquiry)
    const adminRes = await resend.emails.send({
      from: SENDER_EMAIL,
      to: ADMIN_NOTIFICATION_EMAILS,
      subject: `🚨 [New Project Brief] ${enquiry.fullName} - ${enquiry.service}`,
      html: adminHtml,
      replyTo: enquiry.email,
    })

    if (adminRes.error) {
      errors.push(`Admin email error: ${adminRes.error.message}`)
      console.error('[Resend] Error sending admin notification:', adminRes.error)
    } else {
      adminSent = true
    }
  } catch (err: any) {
    errors.push(`Admin email exception: ${err.message}`)
    console.error('[Resend] Admin email exception:', err)
  }

  // 2. Send Client Confirmation Email
  try {
    const clientHtml = renderClientConfirmationEmail(enquiry)
    const clientRes = await resend.emails.send({
      from: SENDER_EMAIL,
      to: enquiry.email,
      subject: `🎬 We Received Your Brief: ${enquiry.service} - PrimeLense Media`,
      html: clientHtml,
      replyTo: siteConfig.email,
    })

    if (clientRes.error) {
      errors.push(`Client email error: ${clientRes.error.message}`)
      console.error('[Resend] Error sending client confirmation:', clientRes.error)
    } else {
      clientSent = true
    }
  } catch (err: any) {
    errors.push(`Client email exception: ${err.message}`)
    console.error('[Resend] Client email exception:', err)
  }

  return { adminSent, clientSent, errors: errors.length > 0 ? errors : undefined }
}
