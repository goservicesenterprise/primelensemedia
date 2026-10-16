'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { observer } from 'mobx-react-lite'
import { themeStore } from '@/store/theme.store'

// Generate deterministic pseudo-random particle positions
function generateDeterministicParticles(count: number) {
  const p = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const seedX = (Math.sin(i * 12.9898) * 43758.5453) % 1
    const seedY = (Math.cos(i * 78.233) * 43758.5453) % 1
    const seedZ = (Math.sin(i * 45.123) * 43758.5453) % 1
    p[i * 3] = (seedX - 0.5) * 16
    p[i * 3 + 1] = (seedY - 0.5) * 12
    p[i * 3 + 2] = (seedZ - 0.5) * 10
  }
  return p
}

const STATIC_PARTICLE_POSITIONS = generateDeterministicParticles(100)

function CinemaLensMesh({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const glassRef = useRef<THREE.Mesh>(null)
  const innerRingRef = useRef<THREE.Mesh>(null)

  const parsedColor = useMemo(() => new THREE.Color(accentColor), [accentColor])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle float and gentle interactive cursor tilt
      const targetX = (state.pointer.x * Math.PI) / 10
      const targetY = -(state.pointer.y * Math.PI) / 10
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetX, 3, delta)
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetY, 3, delta)
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += delta * 0.2
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.3}>
      {/* Outer Metal Barrel */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.0, 2.05, 2.2, 64]} />
        <meshStandardMaterial
          color="#0c0d0f"
          roughness={0.25}
          metalness={0.92}
        />
      </mesh>

      {/* Focus & Aperture Gear Ribs */}
      <mesh position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.08, 2.08, 0.45, 48]} />
        <meshStandardMaterial
          color="#16181d"
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Anodized Accent Ring with Dynamic Color */}
      <mesh ref={innerRingRef} position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.04, 2.04, 0.08, 64]} />
        <meshStandardMaterial
          color={parsedColor}
          emissive={parsedColor}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Front Optical Glass Element */}
      <mesh ref={glassRef} position={[0, 0, 0.9]}>
        <sphereGeometry args={[1.8, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          resolution={512}
          transmission={0.95}
          roughness={0.05}
          thickness={0.8}
          ior={1.52}
          chromaticAberration={0.06}
          anisotropy={0.2}
          color={accentColor}
        />
      </mesh>

      {/* Internal Iris Blades Indicator */}
      <mesh position={[0, 0, 0.1]} rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[0.3, 1.4, 8]} />
        <meshStandardMaterial
          color="#1a1c22"
          roughness={0.7}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function StudioParticles({ accentColor }: { accentColor: string }) {
  const pointsRef = useRef<THREE.Points>(null)

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03
      pointsRef.current.rotation.x += delta * 0.015
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[STATIC_PARTICLE_POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={accentColor}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

const StudioScene = observer(function StudioScene() {
  const accentHex = themeStore.currentDiscipline.accentHex

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        {/* Key & Rim Studio Lights */}
        <directionalLight position={[5, 6, 4]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-4, -3, 2]} intensity={3} color={accentHex} />
        <pointLight position={[3, 4, -2]} intensity={2} color="#38bdf8" />

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <CinemaLensMesh accentColor={accentHex} />
        </Float>

        <StudioParticles accentColor={accentHex} />
      </Canvas>
    </div>
  )
})

export default StudioScene
