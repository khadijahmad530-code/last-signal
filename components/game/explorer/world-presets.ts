import type { WorldId } from '@/lib/game-data'

export interface WorldPreset {
  sky: string
  fog?: { color: string; near: number; far: number }
  groundLight: string
  groundDark: string
  rock: string
  dust: string
  track: string
  sun: { color: string; intensity: number; position: [number, number, number] }
  ambient: number
  hemisphere?: { sky: string; ground: string; intensity: number }
  rockCount: number
  rockScale: number
  craterCount: number
  craterMaxRadius: number
  trackStyle: 'footprints' | 'wheels'
}

export const WORLD_PRESETS: Record<WorldId, WorldPreset> = {
  moon: {
    sky: '#020308',
    groundLight: '#9a9a9f',
    groundDark: '#55555b',
    rock: '#6f6f75',
    dust: '#a29e97',
    track: '#3b3b40',
    sun: { color: '#ffffff', intensity: 3.4, position: [30, 18, 12] },
    ambient: 0.07,
    rockCount: 45,
    rockScale: 0.45,
    craterCount: 26,
    craterMaxRadius: 10,
    trackStyle: 'footprints',
  },
  mars: {
    sky: '#cf9e6e',
    fog: { color: '#c99467', near: 16, far: 115 },
    groundLight: '#c06d41',
    groundDark: '#7e3d22',
    rock: '#6b3824',
    dust: '#c88b5f',
    track: '#7a3d21',
    sun: { color: '#ffeed8', intensity: 1.9, position: [-26, 22, -30] },
    ambient: 0.25,
    hemisphere: { sky: '#e8b98f', ground: '#6b3420', intensity: 0.7 },
    rockCount: 110,
    rockScale: 0.6,
    craterCount: 6,
    craterMaxRadius: 6,
    trackStyle: 'wheels',
  },
}

/** Where the abandoned machine rests and where the player starts. */
export const MACHINE_POSITION = { x: 0, z: -14 }
export const PLAYER_START = { x: 1.5, z: 8 }
export const EYE_HEIGHT = 1.6
export const NEAR_DISTANCE = 7
