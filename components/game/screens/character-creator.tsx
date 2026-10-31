'use client'

import { useState } from 'react'
import { Check, Lock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BADGES, HELMETS, SUITS, type Unlockable } from '@/lib/game-data'
import { cn } from '@/lib/utils'
import { AstronautAvatar, BADGE_ICONS } from '../astronaut-avatar'
import { useGame, type AvatarConfig, type UnlockKind } from '../game-provider'
import { ScreenHeader } from '../screen-header'

export function CharacterCreator() {
  const game = useGame()
  const [draft, setDraft] = useState<AvatarConfig>(game.avatar)
  const [name, setName] = useState(game.playerName)
  const [message, setMessage] = useState<string | null>(null)

  const owns = (kind: UnlockKind, item: Unlockable<string>) =>
    item.cost === 0 || game.isOwned(`${kind}:${item.id}`)

  const lockedParts = (
    [
      ['suit', SUITS.find((s) => s.id === draft.suit)!],
      ['helmet', HELMETS.find((h) => h.id === draft.helmet)!],
      ['badge', BADGES.find((b) => b.id === draft.badge)!],
    ] as const
  ).filter(([kind, item]) => !owns(kind, item))

  const select = (kind: UnlockKind, id: string) => {
    setMessage(null)
    setDraft((d) => ({ ...d, [kind]: id }) as AvatarConfig)
  }

  const handleUnlock = (kind: UnlockKind, item: Unlockable<string>) => {
    if (game.unlock(kind, item.id, item.cost)) setMessage(`${item.name} unlocked!`)
  }

  const renderGrid = <T extends string>(
    kind: UnlockKind,
    items: Unlockable<T>[],
    preview: (item: Unlockable<T>) => React.ReactNode,
    columns: string,
  ) => (
    <div role="group" aria-label={`${kind} options`} className={cn('grid gap-3', columns)}>
      {items.map((item) => {
        const selected = draft[kind] === item.id
        const locked = !owns(kind, item)
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => select(kind, item.id)}
            aria-pressed={selected}
            aria-label={`${item.name}${locked ? `, locked, ${item.cost} points` : ''}`}
            className={cn(
              'group relative flex flex-col items-center gap-2 rounded-2xl border-2 bg-secondary/50 p-3 text-center transition-all hover:-translate-y-0.5 hover:bg-secondary',
              selected ? 'border-primary bg-primary/10 shadow-[0_0_24px_oklch(0.8_0.12_190/0.25)]' : 'border-transparent',
            )}
          >
            <span className={cn('flex items-center justify-center', locked && 'opacity-50 grayscale-[40%]')}>
              {preview(item)}
            </span>
            <span className="text-sm leading-tight font-bold">{item.name}</span>
            {locked ? (
              <span className="flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-sm text-accent">
                <Lock className="size-3.5" aria-hidden="true" />
                {item.cost}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">{selected ? 'Selected' : 'Owned'}</span>
            )}
            {selected && (
              <span className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-4" aria-hidden="true" />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )

  return (
    <section aria-labelledby="creator-title" className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <ScreenHeader
        id="creator-title"
        eyebrow="Step 1 · Astronaut"
        title="Who answers the signal?"
        description="Design the young astronaut who will relive each mission. You can change this any time."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10">
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-border bg-card/70 p-8 backdrop-blur">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="relative w-full max-w-[280px] animate-float md:max-w-[320px]">
            <AstronautAvatar config={draft} title={`Preview of astronaut ${name || 'unnamed'}`} />
          </div>
          <div className="relative mt-6 rounded-full border border-border bg-background/70 px-5 py-2 text-center">
            <p className="font-display text-xl font-bold">{name || 'Unnamed astronaut'}</p>
          </div>
        </div>

        <div className="flex flex-col rounded-3xl border border-border bg-card/70 p-4 backdrop-blur md:p-6">
          <Tabs defaultValue="suit" className="gap-6">
            <TabsList className="grid w-full grid-cols-2 gap-1 rounded-2xl bg-background/60 p-1 group-data-horizontal/tabs:h-auto sm:grid-cols-4">
              {[
                ['suit', 'Suit Color'],
                ['helmet', 'Helmet Style'],
                ['badge', 'Badge'],
                ['name', 'Name'],
              ].map(([value, label]) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="rounded-xl py-2.5 text-base text-muted-foreground data-active:bg-primary data-active:text-primary-foreground"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="suit" className="animate-fade-up">
              {renderGrid(
                'suit',
                SUITS,
                (item) => {
                  const suit = SUITS.find((s) => s.id === item.id)!
                  return (
                    <span
                      className="size-14 rounded-full ring-4 ring-background/60"
                      style={{ background: `linear-gradient(135deg, ${suit.base}, ${suit.shade})` }}
                    />
                  )
                },
                'grid-cols-2 sm:grid-cols-3',
              )}
            </TabsContent>

            <TabsContent value="helmet" className="animate-fade-up">
              {renderGrid(
                'helmet',
                HELMETS,
                (item) => (
                  <span className="block size-20 overflow-hidden rounded-xl bg-background/50">
                    <AstronautAvatar config={{ ...draft, helmet: item.id }} crop="head" />
                  </span>
                ),
                'grid-cols-2',
              )}
            </TabsContent>

            <TabsContent value="badge" className="animate-fade-up">
              {renderGrid(
                'badge',
                BADGES,
                (item) => {
                  const Icon = BADGE_ICONS[item.id]
                  return (
                    <span className="flex size-14 items-center justify-center rounded-full border-2 border-gold bg-background text-gold">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                  )
                },
                'grid-cols-2',
              )}
            </TabsContent>

            <TabsContent value="name" className="animate-fade-up">
              <div className="flex flex-col gap-3 rounded-2xl bg-secondary/50 p-5">
                <Label htmlFor="astronaut-name" className="text-base font-bold">
                  Astronaut call sign
                </Label>
                <Input
                  id="astronaut-name"
                  value={name}
                  maxLength={16}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nova"
                  autoComplete="off"
                  className="h-12 rounded-xl bg-background/70 px-4 text-lg"
                  aria-describedby="name-hint"
                />
                <p id="name-hint" className="text-base text-muted-foreground">
                  Up to 16 characters. Use a nickname, not your real full name.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6" aria-live="polite">
            {lockedParts.map(([kind, item]) => (
              <div
                key={kind}
                className="flex flex-col gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="text-base">
                  <span className="font-bold">{item.name}</span> is a preview.{' '}
                  {game.points < item.cost
                    ? `You need ${item.cost - game.points} more points.`
                    : 'Unlock it to wear it on missions.'}
                </p>
                <Button
                  onClick={() => handleUnlock(kind, item)}
                  disabled={game.points < item.cost}
                  className="h-11 rounded-full bg-accent px-5 text-base font-bold text-accent-foreground hover:bg-accent/90"
                >
                  <Zap className="size-4" aria-hidden="true" />
                  Unlock for {item.cost}
                </Button>
              </div>
            ))}
            {message && <p className="text-base font-bold text-primary">{message}</p>}

            <Button
              onClick={() => game.confirmAstronaut(name, draft)}
              disabled={lockedParts.length > 0 || name.trim().length === 0}
              className="h-14 w-full rounded-full font-display text-lg font-bold shadow-[0_0_32px_oklch(0.8_0.12_190/0.3)] hover:bg-primary/90"
            >
              Confirm Astronaut
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
