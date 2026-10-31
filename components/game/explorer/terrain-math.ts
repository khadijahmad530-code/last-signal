import type { WorldId } from '@/lib/game-data'
import { MACHINE_POSITION, PLAYER_START, WORLD_PRESETS } from './world-presets'

export function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

interface Crater {
  x: number
  z: number
  r: number
  depth: number
}

export interface Terrain {
  height: (x: number, z: number) => number
  /** 0 on open ground, 1 at the bottom of a crater. Used for shading. */
  craterShade: (x: number, z: number) => number
  /** Gentle curve the tracks follow, from behind the player to the machine. */
  pathPoint: (t: number) => { x: number; z: number }
}

function isNearPath(x: number, z: number, margin: number) {
  return Math.abs(x) < 5 + margin && z > MACHINE_POSITION.z - 6 - margin && z < PLAYER_START.z + 6 + margin
}

const cache = new Map<WorldId, Terrain>()

export function getTerrain(world: WorldId): Terrain {
  const cached = cache.get(world)
  if (cached) return cached

  const preset = WORLD_PRESETS[world]
  const rand = mulberry32(world === 'moon' ? 1969 : 1997)
  const craters: Crater[] = []
  while (craters.length < preset.craterCount) {
    const r = 1.5 + rand() * preset.craterMaxRadius
    const x = (rand() - 0.5) * 140
    const z = (rand() - 0.5) * 140 - 15
    if (isNearPath(x, z, r)) continue
    craters.push({ x, z, r, depth: r * (0.12 + rand() * 0.1) })
  }

  const isMars = world === 'mars'

  const base = (x: number, z: number) => {
    const dunes = isMars
      ? Math.sin(x * 0.045 + z * 0.02) * 1.3 + Math.sin(x * 0.11 - z * 0.07) * 0.45
      : Math.sin(x * 0.05) * Math.cos(z * 0.04) * 0.9 + Math.sin(x * 0.13 + z * 0.09) * 0.3
    const detail = Math.sin(x * 0.37 - z * 0.29) * 0.08 + Math.sin(x * 0.71 + z * 0.53) * 0.04
    const dist = Math.hypot(x, z + 14)
    const distantHills = smoothstep(42, 80, dist) * (isMars ? 9 : 5) * (0.6 + 0.4 * Math.sin(x * 0.06 + z * 0.03))
    const pathFlatten = isNearPath(x, z, 0) ? 0.35 : 1
    return (dunes + detail) * pathFlatten + distantHills
  }

  const craterOffset = (x: number, z: number) => {
    let h = 0
    for (const c of craters) {
      const d = Math.hypot(x - c.x, z - c.z) / c.r
      if (d > 1.8) continue
      if (d < 1) h -= c.depth * (1 - d * d)
      h += c.depth * 0.35 * Math.exp(-((d - 1) * (d - 1)) / 0.06)
    }
    return h
  }

  const terrain: Terrain = {
    height: (x, z) => base(x, z) + craterOffset(x, z),
    craterShade: (x, z) => {
      let shade = 0
      for (const c of craters) {
        const d = Math.hypot(x - c.x, z - c.z) / c.r
        if (d < 1) shade = Math.max(shade, 1 - d)
      }
      return shade
    },
    pathPoint: (t) => {
      const startZ = PLAYER_START.z + 10
      const endZ = MACHINE_POSITION.z + 1.4
      return {
        x: MACHINE_POSITION.x + Math.sin(t * Math.PI * 1.2) * 1.8,
        z: startZ + (endZ - startZ) * t,
      }
    },
  }

  cache.set(world, terrain)
  return terrain
}
