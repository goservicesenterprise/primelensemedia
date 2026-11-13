'use client'

import React, { useState } from 'react'
import {
  FolderPlus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Tag,
  Sparkles,
  Calendar,
  User,
  Plus,
} from 'lucide-react'
import { ShowcaseProject, MediaType, MediaSource } from '@/types/admin'
import MediaUploadPicker from '@/components/admin/MediaUploadPicker'

interface Props {
  projects: ShowcaseProject[]
  onChange: (projects: ShowcaseProject[]) => void
}

const CATEGORIES = [
  'FILM & DOCUMENTARIES',
  'COMMERCIALS',
  'TELEVISION',
  'PODCASTS',
  'EVENTS',
  'STUDIO DESIGN',
]

export default function ShowcaseProjectsManager({ projects, onChange }: Props) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleUpdate = (index: number, field: keyof ShowcaseProject, value: any) => {
    const updated = [...projects]
    updated[index] = {
      ...updated[index],
      [field]: value,
    }
    // Keep image and mediaUrl in sync for backwards-compatibility
    if (field === 'mediaUrl') {
      updated[index].image = value
    }
    onChange(updated)
  }

  const handleAddProject = () => {
    const newProject: ShowcaseProject = {
      id: `proj-${Date.now()}`,
      title: 'New Featured Project',
      client: 'Brand Partner',
      category: 'COMMERCIALS',
      year: new Date().getFullYear().toString(),
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'image',
      mediaSource: 'cloudinary',
      mediaUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
      description: 'Project synopsis and production details...',
      tags: ['Production', 'Cinema 4K'],
    }
    const updated = [newProject, ...projects]
    onChange(updated)
    setExpandedIndex(0)
  }

  const handleDeleteProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index)
    onChange(updated)
    if (expandedIndex === index) {
      setExpandedIndex(null)
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1)
    }
  }

  const handleTagsChange = (index: number, tagsString: string) => {
    const tags = tagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    handleUpdate(index, 'tags', tags)
  }

  return (
    <div className="space-y-4 pt-4 border-t border-white/10">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500" />
            Selected Productions & Works Portfolio ({projects.length})
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage individual project cards, replace posters with Cloudinary videos/images, clients, and categories.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddProject}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((proj, idx) => {
          const isExpanded = expandedIndex === idx
          return (
            <div
              key={proj.id || idx}
              className="rounded-2xl border border-white/10 bg-neutral-900/60 overflow-hidden transition-all"
            >
              {/* Header Accordion Bar */}
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {proj.title || 'Untitled Project'}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 font-mono">
                        {proj.category}
                      </span>
                    </h4>
                    <p className="text-xs text-neutral-400 font-mono">
                      Client: {proj.client} • {proj.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteProject(idx)
                    }}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs">
                    <div>
                      <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => handleUpdate(idx, 'title', e.target.value)}
                        placeholder="e.g. Legacy of Vision"
                        className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-medium focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold mb-1">
                        Client / Commissioning Body
                      </label>
                      <input
                        type="text"
                        value={proj.client}
                        onChange={(e) => handleUpdate(idx, 'client', e.target.value)}
                        placeholder="e.g. Pan-African Leadership Initiative"
                        className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold mb-1">
                        Category Filter
                      </label>
                      <select
                        value={proj.category}
                        onChange={(e) => handleUpdate(idx, 'category', e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat} className="bg-neutral-900 text-white">
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold mb-1">
                        Release Year
                      </label>
                      <input
                        type="text"
                        value={proj.year}
                        onChange={(e) => handleUpdate(idx, 'year', e.target.value)}
                        placeholder="2026"
                        className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  {/* Synopsis Description */}
                  <div>
                    <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold mb-1">
                      Project Synopsis & Scope
                    </label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => handleUpdate(idx, 'description', e.target.value)}
                      placeholder="Brief overview of the production, camera package or fabrication..."
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs leading-relaxed focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-neutral-400 uppercase font-mono text-[10px] font-semibold mb-1">
                      Project Badges / Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={proj.tags?.join(', ') || ''}
                      onChange={(e) => handleTagsChange(idx, e.target.value)}
                      placeholder="Documentary, Cinema 4K, Global Broadcast"
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {/* Project Media: Cloudinary / YouTube / Local upload with Image or Video toggle */}
                  <div className="space-y-1 pt-2 border-t border-white/5">
                    <label className="block text-neutral-300 uppercase font-mono text-[11px] font-semibold">
                      Project Thumbnail / Featured Media
                    </label>
                    <MediaUploadPicker
                      mediaType={proj.mediaType || 'image'}
                      mediaSource={proj.mediaSource || 'cloudinary'}
                      mediaUrl={proj.mediaUrl || proj.image || ''}
                      mediaPoster={proj.mediaPoster || proj.image || ''}
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

        {projects.length === 0 && (
          <div className="p-8 text-center rounded-2xl bg-black/40 border border-dashed border-white/10 text-neutral-400 text-xs">
            No projects added yet. Click &quot;Add Project&quot; above to create one.
          </div>
        )}
      </div>
    </div>
  )
}
