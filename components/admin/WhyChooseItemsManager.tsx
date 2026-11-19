'use client'

import React, { useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical, CheckCircle2 } from 'lucide-react'

export interface WhyChooseItem {
  id?: string
  title: string
  description: string
}

interface Props {
  items: WhyChooseItem[]
  onChange: (items: WhyChooseItem[]) => void
}

export default function WhyChooseItemsManager({ items, onChange }: Props) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleUpdate = (index: number, field: keyof WhyChooseItem, value: string) => {
    const updated = [...items]
    updated[index] = {
      ...updated[index],
      [field]: value,
    }
    onChange(updated)
  }

  const handleAddItem = () => {
    const newItem: WhyChooseItem = {
      id: `why-${Date.now()}`,
      title: 'New Advantage / Reason',
      description: 'Describe why clients and productions choose PrimeLense Media...',
    }
    const updated = [...items, newItem]
    onChange(updated)
    setExpandedIndex(updated.length - 1)
  }

  const handleDeleteItem = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const updated = items.filter((_, i) => i !== index)
    onChange(updated)
    if (expandedIndex === index) {
      setExpandedIndex(null)
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1)
    }
  }

  return (
    <div className="space-y-4 pt-4 border-t border-white/10">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>🛡️</span>
            <span>Why Choose Us Value Propositions / Cards ({items.length})</span>
          </h3>
          <p className="text-xs text-neutral-400">
            Add, edit, or remove the core value items displayed in this section.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-lg shadow-red-600/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Item</span>
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isExpanded = expandedIndex === index
          return (
            <div
              key={item.id || index}
              className="rounded-xl border border-white/10 bg-black/40 overflow-hidden transition-all"
            >
              {/* Header row */}
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {item.title || 'Untitled Value Proposition'}
                    </h4>
                    <p className="text-[11px] text-neutral-400 truncate max-w-[280px] sm:max-w-md">
                      {item.description || 'No description entered'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleDeleteItem(index, e)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-neutral-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                  )}
                </div>
              </div>

              {/* Collapsible content */}
              {isExpanded && (
                <div className="p-4 pt-2 border-t border-white/10 space-y-3 bg-neutral-950/60">
                  <div>
                    <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                      Headline / Title *
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleUpdate(index, 'title', e.target.value)}
                      placeholder="e.g. Hands-On Experience"
                      className="w-full p-2.5 rounded-lg bg-black/60 border border-white/15 text-white text-xs font-semibold focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                      Description / Body Copy *
                    </label>
                    <textarea
                      rows={3}
                      value={item.description}
                      onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                      placeholder="Detailed explanation of this strength..."
                      className="w-full p-2.5 rounded-lg bg-black/60 border border-white/15 text-white text-xs leading-relaxed focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {items.length === 0 && (
          <div className="p-8 text-center rounded-xl border border-dashed border-white/15 bg-white/[0.01]">
            <p className="text-xs text-neutral-400 mb-2">No value propositions added yet.</p>
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Your First Item</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
