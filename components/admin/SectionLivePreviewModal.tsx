'use client'

import React, { useState } from 'react'
import {
  Sparkles,
  ArrowUpRight,
  Play,
  Layers,
  Monitor,
  CheckCircle,
} from 'lucide-react'
import { SectionContent, ShowcaseProject, CapabilityServiceItem } from '@/types/admin'
import UniversalMedia from '@/components/shared/ui/UniversalMedia'

interface Props {
  sectionId: string
  data: SectionContent
}

export default function SectionLivePreviewModal({ sectionId, data }: Props) {
  const [activeTab, setActiveTab] = useState<'desktop' | 'raw'>('desktop')

  const badge = data.badge || 'Section Badge'
  const title = data.title || 'Section Title'
  const tagline = data.tagline
  const description = data.description
  const highlightText = data.highlightText
  const mediaUrl = data.mediaUrl
  const mediaType = data.mediaType || 'image'
  const mediaSource = data.mediaSource || 'cloudinary'
  const mediaPoster = data.mediaPoster

  const projects = (data.metadata?.projects as ShowcaseProject[]) || []
  const services = ((data.metadata?.services || data.metadata?.items) as CapabilityServiceItem[]) || []

  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-950 overflow-hidden shadow-2xl">
      {/* Top Bar */}
      <div className="px-4 py-3 bg-neutral-900 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <h4 className="text-xs font-mono font-bold uppercase text-neutral-200">
            Live Section Rendering Preview
          </h4>
        </div>
        <div className="flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-white/10 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('desktop')}
            className={`px-2 py-0.5 rounded cursor-pointer ${
              activeTab === 'desktop' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Visual Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('raw')}
            className={`px-2 py-0.5 rounded cursor-pointer ${
              activeTab === 'raw' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Raw Media
          </button>
        </div>
      </div>

      {activeTab === 'desktop' ? (
        <div className="p-6 bg-black text-white space-y-6">
          {/* Badge & Title */}
          <div className="space-y-2">
            {badge && (
              <span className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">
                {badge}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {title}
            </h2>
            {tagline && (
              <p className="text-xs font-mono text-neutral-400 font-semibold uppercase tracking-wider">
                {tagline}
              </p>
            )}
            {highlightText && (
              <p className="text-xs font-mono text-red-400 font-bold">
                {highlightText}
              </p>
            )}
          </div>

          {/* Media Player Showcase */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/15 shadow-xl">
            {mediaUrl ? (
              <UniversalMedia
                src={mediaUrl}
                mediaType={mediaType}
                mediaSource={mediaSource}
                poster={mediaPoster}
                alt={title}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
                controls={mediaType === 'video'}
                autoPlay={false}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-neutral-500 text-xs gap-2">
                <Layers className="w-8 h-8 opacity-40" />
                <span>No media assigned yet. Upload or enter a URL on the left.</span>
              </div>
            )}
            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-white/80 border border-white/10 pointer-events-none">
              {mediaType.toUpperCase()} • {mediaSource.toUpperCase()}
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-xs text-neutral-300 leading-relaxed font-normal">
              {description}
            </p>
          )}

          {/* Buttons Preview */}
          {(data.ctaPrimaryLabel || data.ctaSecondaryLabel) && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {data.ctaPrimaryLabel && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 text-white font-semibold text-xs shadow-md shadow-red-950/50">
                  {data.ctaPrimaryLabel}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              )}
              {data.ctaSecondaryLabel && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-neutral-200 text-xs">
                  {data.ctaSecondaryLabel}
                </span>
              )}
            </div>
          )}

          {/* Capabilities & Services Cards Preview if services */}
          {sectionId === 'services' && services.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-[11px] font-mono text-neutral-400 uppercase font-bold block">
                Capabilities Feed ({services.length})
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {services.slice(0, 4).map((s, idx) => (
                  <div
                    key={s.id || idx}
                    className="p-2 rounded-xl bg-neutral-900 border border-white/10 space-y-2 overflow-hidden"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-950">
                      <UniversalMedia
                        src={s.mediaUrl || ''}
                        mediaType={s.mediaType || 'image'}
                        mediaSource={s.mediaSource || 'cloudinary'}
                        poster={s.mediaPoster || ''}
                        alt={s.title}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover"
                        controls={s.mediaType === 'video'}
                        autoPlay={false}
                      />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-white truncate flex items-center gap-1">
                        <span>{s.icon || '⚙️'}</span>
                        <span>{s.title}</span>
                      </h5>
                      <p className="text-[9px] text-neutral-400 font-mono truncate">{s.heroBadge || s.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Projects Cards Preview if work-showcase */}
          {sectionId === 'work-showcase' && projects.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-[11px] font-mono text-neutral-400 uppercase font-bold block">
                Showcase Projects Feed ({projects.length})
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {projects.slice(0, 4).map((p, idx) => (
                  <div
                    key={p.id || idx}
                    className="p-2 rounded-xl bg-neutral-900 border border-white/10 space-y-2 overflow-hidden"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-950">
                      <UniversalMedia
                        src={p.mediaUrl || p.image}
                        mediaType={p.mediaType || 'image'}
                        mediaSource={p.mediaSource || 'cloudinary'}
                        poster={p.mediaPoster || p.image}
                        alt={p.title}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover"
                        controls={p.mediaType === 'video'}
                        autoPlay={false}
                      />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-white truncate">{p.title}</h5>
                      <p className="text-[9px] text-neutral-400 font-mono truncate">{p.client} • {p.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 bg-black font-mono text-[11px] text-neutral-300 space-y-3 overflow-x-auto">
          <div>
            <span className="text-neutral-500 block">Media URL:</span>
            <span className="text-red-400 break-all">{mediaUrl || 'None'}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Media Type:</span>
            <span className="text-white uppercase">{mediaType}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Media Source:</span>
            <span className="text-white uppercase">{mediaSource}</span>
          </div>
          {mediaPoster && (
            <div>
              <span className="text-neutral-500 block">Poster Frame URL:</span>
              <span className="text-neutral-400 break-all">{mediaPoster}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
