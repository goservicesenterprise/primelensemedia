import { ensureDbInitialized } from '@/lib/sqlite-db'
import { EnquiryItem, TestimonialItem, SectionContent } from '@/types/admin'

// --- ENQUIRIES ---
export async function getEnquiries(): Promise<EnquiryItem[]> {
  const db = await ensureDbInitialized()
  const res = await db.execute('SELECT * FROM enquiries ORDER BY created_at DESC')
  return res.rows.map((r: any) => ({
    id: r.id,
    type: r.type,
    fullName: r.full_name,
    email: r.email,
    phone: r.phone || undefined,
    organization: r.organization || undefined,
    service: r.service,
    shootType: r.shoot_type || undefined,
    budget: r.budget || undefined,
    timeline: r.timeline || undefined,
    location: r.location || undefined,
    projectScope: r.project_scope || undefined,
    referenceLinks: r.reference_links || undefined,
    stages: r.stages ? JSON.parse(r.stages) : undefined,
    status: r.status,
    notes: r.notes || undefined,
    createdAt: r.created_at,
  }))
}

export async function saveEnquiry(
  enquiry: Omit<EnquiryItem, 'id' | 'createdAt' | 'status'> & { status?: EnquiryItem['status'] }
): Promise<EnquiryItem> {
  const db = await ensureDbInitialized()
  const id = `enq-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
  const createdAt = new Date().toISOString()
  const status = enquiry.status || 'new'

  await db.execute({
    sql: `
      INSERT INTO enquiries (
        id, type, full_name, email, phone, organization, service, shoot_type,
        budget, timeline, location, project_scope, reference_links, stages, status, notes, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      id,
      enquiry.type,
      enquiry.fullName,
      enquiry.email,
      enquiry.phone || null,
      enquiry.organization || null,
      enquiry.service,
      enquiry.shootType || null,
      enquiry.budget || null,
      enquiry.timeline || null,
      enquiry.location || null,
      enquiry.projectScope || null,
      enquiry.referenceLinks || null,
      enquiry.stages ? JSON.stringify(enquiry.stages) : null,
      status,
      enquiry.notes || null,
      createdAt,
    ],
  })

  return {
    ...enquiry,
    id,
    status,
    createdAt,
  }
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryItem['status'],
  notes?: string
): Promise<EnquiryItem | null> {
  const db = await ensureDbInitialized()
  if (notes !== undefined) {
    await db.execute({
      sql: 'UPDATE enquiries SET status = ?, notes = ? WHERE id = ?',
      args: [status, notes, id],
    })
  } else {
    await db.execute({
      sql: 'UPDATE enquiries SET status = ? WHERE id = ?',
      args: [status, id],
    })
  }

  const res = await db.execute({
    sql: 'SELECT * FROM enquiries WHERE id = ?',
    args: [id],
  })
  const updated = res.rows[0] as any
  if (!updated) return null

  return {
    id: updated.id,
    type: updated.type,
    fullName: updated.full_name,
    email: updated.email,
    phone: updated.phone || undefined,
    organization: updated.organization || undefined,
    service: updated.service,
    shootType: updated.shoot_type || undefined,
    budget: updated.budget || undefined,
    timeline: updated.timeline || undefined,
    location: updated.location || undefined,
    projectScope: updated.project_scope || undefined,
    referenceLinks: updated.reference_links || undefined,
    stages: updated.stages ? JSON.parse(updated.stages) : undefined,
    status: updated.status,
    notes: updated.notes || undefined,
    createdAt: updated.created_at,
  }
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const db = await ensureDbInitialized()
  const res = await db.execute({
    sql: 'DELETE FROM enquiries WHERE id = ?',
    args: [id],
  })
  return (res.rowsAffected || 0) > 0
}

// --- TESTIMONIALS ---
export async function getTestimonials(): Promise<TestimonialItem[]> {
  const db = await ensureDbInitialized()
  const res = await db.execute('SELECT * FROM testimonials ORDER BY created_at DESC')
  return res.rows.map((r: any) => ({
    id: r.id,
    author: r.author,
    role: r.role,
    company: r.company,
    avatarUrl: r.avatar_url || undefined,
    content: r.content,
    rating: Number(r.rating || 5),
    serviceTag: r.service_tag,
    isFeatured: Boolean(r.is_featured),
    createdAt: r.created_at,
  }))
}

export async function saveTestimonial(data: Omit<TestimonialItem, 'id' | 'createdAt'>): Promise<TestimonialItem> {
  const db = await ensureDbInitialized()
  const id = `test-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
  const createdAt = new Date().toISOString()

  await db.execute({
    sql: `
      INSERT INTO testimonials (
        id, author, role, company, avatar_url, content, rating, service_tag, is_featured, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      id,
      data.author,
      data.role,
      data.company,
      data.avatarUrl || null,
      data.content,
      data.rating,
      data.serviceTag,
      data.isFeatured ? 1 : 0,
      createdAt,
    ],
  })

  return { ...data, id, createdAt }
}

export async function updateTestimonial(
  id: string,
  data: Partial<Omit<TestimonialItem, 'id' | 'createdAt'>>
): Promise<TestimonialItem | null> {
  const db = await ensureDbInitialized()
  const existingRes = await db.execute({
    sql: 'SELECT * FROM testimonials WHERE id = ?',
    args: [id],
  })
  const existing = existingRes.rows[0] as any
  if (!existing) return null

  const author = data.author ?? existing.author
  const role = data.role ?? existing.role
  const company = data.company ?? existing.company
  const avatarUrl = data.avatarUrl !== undefined ? data.avatarUrl : existing.avatar_url
  const content = data.content ?? existing.content
  const rating = data.rating ?? existing.rating
  const serviceTag = data.serviceTag ?? existing.service_tag
  const isFeatured = data.isFeatured !== undefined ? (data.isFeatured ? 1 : 0) : existing.is_featured

  await db.execute({
    sql: `
      UPDATE testimonials
      SET author = ?, role = ?, company = ?, avatar_url = ?, content = ?, rating = ?, service_tag = ?, is_featured = ?
      WHERE id = ?
    `,
    args: [author, role, company, avatarUrl, content, rating, serviceTag, isFeatured, id],
  })

  return {
    id,
    author,
    role,
    company,
    avatarUrl: avatarUrl || undefined,
    content,
    rating,
    serviceTag,
    isFeatured: Boolean(isFeatured),
    createdAt: existing.created_at,
  }
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const db = await ensureDbInitialized()
  const res = await db.execute({
    sql: 'DELETE FROM testimonials WHERE id = ?',
    args: [id],
  })
  return (res.rowsAffected || 0) > 0
}

// --- CMS SECTIONS ---
export async function getSections(): Promise<Record<string, SectionContent>> {
  const db = await ensureDbInitialized()
  const res = await db.execute('SELECT * FROM sections')
  const result: Record<string, SectionContent> = {}

  for (const r of res.rows as any[]) {
    result[r.id] = {
      id: r.id,
      title: r.title,
      badge: r.badge || undefined,
      tagline: r.tagline || undefined,
      highlightText: r.highlight_text || undefined,
      description: r.description || undefined,
      richTextHtml: r.rich_text_html || undefined,
      mediaType: (r.media_type as any) || 'image',
      mediaSource: (r.media_source as any) || 'cloudinary',
      mediaUrl: r.media_url || undefined,
      mediaPoster: r.media_poster || undefined,
      ctaPrimaryLabel: r.cta_primary_label || undefined,
      ctaPrimaryLink: r.cta_primary_link || undefined,
      ctaSecondaryLabel: r.cta_secondary_label || undefined,
      ctaSecondaryLink: r.cta_secondary_link || undefined,
      ogTitle: r.og_title || undefined,
      ogDescription: r.og_description || undefined,
      ogImage: r.og_image || undefined,
      metadata: r.metadata ? JSON.parse(r.metadata) : undefined,
      updatedAt: r.updated_at,
    }
  }

  return result
}

export async function getSectionById(id: string): Promise<SectionContent | null> {
  const db = await ensureDbInitialized()
  const res = await db.execute({
    sql: 'SELECT * FROM sections WHERE id = ?',
    args: [id],
  })
  const r = res.rows[0] as any
  if (!r) return null

  return {
    id: r.id,
    title: r.title,
    badge: r.badge || undefined,
    tagline: r.tagline || undefined,
    highlightText: r.highlight_text || undefined,
    description: r.description || undefined,
    richTextHtml: r.rich_text_html || undefined,
    mediaType: (r.media_type as any) || 'image',
    mediaSource: (r.media_source as any) || 'cloudinary',
    mediaUrl: r.media_url || undefined,
    mediaPoster: r.media_poster || undefined,
    ctaPrimaryLabel: r.cta_primary_label || undefined,
    ctaPrimaryLink: r.cta_primary_link || undefined,
    ctaSecondaryLabel: r.cta_secondary_label || undefined,
    ctaSecondaryLink: r.cta_secondary_link || undefined,
    ogTitle: r.og_title || undefined,
    ogDescription: r.og_description || undefined,
    ogImage: r.og_image || undefined,
    metadata: r.metadata ? JSON.parse(r.metadata) : undefined,
    updatedAt: r.updated_at,
  }
}

export async function saveSection(section: SectionContent): Promise<SectionContent> {
  const db = await ensureDbInitialized()
  const updatedAt = new Date().toISOString()

  await db.execute({
    sql: `
      INSERT INTO sections (
        id, title, badge, tagline, highlight_text, description, rich_text_html,
        media_type, media_source, media_url, media_poster,
        cta_primary_label, cta_primary_link, cta_secondary_label, cta_secondary_link,
        og_title, og_description, og_image, metadata, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        title = excluded.title,
        badge = excluded.badge,
        tagline = excluded.tagline,
        highlight_text = excluded.highlight_text,
        description = excluded.description,
        rich_text_html = excluded.rich_text_html,
        media_type = excluded.media_type,
        media_source = excluded.media_source,
        media_url = excluded.media_url,
        media_poster = excluded.media_poster,
        cta_primary_label = excluded.cta_primary_label,
        cta_primary_link = excluded.cta_primary_link,
        cta_secondary_label = excluded.cta_secondary_label,
        cta_secondary_link = excluded.cta_secondary_link,
        og_title = excluded.og_title,
        og_description = excluded.og_description,
        og_image = excluded.og_image,
        metadata = excluded.metadata,
        updated_at = excluded.updated_at
    `,
    args: [
      section.id,
      section.title,
      section.badge || null,
      section.tagline || null,
      section.highlightText || null,
      section.description || null,
      section.richTextHtml || null,
      section.mediaType || 'image',
      section.mediaSource || 'cloudinary',
      section.mediaUrl || null,
      section.mediaPoster || null,
      section.ctaPrimaryLabel || null,
      section.ctaPrimaryLink || null,
      section.ctaSecondaryLabel || null,
      section.ctaSecondaryLink || null,
      section.ogTitle || null,
      section.ogDescription || null,
      section.ogImage || null,
      section.metadata ? JSON.stringify(section.metadata) : null,
      updatedAt,
    ],
  })

  return {
    ...section,
    updatedAt,
  }
}
