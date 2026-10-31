import type { ChapterId, WorldId } from './game-data'

export type FallbackMachineKind = 'lunar-rover' | 'small-rover' | 'large-rover'

export interface ExplorerSite {
  world: WorldId
  /** Shown in the HUD, e.g. "Mars, Ares Vallis, 1997". */
  location: string
  /** GLB model path. If the file is missing, a low-poly fallback is rendered instead. */
  modelPath: string
  fallback: FallbackMachineKind
  /** Uniform scale applied to the loaded GLB so it fits the scene. */
  modelScale?: number
}

export const EXPLORER_SITES: Record<ChapterId, ExplorerSite> = {
  'apollo-lrv': {
    world: 'moon',
    location: 'Moon, Hadley-Apennine, 1971',
    modelPath: '/models/apollo-lrv.glb',
    fallback: 'lunar-rover',
  },
  sojourner: {
    world: 'mars',
    location: 'Mars, Ares Vallis, 1997',
    modelPath: '/models/sojourner.glb',
    fallback: 'small-rover',
  },
  opportunity: {
    world: 'mars',
    location: 'Mars, Meridiani Planum, 2004',
    modelPath: '/models/opportunity.glb',
    fallback: 'large-rover',
  },
}
