'use client'

import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { WorldId } from '@/lib/game-data'
import { getTerrain, mulberry32 } from './terrain-math'
import { WORLD_PRESETS } from './world-presets'

const SIZE = 170
const SEGMENTS = 110

export function Terrain({ world }: { world: WorldId }) {
  const preset = WORLD_PRESETS[world]

  const geometry = useMemo(() => {
    const terrain = getTerrain(world)
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS)
    geo.rotateX(-Math.PI / 2)
    geo.translate(0, 0, -15)

    const pos = geo.attributes.position
    const colors = new Float32Array(pos.count * 3)
    const light = new THREE.Color(preset.groundLight)
    const dark = new THREE.Color(preset.groundDark)
    const color = new THREE.Color()
    const rand = mulberry32(7)

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      pos.setY(i, terrain.height(x, z))
      const mix = 0.25 + rand() * 0.25 + terrain.craterShade(x, z) * 0.45
      color.copy(light).lerp(dark, Math.min(1, mix))
      colors.set([color.r, color.g, color.b], i * 3)
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
  }, [world, preset])

  useLayoutEffect(() => () => geometry.dispose(), [geometry])

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors flatShading={world === 'moon'} roughness={1} metalness={0} />
    </mesh>
  )
}

export function Rocks({ world }: { world: WorldId }) {
  const preset = WORLD_PRESETS[world]
  const ref = useRef<THREE.InstancedMesh>(null)

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    const terrain = getTerrain(world)
    const rand = mulberry32(world === 'moon' ? 42 : 88)
    const dummy = new THREE.Object3D()

    let placed = 0
    while (placed < preset.rockCount) {
      const x = (rand() - 0.5) * 90
      const z = (rand() - 0.5) * 90 - 12
      if (Math.abs(x) < 3.2 && z > -18 && z < 18) continue
      const s = (0.15 + rand() * rand() * 1.6) * preset.rockScale
      dummy.position.set(x, terrain.height(x, z) - s * 0.25, z)
      dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI)
      dummy.scale.set(s * (0.8 + rand() * 0.6), s * (0.5 + rand() * 0.4), s * (0.8 + rand() * 0.6))
      dummy.updateMatrix()
      mesh.setMatrixAt(placed, dummy.matrix)
      placed++
    }
    mesh.instanceMatrix.needsUpdate = true
    mesh.computeBoundingSphere()
  }, [world, preset])

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, preset.rockCount]} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={preset.rock} roughness={0.95} flatShading />
    </instancedMesh>
  )
}
