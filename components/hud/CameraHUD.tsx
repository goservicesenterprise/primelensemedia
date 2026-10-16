'use client'

import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { themeStore } from '@/store/theme.store'

const CameraHUD = observer(function CameraHUD() {
  const [timecode, setTimecode] = useState('00:00:00:00')
  const { isHudVisible, currentDiscipline } = themeStore

  useEffect(() => {
    const start = performance.now()
    const interval = setInterval(() => {
      const elapsed = Math.floor((performance.now() - start) / 1000 * 24)
      const frames = (elapsed % 24).toString().padStart(2, '0')
      const totalSeconds = Math.floor(elapsed / 24)
      const secs = (totalSeconds % 60).toString().padStart(2, '0')
      const mins = (Math.floor(totalSeconds / 60) % 60).toString().padStart(2, '0')
      const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0')
      setTimecode(`${hrs}:${mins}:${secs}:${frames}`)
    }, 41)
    return () => clearInterval(interval)
  }, [])

  if (!isHudVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 md:p-8 font-mono text-[10px] md:text-xs select-none tracking-widest text-white/50">
      {/* Top Bar HUD */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-600/20 border border-red-500/40 text-red-400 font-semibold text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
            REC
          </span>
          <span className="text-white/80 font-bold">{timecode}</span>
          <span className="hidden sm:inline-block text-white/40">|</span>
          <span className="hidden sm:inline-block text-white/70">4K DCI 2.39:1</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block text-white/40">COLOR PIPELINE: ACEScc</span>
          <span
            className="px-2 py-0.5 rounded border text-[10px] uppercase font-semibold transition-colors duration-500"
            style={{
              borderColor: currentDiscipline.accentHex,
              color: currentDiscipline.accentHex,
              backgroundColor: `${currentDiscipline.accentHex}15`,
            }}
          >
            {currentDiscipline.id.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Crosshair & Framing Marks in Viewport Center */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Aspect Ratio Framing Guides */}
        <div className="absolute w-[90%] md:w-[84%] max-w-6xl aspect-[2.39/1] border border-white/10 rounded-sm pointer-events-none">
          {/* Top Left Corner */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white/40" />
          {/* Top Right Corner */}
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white/40" />
          {/* Bottom Left Corner */}
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white/40" />
          {/* Bottom Right Corner */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white/40" />
        </div>

        {/* Center Optical Crosshair */}
        <div className="relative w-6 h-6 flex items-center justify-center">
          <div className="absolute w-4 h-[1px] bg-white/30" />
          <div className="absolute h-4 w-[1px] bg-white/30" />
          <div className="w-1.5 h-1.5 rounded-full border border-white/40" />
        </div>
      </div>

      {/* Bottom Bar HUD */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-white/70">
          <span>FPS 24.0</span>
          <span>SHUTTER 180.0°</span>
          <span>ISO 800</span>
          <span className="hidden sm:inline-block">WB 5600K</span>
        </div>

        <div className="flex items-center gap-3 text-white/60">
          <span className="hidden md:inline-block">PRIMELENSE OPTICAL RIG // A-CAM</span>
          <span className="text-white/40">F2.8</span>
        </div>
      </div>
    </div>
  )
})

export default CameraHUD
