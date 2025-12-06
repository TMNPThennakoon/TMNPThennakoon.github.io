'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Animated grid pattern with moving lines
function GridPattern() {
  const groupRef = useRef<THREE.Group>(null)
  const gridSize = 30
  const spacing = 1.5

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation and movement
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.5
      groupRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.12) * 0.5
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -8]}>
      {/* Animated grid lines */}
      {Array.from({ length: gridSize + 1 }).map((_, i) => {
        const pos = (i - gridSize / 2) * spacing
        return (
          <group key={`grid-${i}`}>
            {/* Horizontal lines with pulsing animation */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    -gridSize * spacing / 2, pos, 0,
                    gridSize * spacing / 2, pos, 0
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial 
                color="#60a5fa" 
                transparent 
                opacity={0.2}
              />
            </line>
            {/* Vertical lines */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    pos, -gridSize * spacing / 2, 0,
                    pos, gridSize * spacing / 2, 0
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial 
                color="#60a5fa" 
                transparent 
                opacity={0.2}
              />
            </line>
          </group>
        )
      })}
    </group>
  )
}

// Scattered animated dots pattern
function DotsPattern() {
  const pointsRef = useRef<THREE.Points>(null)
  const dotCount = 400
  const positions = new Float32Array(dotCount * 3)
  const originalPositions = new Float32Array(dotCount * 3)

  useEffect(() => {
    for (let i = 0; i < dotCount; i++) {
      const i3 = i * 3
      const x = (Math.random() - 0.5) * 40
      const y = (Math.random() - 0.5) * 40
      const z = (Math.random() - 0.5) * 15
      
      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z
      
      originalPositions[i3] = x
      originalPositions[i3 + 1] = y
      originalPositions[i3 + 2] = z
    }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < dotCount; i++) {
        const i3 = i * 3
        const baseX = originalPositions[i3]
        const baseY = originalPositions[i3 + 1]
        const baseZ = originalPositions[i3 + 2]
        
        // Floating animation
        positions[i3] = baseX + Math.sin(time * 0.5 + i) * 0.3
        positions[i3 + 1] = baseY + Math.cos(time * 0.7 + i * 0.5) * 0.3
        positions[i3 + 2] = baseZ + Math.sin(time * 0.3 + i * 0.3) * 0.2
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef} position={[0, 0, -5]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={dotCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#8b5cf6"
        transparent
        opacity={0.5}
        sizeAttenuation={true}
      />
    </points>
  )
}

// Animated small squares pattern
function SquaresPattern() {
  const groupRef = useRef<THREE.Group>(null)
  const squareCount = 80
  const squares = useRef<Array<{ mesh: THREE.Mesh; basePos: [number, number, number]; baseRot: number }>>([])

  useEffect(() => {
    squares.current = []
    for (let i = 0; i < squareCount; i++) {
      const size = Math.random() * 0.4 + 0.15
      const x = (Math.random() - 0.5) * 35
      const y = (Math.random() - 0.5) * 35
      const z = (Math.random() - 0.5) * 12
      const rotation = Math.random() * Math.PI * 2
      
      squares.current.push({
        mesh: null as any,
        basePos: [x, y, z],
        baseRot: rotation
      })
    }
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Group rotation
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.03
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      {squares.current.map((square, i) => (
        <AnimatedSquare
          key={i}
          basePos={square.basePos}
          baseRot={square.baseRot}
          index={i}
        />
      ))}
    </group>
  )
}

// Individual animated square component
function AnimatedSquare({ basePos, baseRot, index }: { basePos: [number, number, number], baseRot: number, index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const size = Math.random() * 0.4 + 0.15

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const speed = 0.3 + index * 0.01
      
      // Floating movement
      meshRef.current.position.x = basePos[0] + Math.sin(time * speed + index) * 0.5
      meshRef.current.position.y = basePos[1] + Math.cos(time * speed * 0.8 + index) * 0.5
      meshRef.current.position.z = basePos[2] + Math.sin(time * speed * 0.6 + index) * 0.3
      
      // Rotation
      meshRef.current.rotation.z = baseRot + time * (0.2 + index * 0.01)
      
      // Pulsing scale
      const scale = 1 + Math.sin(time * 2 + index) * 0.1
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  const color = index % 3 === 0 ? "#60a5fa" : index % 3 === 1 ? "#8b5cf6" : "#a78bfa"

  return (
    <mesh
      ref={meshRef}
      position={basePos}
      rotation={[0, 0, baseRot]}
    >
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.25}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Animated geometric wireframe structure
function WireframeStructure() {
  const meshRef = useRef<THREE.LineSegments>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.rotation.y = time * 0.15
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.2
      meshRef.current.position.y = Math.sin(time * 0.1) * 0.3
    }
  })

  return (
    <lineSegments ref={meshRef} position={[0, 0, -7]}>
      <edgesGeometry args={[new THREE.BoxGeometry(10, 10, 10, 3, 3, 3)]} />
      <lineBasicMaterial 
        color="#3b82f6" 
        transparent 
        opacity={0.15}
        linewidth={1}
      />
    </lineSegments>
  )
}

// Additional animated wireframe layers for depth
function AdditionalWireframes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.rotation.z = time * 0.12
      groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -9]}>
      {/* Multiple wireframe boxes at different scales and positions */}
      {[1, 1.5, 2].map((scale, i) => (
        <AnimatedWireframeBox
          key={`wireframe-${i}`}
          scale={scale}
          position={[i * 3 - 3, Math.sin(i) * 2, 0]}
          color={i === 0 ? "#60a5fa" : i === 1 ? "#8b5cf6" : "#a78bfa"}
          opacity={0.12 - i * 0.03}
          index={i}
        />
      ))}
    </group>
  )
}

// Individual animated wireframe box
function AnimatedWireframeBox({ 
  scale, 
  position, 
  color, 
  opacity, 
  index 
}: { 
  scale: number
  position: [number, number, number]
  color: string
  opacity: number
  index: number
}) {
  const meshRef = useRef<THREE.LineSegments>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.rotation.y = time * (0.1 + index * 0.05)
      meshRef.current.rotation.x = Math.sin(time * 0.2 + index) * 0.15
      meshRef.current.position.y = position[1] + Math.sin(time * 0.3 + index) * 0.5
    }
  })

  return (
    <lineSegments ref={meshRef} position={position}>
      <edgesGeometry args={[new THREE.BoxGeometry(scale * 4, scale * 4, scale * 4, 2, 2, 2)]} />
      <lineBasicMaterial 
        color={color} 
        transparent 
        opacity={opacity}
        linewidth={1}
      />
    </lineSegments>
  )
}

// Floating particles connecting with lines
function ConnectingParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const particleCount = 60
  const maxDistance = 4
  const positions = new Float32Array(particleCount * 3)
  const originalPositions = new Float32Array(particleCount * 3)

  useEffect(() => {
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const x = (Math.random() - 0.5) * 25
      const y = (Math.random() - 0.5) * 25
      const z = (Math.random() - 0.5) * 10
      
      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z
      
      originalPositions[i3] = x
      originalPositions[i3 + 1] = y
      originalPositions[i3 + 2] = z
    }
  }, [])

  useFrame((state) => {
    if (pointsRef.current && linesRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime
      
      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const baseX = originalPositions[i3]
        const baseY = originalPositions[i3 + 1]
        const baseZ = originalPositions[i3 + 2]
        
        positions[i3] = baseX + Math.sin(time * 0.5 + i) * 1
        positions[i3 + 1] = baseY + Math.cos(time * 0.7 + i * 0.5) * 1
        positions[i3 + 2] = baseZ + Math.sin(time * 0.3 + i * 0.3) * 0.5
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
      
      // Update connection lines
      const linePositions: number[] = []
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const x1 = positions[i3]
        const y1 = positions[i3 + 1]
        const z1 = positions[i3 + 2]
        
        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3
          const x2 = positions[j3]
          const y2 = positions[j3 + 1]
          const z2 = positions[j3 + 2]
          
          const distance = Math.sqrt(
            Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
          )
          
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            if (opacity > 0.1) {
              linePositions.push(x1, y1, z1, x2, y2, z2)
            }
          }
        }
      }
      
      if (linePositions.length > 0) {
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
        linesRef.current.geometry.dispose()
        linesRef.current.geometry = geometry
      }
    }
  })

  return (
    <group position={[0, 0, -6]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          color="#60a5fa"
          transparent
          opacity={0.6}
          sizeAttenuation={true}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}

export default function BackgroundAnimation() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) * 2 - 1) * 0.3
      const y = (-(e.clientY / window.innerHeight) * 2 + 1) * 0.3
      setMouse({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    // Ensure background always covers full viewport
    const updateSize = () => {
      if (containerRef.current) {
        containerRef.current.style.width = `${window.innerWidth}px`
        containerRef.current.style.height = `${window.innerHeight}px`
      }
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        dpr={[1, 2]}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#60a5fa" />
        <pointLight position={[-10, -10, -10]} intensity={0.25} color="#8b5cf6" />
        
        <GridPattern />
        <DotsPattern />
        <SquaresPattern />
        <WireframeStructure />
        <AdditionalWireframes />
        <ConnectingParticles />
      </Canvas>
    </div>
  )
}
