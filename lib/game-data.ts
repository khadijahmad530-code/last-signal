export type Screen = 'home' | 'creator' | 'missions' | 'shop'

export type SuitId = 'white' | 'teal' | 'orange' | 'navy' | 'gold' | 'violet'
export type HelmetId = 'classic' | 'visor' | 'explorer' | 'retro'
export type BadgeId = 'star' | 'rocket' | 'crescent' | 'signal'

export interface Unlockable<T extends string> {
  id: T
  name: string
  cost: number
}

export interface SuitOption extends Unlockable<SuitId> {
  base: string
  shade: string
}

export const SUITS: SuitOption[] = [
  { id: 'white', name: 'Classic White', cost: 0, base: '#e8edf5', shade: '#b7c1d3' },
  { id: 'teal', name: 'Signal Teal', cost: 0, base: '#5fd4cf', shade: '#2f9e9b' },
  { id: 'orange', name: 'Rescue Orange', cost: 0, base: '#f5a04a', shade: '#c56f22' },
  { id: 'navy', name: 'Night Shift', cost: 0, base: '#4a5b8c', shade: '#2f3c63' },
  { id: 'gold', name: 'Solar Gold', cost: 250, base: '#f2cf63', shade: '#c19b2e' },
  { id: 'violet', name: 'Nebula Violet', cost: 300, base: '#a58cf0', shade: '#6f58c2' },
]

export const HELMETS: Unlockable<HelmetId>[] = [
  { id: 'classic', name: 'Classic Dome', cost: 0 },
  { id: 'visor', name: 'Wide Visor', cost: 0 },
  { id: 'explorer', name: 'Explorer', cost: 200 },
  { id: 'retro', name: 'Retro Bubble', cost: 350 },
]

export const BADGES: Unlockable<BadgeId>[] = [
  { id: 'star', name: 'North Star', cost: 0 },
  { id: 'rocket', name: 'First Launch', cost: 0 },
  { id: 'crescent', name: 'Crescent', cost: 150 },
  { id: 'signal', name: 'Deep Signal', cost: 250 },
]

export type WorldId = 'moon' | 'mars'
export type ChapterId = 'apollo-lrv' | 'sojourner' | 'opportunity'

export interface Chapter {
  id: ChapterId
  world: WorldId
  name: string
  year: number
  teaser: string
  difficulty: 1 | 2 | 3
  reward: number
  /** Marker position on the planet illustration, in percent. */
  position: { x: number; y: number }
  requires?: ChapterId
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'apollo-lrv',
    world: 'moon',
    name: 'Apollo Lunar Rover',
    year: 1971,
    teaser: 'The first car ever driven on another world is still parked where they left it.',
    difficulty: 1,
    reward: 100,
    position: { x: 38, y: 42 },
  },
  {
    id: 'sojourner',
    world: 'mars',
    name: 'Sojourner',
    year: 1997,
    teaser: 'Small as a microwave, brave as a giant. Its last message was never finished.',
    difficulty: 2,
    reward: 150,
    position: { x: 34, y: 38 },
  },
  {
    id: 'opportunity',
    world: 'mars',
    name: 'Opportunity',
    year: 2004,
    teaser: 'Built for 90 days, it kept exploring for almost 15 years.',
    difficulty: 3,
    reward: 200,
    position: { x: 62, y: 60 },
    requires: 'sojourner',
  },
]

export const WORLDS: Record<WorldId, { name: string; image: string; caption: string }> = {
  moon: {
    name: 'The Moon',
    image: '/images/moon.png',
    caption: '384,400 km from home',
  },
  mars: {
    name: 'Mars',
    image: '/images/mars.png',
    caption: 'About 225 million km from home',
  },
}

export type ShopCategory = 'suit' | 'helmet' | 'sticker' | 'theme'

export interface ShopItem {
  id: string
  name: string
  category: ShopCategory
  price: number
  description: string
  /** Links the item to an avatar part so buying it unlocks it in the creator. */
  unlocks?: { suit: SuitId } | { helmet: HelmetId }
  preview: { from: string; to: string }
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'suit-gold',
    name: 'Solar Gold Suit',
    category: 'suit',
    price: 250,
    description: 'Shines like sunrise over Gale Crater.',
    unlocks: { suit: 'gold' },
    preview: { from: '#f2cf63', to: '#8a6a1a' },
  },
  {
    id: 'suit-violet',
    name: 'Nebula Violet Suit',
    category: 'suit',
    price: 300,
    description: 'Woven from the colors of distant gas clouds.',
    unlocks: { suit: 'violet' },
    preview: { from: '#a58cf0', to: '#3e2f7a' },
  },
  {
    id: 'helmet-explorer',
    name: 'Explorer Helmet',
    category: 'helmet',
    price: 200,
    description: 'Comes with a headlamp and a tiny antenna.',
    unlocks: { helmet: 'explorer' },
    preview: { from: '#5fd4cf', to: '#174a5c' },
  },
  {
    id: 'helmet-retro',
    name: 'Retro Bubble Helmet',
    category: 'helmet',
    price: 350,
    description: 'Straight out of a 1960s comic book.',
    unlocks: { helmet: 'retro' },
    preview: { from: '#9fd8ff', to: '#1f3a66' },
  },
  {
    id: 'sticker-wheels',
    name: 'Twin Wheels Sticker',
    category: 'sticker',
    price: 80,
    description: 'Track marks that never fade.',
    preview: { from: '#f5a04a', to: '#5c2b12' },
  },
  {
    id: 'sticker-dust',
    name: 'Red Dust Sticker',
    category: 'sticker',
    price: 120,
    description: 'For rovers that survived the storms.',
    preview: { from: '#e46a4a', to: '#4a1a14' },
  },
  {
    id: 'theme-aurora',
    name: 'Aurora Profile',
    category: 'theme',
    price: 150,
    description: 'Soft teal light around your profile.',
    preview: { from: '#5fd4cf', to: '#2a2f7a' },
  },
  {
    id: 'theme-orbit',
    name: 'Deep Orbit Profile',
    category: 'theme',
    price: 220,
    description: 'Golden rings for seasoned explorers.',
    preview: { from: '#f2cf63', to: '#1c2240' },
  },
]

export const CATEGORY_LABELS: Record<ShopCategory, string> = {
  suit: 'Suit',
  helmet: 'Helmet',
  sticker: 'Rover sticker',
  theme: 'Profile theme',
}
