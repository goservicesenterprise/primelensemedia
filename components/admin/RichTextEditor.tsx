'use client'

import React, { useRef, useState } from 'react'
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Link,
  Code,
  Eye,
  Edit3,
  Share2,
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  ogPreview?: {
    title?: string
    description?: string
    image?: string
    url?: string
  }
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write content...',
  ogPreview,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'og'>('edit')

  const exec = (command: string, arg: string | undefined = undefined) => {
    document.execCommand(command, false, arg)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const setHeading = (tag: string) => {
    document.execCommand('formatBlock', false, `<${tag}>`)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const addLink = () => {
    const url = prompt('Enter link URL (e.g. https://...):')
    if (url) {
      exec('createLink', url)
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900/80 overflow-hidden shadow-xl backdrop-blur-md">
      {/* Top Bar with Mode Switcher & Tools */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-3 py-2 bg-black/40 gap-2">
        {/* Formatting Toolbar */}
        {activeTab === 'edit' && (
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={() => setHeading('h2')}
              title="Heading 2"
              className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setHeading('h3')}
              title="Heading 3"
              className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setHeading('p')}
              title="Paragraph"
              className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Heading3 className="w-4 h-4" />
            </button>

            <span className="w-px h-5 bg-white/10 mx-1" />

            <button
              type="button"
              onClick={() => exec('bold')}
              title="Bold"
              className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => exec('italic')}
              title="Italic"
              className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => exec('underline')}
              title="Underline"
              className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Underline className="w-4 h-4" />
            </button>

            <span className="w-px h-5 bg-white/10 mx-1" />

            <button
              type="button"
              onClick={() => exec('insertUnorderedList')}
              title="Bullet list"
              className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => exec('insertOrderedList')}
              title="Numbered list"
              className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setHeading('blockquote')}
              title="Quote"
              className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={addLink}
              title="Insert Link"
              className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Link className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab selection */}
        <div className="flex items-center gap-1 ml-auto bg-black/60 p-1 rounded-xl border border-white/5">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'edit'
                ? 'bg-red-600 text-white shadow-sm font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'preview'
                ? 'bg-red-600 text-white shadow-sm font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live HTML</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('og')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'og'
                ? 'bg-red-600 text-white shadow-sm font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Social OpenGraph</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'edit' && (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: value }}
          data-placeholder={placeholder}
          className="min-h-[160px] max-h-[360px] overflow-y-auto p-4 text-sm text-neutral-100 focus:outline-none prose prose-invert max-w-none leading-relaxed [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-white [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-white [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>blockquote]:border-l-2 [&>blockquote]:border-red-500 [&>blockquote]:pl-3 [&>blockquote]:italic [&>a]:text-red-400 [&>a]:underline"
        />
      )}

      {activeTab === 'preview' && (
        <div className="p-4 min-h-[160px] bg-black/40">
          <div className="text-xs font-mono uppercase text-neutral-500 mb-2">Rendered HTML Output</div>
          <div
            dangerouslySetInnerHTML={{ __html: value || '<p className="text-neutral-500 italic">No content yet.</p>' }}
            className="prose prose-invert max-w-none text-sm leading-relaxed"
          />
        </div>
      )}

      {activeTab === 'og' && (
        <div className="p-4 bg-black/60 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold">
              Open Graph Meta Preview (Twitter / LinkedIn / WhatsApp)
            </span>
            <span className="text-[11px] font-mono text-neutral-400">Card standard: summary_large_image</span>
          </div>

          <div className="max-w-md mx-auto rounded-xl border border-white/10 bg-neutral-900/90 overflow-hidden shadow-2xl">
            {ogPreview?.image ? (
              <div className="relative aspect-[1.91/1] w-full bg-neutral-950 overflow-hidden border-b border-white/10">
                <img
                  src={ogPreview.image}
                  alt={ogPreview.title || 'Social Preview'}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[1.91/1] w-full bg-neutral-800 flex items-center justify-center text-neutral-500 text-xs font-mono border-b border-white/10">
                [No OG Image Set]
              </div>
            )}
            <div className="p-3.5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-red-400 font-semibold tracking-wider">
                {ogPreview?.url || 'primelensemedia.com'}
              </span>
              <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                {ogPreview?.title || 'PrimeLense Media | Cinematic Production'}
              </h4>
              <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                {ogPreview?.description ||
                  'Precision cinematography, corporate documentary production, and acoustic studio engineering.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
