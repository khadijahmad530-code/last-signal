'use client'

import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { WorldId } from '@/lib/game-data'
import { getTerrain } from './terrain-math'
import { WORLD_PRESETS } from './world-presets'

interface Mark {
  x: number
  z: number
  yaw: number
}

function buildMarks(world: WorldId): Mark[] {
  const terrain = getTerrain(world)
  const style = WORLD_PRESETS[world].trackStyle
  const marks: Mark[] = []
  const steps = style === 'wheels' ? 110 : 44

  for (let i = 0; i < steps; i++) {
    const t = i / steps
    const p = terrain.pathPoint(t)
    const ahead = terrain.pathPoint(Math.min(1, t + 0.01))
    const yaw = Math.atan2(ahead.x - p.x, ahead.z - p.z)
    const nx = Math.cos(yaw)
    const nz = -Math.sin(yaw)

    if (style === 'wheels') {
      for (const side of [-0.32, 0.32]) {
        marks.push({ x: p.x + nx * side, z: p.z + nz * side, yaw })
      }
    } else {
      const side = i % 2 === 0 ? -0.14 : 0.14
      marks.push({ x: p.x + nx * side, z: p.z + nz * side, yaw })
    }
  }
  return marks
}

export function Tracks({ world }: { world: WorldId }) {
  const preset = WORLD_PRESETS[world]
  const marks = useMemo(() => buildMarks(world), [world])
  const ref = useRef<THREE.InstancedMesh>(null)
  const isWheels = preset.trackStyle === 'wheels'

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    const terrain = getTerrain(world)
    const dummy = new THREE.Object3D()
    marks.forEach((m, i) => {
      dummy.position.set(m.x, terrain.height(m.x, m.z) + 0.04, m.z)
      dummy.rotation.set(-Math.PI / 2, 0, m.yaw)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
    mesh.computeBoundingSphere()
  }, [marks, world])

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, marks.length]} receiveShadow>
      {isWheels ? <planeGeometry args={[0.16, 0.34]} /> : <circleGeometry args={[0.12, 8]} />}
      <meshStandardMaterial
        color={preset.track}
        transparent
        opacity={isWheels ? 0.55 : 0.7}
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-2}
        roughness={1}
      />
    </instancedMesh>
  )
}
