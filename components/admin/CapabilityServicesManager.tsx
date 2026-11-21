'use client'

import React, { useState } from 'react'
import {
  FolderPlus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Tag,
  Sparkles,
  Plus,
  Layers,
  CheckCircle2,
} from 'lucide-react'
import { CapabilityServiceItem, MediaType, MediaSource } from '@/types/admin'
import MediaUploadPicker from '@/components/admin/MediaUploadPicker'

interface Props {
  items: CapabilityServiceItem[]
  onChange: (items: CapabilityServiceItem[]) => void
}

export const DEFAULT_CAPABILITY_SERVICES: CapabilityServiceItem[] = [
  {
    id: 'media-production',
    icon: '🎥',
    title: 'Corporate & Brand Video Production',
    tagline: 'Documentaries, corporate profiles, and event coverage filmed on cinema rigs.',
    heroBadge: 'Corporate & Brand Video Production',
    description:
      'We shoot and edit video for broadcasts, businesses, and digital platforms. We handle investigative documentaries, corporate overviews, executive interviews, short films, and live multi-camera events. Our team manages every stage: location scouting, filming with 4K/6K cinema cameras, lighting, sound capture, and post-production color grading.',
    mediaType: 'image',
    mediaSource: 'cloudinary',
    mediaUrl:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80',
    mediaPoster: '',
    specialties: [
      'Documentary Production',
      'Corporate Videos & Executive Profiles',
      'High-Level Interviews & Dialogue',
      'Short Films & Narrative Projects',
      'Full-Scale Event Production & Coverage',
      'Branded Video Content & Creative Series',
    ],
    client: 'Pan-African Leadership Initiative',
    featuredShowcaseTitle: 'Legacy of Vision',
  },
  {
    id: 'television-studio',
    icon: '📺',
    title: 'Television & Studio Production',
    tagline: 'Multi-camera studio shoots ready for broadcast distribution.',
    heroBadge: 'Broadcast & Studio',
    description:
      'We run technical and creative production for television shows, syndicated talk programs, and studio broadcasts. We provide multi-camera vision mixing, intercom and tally setups, floor management, and broadcast audio so your feed meets television network delivery standards.',
    mediaType: 'image',
    mediaSource: 'cloudinary',
    mediaUrl:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80',
    mediaPoster: '',
    specialties: [
      'Talk Show Production & Moderation Sets',
      'Television Programme & Series Production',
      'Multi-Camera Live Studio Operations',
      'Broadcast Studio Engineering & Tally Systems',
      'Production Coordination & Crew Management',
      'Creative Studio Direction & Rundown Design',
    ],
    client: 'Continental News Network',
    featuredShowcaseTitle: 'The Dialogue Hour',
  },
  {
    id: 'podcast-production',
    icon: '🎙️',
    title: 'Podcast & Content Production',
    tagline: 'Multi-camera video podcasts with broadcast audio and social cutdowns.',
    heroBadge: 'Podcast & Audio Visual',
    description:
      'We record, edit, and package video podcasts for creators and businesses launching or expanding their shows. We record multi-angle 4K video, tune room acoustics for clear speech, and cut full episodes into vertical clips formatted for YouTube Shorts, TikTok, and Instagram Reels.',
    mediaType: 'image',
    mediaSource: 'cloudinary',
    mediaUrl:
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80',
    mediaPoster: '',
    specialties: [
      'Studio Podcast Recording (Audio & 4K Video)',
      'Multi-Cam Video Podcast Direction & Switching',
      'Professional Podcast Post-Production & Mixing',
      'Short-Form Clips & Social Cutdowns',
      'Podcast Format Development & Creative Direction',
      'Show Distribution & Monetization Consultation',
    ],
    client: 'Founders Circle Africa',
    featuredShowcaseTitle: 'Beyond the Curve',
  },
  {
    id: 'content-creation',
    icon: '📱',
    title: 'Content Creation',
    tagline: 'Short-form video assets and YouTube series produced in focused sprints.',
    heroBadge: 'Digital & Growth',
    description:
      'We produce short-form video libraries and YouTube series designed to hold attention on social platforms. We shoot and edit batches of vertical reels, product demonstrations, and brand promos in single production runs so you have weeks of content ready to publish.',
    mediaType: 'image',
    mediaSource: 'cloudinary',
    mediaUrl:
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80',
    mediaPoster: '',
    specialties: [
      'Social Media Video Campaigns (Reels & TikTok)',
      'Branded Video Content & Narrative Shorts',
      'YouTube Channel Production & Optimization',
      'Short-Form Video Assets',
      'Product Demonstrations & Creative Showcases',
      'Promotional Launch Sequences & Teasers',
    ],
    client: 'Nebula Smart Mobility',
    featuredShowcaseTitle: 'Horizon Launch Series',
  },
  {
    id: 'commercial-advertising',
    icon: '📢',
    title: 'Commercial & Advertising Production',
    tagline: 'Television ads and digital video campaigns built to drive conversions.',
    heroBadge: 'Commercial & Brand',
    description:
      'We write, film, and finish commercials for television broadcast and paid digital campaigns. We produce 15, 30, and 60-second commercials along with social cutdowns. We manage casting, studio lighting, high-speed camera work, and delivery formats that comply with broadcast regulatory clearances.',
    mediaType: 'image',
    mediaSource: 'cloudinary',
    mediaUrl:
      'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1600&q=80',
    mediaPoster: '',
    specialties: [
      'Television Commercials (TVC) & Broadcast Ads',
      'High-Conversion Digital Adverts (Paid Media)',
      'Promotional Brand Videos & Showcases',
      'Product Launch & Macro Cinematography',
      'Brand Narrative Campaigns',
      'Creative Scripting, Storyboarding & Direction',
    ],
    client: 'Aura Luxury Fragrances',
    featuredShowcaseTitle: 'Essence of Purity',
  },
  {
    id: 'studio-design',
    icon: '🏗️',
    title: 'Studio Design & Fabrication',
    tagline: 'Custom studio construction, acoustic wall treatments, and lighting rigs.',
    heroBadge: 'Design & Fabrication',
    description:
      'We design and build television sets, podcast rooms, creator studios, and acoustic backdrops. We handle the full build process: 3D concept renders, acoustic room analysis, custom carpentry, lighting grid installation, and final equipment integration.',
    mediaType: 'image',
    mediaSource: 'cloudinary',
    mediaUrl:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80',
    mediaPoster: '',
    specialties: [
      'Television Studio Design & Set Construction',
      'Podcast Studios & Acoustic Lounge Sets',
      'YouTube Creator Studios & Lighting Environments',
      'Custom Talk Show Sets & Desk Fabrication',
      'Corporate Content Studios & In-House Media Rooms',
      'Complete 3D Visualisation, Fabrication & Installation',
    ],
    client: 'Global Media Group',
    featuredShowcaseTitle: 'Apex Broadcast Studio',
  },
  {
    id: 'media-consultation',
    icon: '🎬',
    title: 'Media Consultation & Creative Direction',
    tagline: 'Technical blueprints, gear specifications, and production planning.',
    heroBadge: 'Strategy & Direction',
    description:
      'We advise organizations on studio setup, camera kit purchases, production budgets, and technical workflows. We work with creative directors, corporate teams, and institutions to evaluate facilities, recommend gear, structure production schedules, and streamline crew workflows before work starts.',
    mediaType: 'image',
    mediaSource: 'cloudinary',
    mediaUrl:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80',
    mediaPoster: '',
    specialties: [
      'Media & Broadcast Planning',
      'Content Planning & Audience Positioning',
      'Creative Direction & Visual Identity',
      'Production Budgeting & Technical Planning',
      'Studio Equipment Sourcing & Technical Auditing',
      'Project Coordination & Supervision',
    ],
    client: 'Federal Cultural Institute',
    featuredShowcaseTitle: 'National Media Hub Blueprint',
  },
]

export default function CapabilityServicesManager({ items, onChange }: Props) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleUpdate = (index: number, field: keyof CapabilityServiceItem, value: any) => {
    const updated = [...items]
    updated[index] = {
      ...updated[index],
      [field]: value,
    }
    onChange(updated)
  }

  const handleAddService = () => {
    const newService: CapabilityServiceItem = {
      id: `service-${Date.now()}`,
      icon: '✨',
      title: 'New Capability / Service',
      heroBadge: 'Specialized Service',
      tagline: 'Short high-impact tagline for this service category.',
      description:
        'Detailed description of what we do in this capability, workflows, camera packages, and client deliverables.',
      mediaType: 'image',
      mediaSource: 'cloudinary',
      mediaUrl:
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80',
      mediaPoster: '',
      specialties: [
        'Production Planning & Execution',
        'Post-Production & Mastering',
        'Multi-Platform Deliverables',
      ],
      client: 'Brand Partner',
      featuredShowcaseTitle: 'Featured Production',
    }
    const updated = [...items, newService]
    onChange(updated)
    setExpandedIndex(updated.length - 1)
  }

  const handleDeleteService = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const updated = items.filter((_, i) => i !== index)
    onChange(updated)
    if (expandedIndex === index) {
      setExpandedIndex(null)
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1)
    }
  }

  const handleSpecialtiesChange = (index: number, text: string) => {
    const specialties = text
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    handleUpdate(index, 'specialties', specialties)
  }

  return (
    <div className="space-y-4 pt-4 border-t border-white/10">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500" />
            Capabilities & Services List ({items.length})
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage individual capabilities, replace showcase photos/videos (Cloudinary, local, YouTube), titles, descriptions, and included services.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddService}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-lg shadow-red-600/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="space-y-3">
        {items.map((service, idx) => {
          const isExpanded = expandedIndex === idx
          return (
            <div
              key={service.id || idx}
              className="rounded-2xl border border-white/10 bg-neutral-900/60 overflow-hidden transition-all"
            >
              {/* Header Accordion Bar */}
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs flex items-center justify-center font-bold">
                    {service.icon || idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {service.title || 'Untitled Service'}
                      {service.heroBadge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 font-mono">
                          {service.heroBadge}
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-1 max-w-sm sm:max-w-md">
                      {service.tagline || service.description || 'No summary entered'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleDeleteService(idx, e)}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="text-neutral-400">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Collapsible Form Body */}
              {isExpanded && (
                <div className="p-4 pt-0 border-t border-white/5 space-y-4">
                  {/* Row 1: Title & Icon */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3 text-xs">
                    <div className="sm:col-span-3">
                      <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold mb-1">
                        Category Icon / Emoji
                      </label>
                      <input
                        type="text"
                        value={service.icon || ''}
                        onChange={(e) => handleUpdate(idx, 'icon', e.target.value)}
                        placeholder="e.g. 🎥, 🎙️, 📺"
                        className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-medium text-center focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div className="sm:col-span-9">
                      <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold mb-1">
                        Capability / Service Title *
                      </label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => handleUpdate(idx, 'title', e.target.value)}
                        placeholder="e.g. Corporate & Brand Video Production"
                        className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-semibold focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  {/* Row 2: Tagline & Hero Badge */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold mb-1">
                        Hero Badge Text
                      </label>
                      <input
                        type="text"
                        value={service.heroBadge || ''}
                        onChange={(e) => handleUpdate(idx, 'heroBadge', e.target.value)}
                        placeholder="e.g. Broadcast & Studio"
                        className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold mb-1">
                        Tagline (Italic Quote)
                      </label>
                      <input
                        type="text"
                        value={service.tagline || ''}
                        onChange={(e) => handleUpdate(idx, 'tagline', e.target.value)}
                        placeholder="e.g. Multi-camera studio shoots ready for broadcast distribution."
                        className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  {/* Description / Lead Paragraph */}
                  <div>
                    <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold mb-1">
                      Full Description & Overview
                    </label>
                    <textarea
                      rows={3}
                      value={service.description || ''}
                      onChange={(e) => handleUpdate(idx, 'description', e.target.value)}
                      placeholder="Detailed narrative of this discipline, team capabilities, camera rigs, and workflow..."
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs leading-relaxed focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {/* Specialties List */}
                  <div>
                    <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold mb-1">
                      Services Included / Specialties (One item per line)
                    </label>
                    <textarea
                      rows={4}
                      value={service.specialties?.join('\n') || ''}
                      onChange={(e) => handleSpecialtiesChange(idx, e.target.value)}
                      placeholder="Documentary Production&#10;Corporate Videos & Executive Profiles&#10;High-Level Interviews & Dialogue"
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs leading-relaxed focus:outline-none focus:border-red-500"
                    />
                    <span className="text-[10px] text-neutral-500 font-mono mt-1 block">
                      Each line appears with a checkmark on the live service showcase card.
                    </span>
                  </div>

                  {/* Featured Showcase Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold mb-1">
                        Featured Showcase Project Title
                      </label>
                      <input
                        type="text"
                        value={service.featuredShowcaseTitle || ''}
                        onChange={(e) => handleUpdate(idx, 'featuredShowcaseTitle', e.target.value)}
                        placeholder="e.g. Legacy of Vision"
                        className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold mb-1">
                        Featured Client Name
                      </label>
                      <input
                        type="text"
                        value={service.client || ''}
                        onChange={(e) => handleUpdate(idx, 'client', e.target.value)}
                        placeholder="e.g. Pan-African Leadership Initiative"
                        className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  {/* Media Upload / URL Picker */}
                  <div className="space-y-1 pt-2 border-t border-white/5">
                    <label className="block text-neutral-300 uppercase font-mono text-[11px] font-semibold">
                      Featured Showcase Media / Image (Cloudinary, Local, YouTube)
                    </label>
                    <MediaUploadPicker
                      mediaType={service.mediaType || 'image'}
                      mediaSource={service.mediaSource || 'cloudinary'}
                      mediaUrl={service.mediaUrl || ''}
                      mediaPoster={service.mediaPoster || ''}
                      onMediaTypeChange={(type) => handleUpdate(idx, 'mediaType', type)}
                      onMediaSourceChange={(source) => handleUpdate(idx, 'mediaSource', source)}
                      onMediaUrlChange={(url) => handleUpdate(idx, 'mediaUrl', url)}
                      onMediaPosterChange={(poster) => handleUpdate(idx, 'mediaPoster', poster)}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {items.length === 0 && (
          <div className="p-8 text-center rounded-2xl bg-black/40 border border-dashed border-white/10 text-neutral-400 text-xs">
            No capabilities or services configured yet. Click &quot;Add Service&quot; above to create one.
          </div>
        )}
      </div>
    </div>
  )
}
