'use client'

import React, { useState, useTransition, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  FileText,
  Save,
  Sparkles,
  Share2,
  Check,
  Eye,
  Video,
  Image as ImageIcon,
} from 'lucide-react'
import { SectionContent, MediaType, MediaSource, ShowcaseProject, CapabilityServiceItem } from '@/types/admin'
import { saveSectionAction } from '@/lib/admin-actions'
import RichTextEditor from '@/components/admin/RichTextEditor'
import MediaUploadPicker from '@/components/admin/MediaUploadPicker'
import UniversalMedia from '@/components/shared/ui/UniversalMedia'
import ShowcaseProjectsManager from '@/components/admin/ShowcaseProjectsManager'
import CapabilityServicesManager, { DEFAULT_CAPABILITY_SERVICES } from '@/components/admin/CapabilityServicesManager'
import WhyChooseItemsManager, { WhyChooseItem } from '@/components/admin/WhyChooseItemsManager'
import SectionLivePreviewModal from '@/components/admin/SectionLivePreviewModal'

interface Props {
  initialSections: Record<string, SectionContent>
}

const SECTION_DESCRIPTIONS: Record<string, { label: string; icon: string }> = {
  hero: { label: 'Hero Header & Callouts', icon: '🎬' },
  about: { label: 'Company Profile & Story', icon: '🏢' },
  mission: { label: 'Our Mission', icon: '🎯' },
  vision: { label: 'Our Vision', icon: '🔭' },
  'who-we-serve': { label: 'Who We Serve & Verticals', icon: '👥' },
  services: { label: '7 Capabilities & Services', icon: '⚙️' },
  'studio-design': { label: 'Studio Design & Custom Acoustics', icon: '🎛️' },
  'work-showcase': { label: 'Selected Promotions & Recent Works', icon: '📽️' },
  showreel: { label: 'Official Showreel Experience', icon: '🎞️' },
  'why-choose-us': { label: 'Why Choose Us & 5-Step Process', icon: '🛡️' },
  'who-we-work-with': { label: 'Who We Work With & Callout', icon: '🤝' },
}

export default function CMSSectionManager({ initialSections }: Props) {
  const searchParams = useSearchParams()
  const defaultKey = searchParams.get('section') || 'hero'

  const [sections, setSections] = useState<Record<string, SectionContent>>(initialSections)
  const [activeSectionId, setActiveSectionId] = useState<string>(
    initialSections[defaultKey] ? defaultKey : Object.keys(initialSections)[0] || 'hero'
  )
  const [isPending, startTransition] = useTransition()
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Current active form model
  const current = sections[activeSectionId] || {
    id: activeSectionId,
    title: '',
    badge: '',
    tagline: '',
    highlightText: '',
    description: '',
    richTextHtml: '',
    mediaType: 'image' as MediaType,
    mediaSource: 'cloudinary' as MediaSource,
    mediaUrl: '',
    mediaPoster: '',
    ctaPrimaryLabel: '',
    ctaPrimaryLink: '',
    ctaSecondaryLabel: '',
    ctaSecondaryLink: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    updatedAt: new Date().toISOString(),
  }

  const [formData, setFormData] = useState<SectionContent>(current)

  // Sync when active section tab changes
  useEffect(() => {
    if (sections[activeSectionId]) {
      setFormData(sections[activeSectionId])
    }
  }, [activeSectionId, sections])

  const handleChange = (field: keyof SectionContent, val: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: val,
    }))
    setSaveSuccess(false)
  }

  const handleSave = () => {
    startTransition(async () => {
      const res = await saveSectionAction(formData)
      if (res.success && res.item) {
        setSections((prev) => ({
          ...prev,
          [activeSectionId]: res.item!,
        }))
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Section CMS & Content Hub
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Edit every headline, badge, highlighted phrase, description, button, and image/video (via Cloudinary, YouTube, or Local).
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs tracking-wide transition-all shadow-lg shadow-red-600/30 inline-flex items-center gap-2 self-start sm:self-center disabled:opacity-50"
        >
          {saveSuccess ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Saved & Published Live!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isPending ? 'Publishing...' : 'Save & Publish Live'}</span>
            </>
          )}
        </button>
      </div>

      {/* Section Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {Object.keys(sections).map((key) => {
          const meta = SECTION_DESCRIPTIONS[key] || { label: key, icon: '📄' }
          const active = activeSectionId === key
          return (
            <button
              key={key}
              onClick={() => setActiveSectionId(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                active
                  ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border-white/10 hover:bg-white/5'
              }`}
            >
              <span>{meta.icon}</span>
              <span>{meta.label}</span>
            </button>
          )
        })}
      </div>

      {/* Main CMS Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Core Fields, Media Picker & Rich Text */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-5 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block mb-0.5">
                  Section ID: {activeSectionId}
                </span>
                <h2 className="text-base font-bold text-white">
                  Headlines, Text & Content Copy
                </h2>
              </div>
              <span className="text-[11px] font-mono text-neutral-500">
                Last modified: {new Date(formData.updatedAt || Date.now()).toLocaleDateString()}
              </span>
            </div>

            {/* Title & Highlight Text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
                  Section Headline / Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. Ideas in Motion."
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-white font-semibold text-sm focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
                  Highlighted / Italic Phrase (Accent Colored)
                </label>
                <input
                  type="text"
                  value={formData.highlightText || ''}
                  onChange={(e) => handleChange('highlightText', e.target.value)}
                  placeholder="e.g. Spaces with Purpose."
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-white font-semibold text-sm focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Pill Badge & Subheading Tagline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
                  Top Pill Badge Text
                </label>
                <input
                  type="text"
                  value={formData.badge || ''}
                  onChange={(e) => handleChange('badge', e.target.value)}
                  placeholder="e.g. Creative Media Production & Studio Solutions"
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
                  Subheading / Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline || ''}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  placeholder="e.g. From Script to Master Deliverable"
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Summary Description / Lead Paragraph */}
            <div className="text-xs">
              <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
                Lead Paragraph / Description
              </label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Descriptive text..."
                className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-red-500 leading-relaxed"
              />
            </div>

            {/* Media Upload & Source Picker (Image vs Video, Cloudinary vs YouTube vs Local) */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="block text-neutral-300 uppercase font-mono text-xs font-semibold">
                  Section Media (Replace Image with Video, Cloudinary, YouTube or Local)
                </label>
                <span className="text-[10px] font-mono text-red-400 font-semibold">
                  Cloudinary Folder: {process.env.CLOUDINARY_FOLDER || 'primelensemedia'}
                </span>
              </div>

              <MediaUploadPicker
                mediaType={formData.mediaType || 'image'}
                mediaSource={formData.mediaSource || 'cloudinary'}
                mediaUrl={formData.mediaUrl || ''}
                mediaPoster={formData.mediaPoster || ''}
                onMediaTypeChange={(type) => handleChange('mediaType', type)}
                onMediaSourceChange={(source) => handleChange('mediaSource', source)}
                onMediaUrlChange={(url) => handleChange('mediaUrl', url)}
                onMediaPosterChange={(poster) => handleChange('mediaPoster', poster)}
              />
            </div>

            {/* Call to Action Buttons Configuration */}
            <div className="pt-2 border-t border-white/10 space-y-3">
              <label className="block text-neutral-300 uppercase font-mono text-xs font-semibold">
                Call-to-Action (CTA) Buttons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-500 uppercase font-mono text-[10px] mb-1">
                    Primary Button Label & Target
                  </label>
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={formData.ctaPrimaryLabel || ''}
                      onChange={(e) => handleChange('ctaPrimaryLabel', e.target.value)}
                      placeholder="e.g. Start a Project"
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
                    />
                    <input
                      type="text"
                      value={formData.ctaPrimaryLink || ''}
                      onChange={(e) => handleChange('ctaPrimaryLink', e.target.value)}
                      placeholder="#start-a-project or https://..."
                      className="w-full p-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 font-mono text-[11px] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-500 uppercase font-mono text-[10px] mb-1">
                    Secondary Button Label & Target
                  </label>
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={formData.ctaSecondaryLabel || ''}
                      onChange={(e) => handleChange('ctaSecondaryLabel', e.target.value)}
                      placeholder="e.g. View Our Work"
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
                    />
                    <input
                      type="text"
                      value={formData.ctaSecondaryLink || ''}
                      onChange={(e) => handleChange('ctaSecondaryLink', e.target.value)}
                      placeholder="#our-work or https://..."
                      className="w-full p-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 font-mono text-[11px] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="block text-neutral-400 uppercase font-mono text-xs font-semibold">
                  Extended Body Content / Rich Text HTML
                </label>
                <span className="text-[10px] font-mono text-red-400 font-semibold">
                  Live HTML & OpenGraph Sync
                </span>
              </div>
              <RichTextEditor
                value={formData.richTextHtml || ''}
                onChange={(val) => handleChange('richTextHtml', val)}
                placeholder="Format paragraphs, quotes, or feature lists..."
                ogPreview={{
                  title: formData.ogTitle || formData.title,
                  description: formData.ogDescription || formData.description,
                  image: formData.ogImage || formData.mediaUrl,
                }}
              />
            </div>

            {/* If 7 Capabilities & Services Section, render Individual Services Manager */}
            {activeSectionId === 'services' && (
              <CapabilityServicesManager
                items={
                  ((formData.metadata?.services || formData.metadata?.items) as CapabilityServiceItem[]) ||
                  DEFAULT_CAPABILITY_SERVICES
                }
                onChange={(updatedServices) => {
                  setFormData((prev) => ({
                    ...prev,
                    metadata: {
                      ...(prev.metadata || {}),
                      services: updatedServices,
                      items: updatedServices,
                    },
                  }))
                  setSaveSuccess(false)
                }}
              />
            )}

            {/* If Selected Works Section, render Individual Projects Manager */}
            {activeSectionId === 'work-showcase' && (
              <ShowcaseProjectsManager
                projects={(formData.metadata?.projects as ShowcaseProject[]) || []}
                onChange={(updatedProjects) => {
                  setFormData((prev) => ({
                    ...prev,
                    metadata: {
                      ...(prev.metadata || {}),
                      projects: updatedProjects,
                    },
                  }))
                  setSaveSuccess(false)
                }}
              />
            )}

            {/* If Why Choose Us Section, render Custom Pillars/Items Manager */}
            {activeSectionId === 'why-choose-us' && (
              <WhyChooseItemsManager
                items={
                  ((formData.metadata?.pillars || formData.metadata?.items) as WhyChooseItem[]) || [
                    {
                      title: 'Hands-On Experience',
                      description:
                        'Our practical experience across cinematography, editing, directing, producing, and design gives us a well-rounded understanding of the production process.',
                    },
                    {
                      title: 'Creativity with Purpose',
                      description:
                        'We combine fresh ideas with practical execution to create solutions that meet our clients’ objectives.',
                    },
                    {
                      title: 'A Passionate Team',
                      description:
                        'Our talented team brings creativity, collaboration, and dedication to every project.',
                    },
                    {
                      title: 'Integrated Solutions',
                      description:
                        'We offer both media production and studio design and fabrication, helping clients create compelling content and the spaces needed to produce it.',
                    },
                    {
                      title: 'Commitment to Excellence',
                      description:
                        'We value integrity, attention to detail, and timely delivery in every client engagement.',
                    },
                  ]
                }
                onChange={(updatedItems) => {
                  setFormData((prev) => ({
                    ...prev,
                    metadata: {
                      ...(prev.metadata || {}),
                      pillars: updatedItems,
                      items: updatedItems,
                    },
                  }))
                  setSaveSuccess(false)
                }}
              />
            )}
          </div>
        </div>

        {/* Right Column: Live Section Preview & Open Graph Meta */}
        <div className="lg:col-span-4 space-y-6">
          {/* Full Live Section Preview */}
          <SectionLivePreviewModal
            sectionId={activeSectionId}
            data={formData}
          />

          {/* Open Graph SEO */}
          <div className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Share2 className="w-4 h-4 text-red-400" />
              <h3 className="text-sm font-bold text-white">Open Graph & SEO Meta</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
                  Social Title (og:title)
                </label>
                <input
                  type="text"
                  value={formData.ogTitle || ''}
                  onChange={(e) => handleChange('ogTitle', e.target.value)}
                  placeholder={formData.title}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
                  Social Description (og:description)
                </label>
                <textarea
                  rows={2}
                  value={formData.ogDescription || ''}
                  onChange={(e) => handleChange('ogDescription', e.target.value)}
                  placeholder={formData.description}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase font-mono mb-1 font-semibold">
                  Social Card Image URL (og:image)
                </label>
                <input
                  type="text"
                  value={formData.ogImage || ''}
                  onChange={(e) => handleChange('ogImage', e.target.value)}
                  placeholder={formData.mediaUrl || '/opengraph-image.png'}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500 font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
