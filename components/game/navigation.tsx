'use client'

import { Home, Map, ShoppingBag, UserRound, Zap, type LucideIcon } from 'lucide-react'
import type { Screen } from '@/lib/game-data'
import { cn } from '@/lib/utils'
import { AstronautAvatar } from './astronaut-avatar'
import { useGame } from './game-provider'

const NAV_ITEMS: { screen: Screen; label: string; icon: LucideIcon }[] = [
  { screen: 'home', label: 'Home', icon: Home },
  { screen: 'missions', label: 'Missions', icon: Map },
  { screen: 'shop', label: 'Shop', icon: ShoppingBag },
  { screen: 'creator', label: 'Profile', icon: UserRound },
]

const THEME_RINGS: Record<string, string> = {
  'theme-aurora': 'ring-primary shadow-[0_0_16px_oklch(0.8_0.12_190/0.5)]',
  'theme-orbit': 'ring-gold shadow-[0_0_16px_oklch(0.85_0.14_85/0.5)]',
}

export function TopBar() {
  const { screen, navigate, playerName, points, avatar, equippedTheme } = useGame()

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="flex items-center gap-2 rounded-lg font-display text-lg font-bold tracking-tight"
        >
          <span className="relative flex size-3" aria-hidden="true">
            <span className="absolute inset-0 animate-signal rounded-full bg-accent" />
            <span className="relative size-3 rounded-full bg-accent" />
          </span>
          Last Signal
        </button>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
            {NAV_ITEMS.map(({ screen: target, label, icon: Icon }) => {
              const active = screen === target
              return (
                <li key={target}>
                  <button
                    type="button"
                    onClick={() => navigate(target)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-2 rounded-full px-4 py-2 text-base transition-colors',
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 font-display font-bold text-accent"
            aria-label={`${points} points`}
          >
            <Zap className="size-4 fill-accent" aria-hidden="true" />
            <span aria-hidden="true">{points}</span>
          </div>
          <span className="hidden text-base font-bold sm:inline">{playerName}</span>
          <button
            type="button"
            onClick={() => navigate('creator')}
            aria-label={`Edit astronaut ${playerName}`}
            className={cn(
              'size-10 overflow-hidden rounded-full bg-secondary ring-2 ring-border',
              equippedTheme && THEME_RINGS[equippedTheme],
            )}
          >
            <AstronautAvatar config={avatar} crop="head" />
          </button>
        </div>
      </div>
    </header>
  )
}

export function BottomNav() {
  const { screen, navigate } = useGame()

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border/60 bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg md:hidden"
    >
      <ul className="grid grid-cols-4">
        {NAV_ITEMS.map(({ screen: target, label, icon: Icon }) => {
          const active = screen === target
          return (
            <li key={target}>
              <button
                type="button"
                onClick={() => navigate(target)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex w-full flex-col items-center gap-1 py-2.5 text-sm transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-14 items-center justify-center rounded-full transition-colors',
                    active && 'bg-primary/15',
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
