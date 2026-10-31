'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  CHAPTERS,
  type BadgeId,
  type ChapterId,
  type HelmetId,
  type Screen,
  type ShopItem,
  type SuitId,
} from '@/lib/game-data'

export interface AvatarConfig {
  suit: SuitId
  helmet: HelmetId
  badge: BadgeId
}

export type UnlockKind = 'suit' | 'helmet' | 'badge'

interface GameState {
  screen: Screen
  playerName: string
  points: number
  avatar: AvatarConfig
  completed: ChapterId[]
  equippedSticker: string | null
  equippedTheme: string | null
  isConfirmed: boolean
}

interface GameContextValue extends GameState {
  navigate: (screen: Screen) => void
  confirmAstronaut: (name: string, avatar: AvatarConfig) => void
  isOwned: (key: string) => boolean
  unlock: (kind: UnlockKind, id: string, cost: number) => boolean
  buyItem: (item: ShopItem) => boolean
  equipItem: (item: ShopItem) => void
  isEquipped: (item: ShopItem) => boolean
  completeChapter: (id: ChapterId) => void
  chapterStatus: (id: ChapterId) => 'completed' | 'available' | 'locked'
}

const GameContext = createContext<GameContextValue | null>(null)

export function shopItemKey(item: ShopItem) {
  if (item.unlocks && 'suit' in item.unlocks) return `suit:${item.unlocks.suit}`
  if (item.unlocks && 'helmet' in item.unlocks) return `helmet:${item.unlocks.helmet}`
  return `item:${item.id}`
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>({
    screen: 'home',
    playerName: 'Nova',
    points: 420,
    avatar: { suit: 'teal', helmet: 'classic', badge: 'star' },
    completed: ['apollo-lrv'],
    equippedSticker: 'sticker-wheels',
    equippedTheme: 'theme-aurora',
    isConfirmed: false,
  })
  const [owned, setOwned] = useState<Set<string>>(
    () => new Set(['item:sticker-wheels', 'item:theme-aurora']),
  )

  const navigate = useCallback((screen: Screen) => {
    setState((s) => ({ ...s, screen }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const confirmAstronaut = useCallback((name: string, avatar: AvatarConfig) => {
    setState((s) => ({
      ...s,
      playerName: name.trim() || s.playerName,
      avatar,
      isConfirmed: true,
      screen: 'missions',
    }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const isOwned = useCallback((key: string) => owned.has(key), [owned])

  const spend = useCallback(
    (key: string, cost: number) => {
      if (owned.has(key) || state.points < cost) return false
      setOwned((prev) => new Set(prev).add(key))
      setState((s) => ({ ...s, points: s.points - cost }))
      return true
    },
    [owned, state.points],
  )

  const unlock = useCallback(
    (kind: UnlockKind, id: string, cost: number) => spend(`${kind}:${id}`, cost),
    [spend],
  )

  const buyItem = useCallback((item: ShopItem) => spend(shopItemKey(item), item.price), [spend])

  const equipItem = useCallback((item: ShopItem) => {
    setState((s) => {
      if (item.unlocks && 'suit' in item.unlocks)
        return { ...s, avatar: { ...s.avatar, suit: item.unlocks.suit } }
      if (item.unlocks && 'helmet' in item.unlocks)
        return { ...s, avatar: { ...s.avatar, helmet: item.unlocks.helmet } }
      if (item.category === 'sticker') return { ...s, equippedSticker: item.id }
      return { ...s, equippedTheme: item.id }
    })
  }, [])

  const isEquipped = useCallback(
    (item: ShopItem) => {
      if (item.unlocks && 'suit' in item.unlocks) return state.avatar.suit === item.unlocks.suit
      if (item.unlocks && 'helmet' in item.unlocks)
        return state.avatar.helmet === item.unlocks.helmet
      if (item.category === 'sticker') return state.equippedSticker === item.id
      return state.equippedTheme === item.id
    },
    [state.avatar, state.equippedSticker, state.equippedTheme],
  )

  const chapterStatus = useCallback(
    (id: ChapterId) => {
      if (state.completed.includes(id)) return 'completed' as const
      const chapter = CHAPTERS.find((c) => c.id === id)
      if (chapter?.requires && !state.completed.includes(chapter.requires)) return 'locked' as const
      return 'available' as const
    },
    [state.completed],
  )

  const completeChapter = useCallback((id: ChapterId) => {
    const chapter = CHAPTERS.find((c) => c.id === id)
    setState((s) =>
      s.completed.includes(id)
        ? s
        : { ...s, completed: [...s.completed, id], points: s.points + (chapter?.reward ?? 0) },
    )
  }, [])

  const value = useMemo<GameContextValue>(
    () => ({
      ...state,
      navigate,
      confirmAstronaut,
      isOwned,
      unlock,
      buyItem,
      equipItem,
      isEquipped,
      completeChapter,
      chapterStatus,
    }),
    [
      state,
      navigate,
      confirmAstronaut,
      isOwned,
      unlock,
      buyItem,
      equipItem,
      isEquipped,
      completeChapter,
      chapterStatus,
    ],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>')
  return ctx
}
