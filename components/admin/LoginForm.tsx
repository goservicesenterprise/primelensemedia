'use client'

import React, { useState, useTransition } from 'react'
import Image from 'next/image'
import { Lock, User, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react'
import { loginAdmin } from '@/lib/auth'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        })
        const data = await res.json()
        if (data.success) {
          window.location.href = '/admin'
        } else {
          setError(data.error || 'Authentication failed. Please verify credentials.')
        }
      } catch (err: any) {
        setError('Network error while authenticating.')
      }
    })
  }

  return (
    <div className="w-full max-w-md p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="relative h-12 w-48 mx-auto flex items-center justify-center">
          <Image
            src="/primelense_media_logo_clean.png"
            alt="PrimeLense Media"
            fill
            priority
            sizes="192px"
            className="object-contain"
          />
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-neutral-400 uppercase font-mono text-[11px] mb-1 font-semibold">
            Username
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              autoComplete="username"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-neutral-400 uppercase font-mono text-[11px] mb-1 font-semibold">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs tracking-wide transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>{isPending ? 'Authenticating...' : 'Sign In to Console'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
