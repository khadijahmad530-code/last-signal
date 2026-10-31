'use client'

import { useState } from 'react'
import { Aperture, Check, Wind, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CATEGORY_LABELS, SHOP_ITEMS, type ShopCategory, type ShopItem } from '@/lib/game-data'
import { cn } from '@/lib/utils'
import { AstronautAvatar } from '../astronaut-avatar'
import { shopItemKey, useGame } from '../game-provider'
import { ScreenHeader } from '../screen-header'

const FILTERS: { value: ShopCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'suit', label: 'Suits' },
  { value: 'helmet', label: 'Helmets' },
  { value: 'sticker', label: 'Stickers' },
  { value: 'theme', label: 'Themes' },
]

export function ShopScreen() {
  const { points } = useGame()
  const [filter, setFilter] = useState<ShopCategory | 'all'>('all')
  const items = filter === 'all' ? SHOP_ITEMS : SHOP_ITEMS.filter((i) => i.category === filter)

  return (
    <section aria-labelledby="shop-title" className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <ScreenHeader
        id="shop-title"
        eyebrow="Supply Depot"
        title="Gear up for the journey"
        description="Spend the points you earn from missions on suits, helmets, rover stickers and profile themes."
      >
        <p className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-display text-lg font-bold text-accent">
          <Zap className="size-5 fill-accent" aria-hidden="true" />
          {points} points
        </p>
      </ScreenHeader>

      <div role="group" aria-label="Filter items" className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={cn(
              'shrink-0 rounded-full border px-4 py-2 text-base transition-colors',
              filter === value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card/60 text-muted-foreground hover:text-foreground',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.id} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
            <ShopCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function ShopCard({ item }: { item: ShopItem }) {
  const { points, isOwned, isEquipped, buyItem, equipItem } = useGame()
  const owned = isOwned(shopItemKey(item))
  const equipped = owned && isEquipped(item)
  const affordable = points >= item.price

  return (
    <article
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-3xl border bg-card/80 backdrop-blur transition-all hover:-translate-y-1',
        equipped ? 'border-primary shadow-[0_0_28px_oklch(0.8_0.12_190/0.25)]' : 'border-border',
      )}
    >
      <div
        className="relative flex aspect-[4/3] items-center justify-center"
        style={{ background: `radial-gradient(circle at 50% 35%, ${item.preview.from}55, ${item.preview.to}33 60%, transparent)` }}
      >
        <ItemPreview item={item} />
        <Badge variant="secondary" className="absolute top-3 left-3 rounded-full bg-background/80 px-2.5 py-1 text-sm">
          {CATEGORY_LABELS[item.category]}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h2 className="font-display text-lg leading-tight font-bold">{item.name}</h2>
        <p className="flex-1 text-base leading-relaxed text-muted-foreground">{item.description}</p>

        <div className="mt-3">
          {equipped ? (
            <Button disabled className="h-11 w-full rounded-full text-base font-bold disabled:opacity-100">
              <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              Equipped
            </Button>
          ) : owned ? (
            <Button
              variant="outline"
              onClick={() => equipItem(item)}
              className="h-11 w-full rounded-full border-primary/50 bg-transparent text-base font-bold text-primary hover:bg-primary/10 hover:text-primary"
            >
              Equip
            </Button>
          ) : (
            <Button
              onClick={() => buyItem(item)}
              disabled={!affordable}
              aria-label={`Buy ${item.name} for ${item.price} points`}
              className="h-11 w-full rounded-full bg-accent text-base font-bold text-accent-foreground hover:bg-accent/90"
            >
              <Zap className="size-4 fill-accent-foreground" aria-hidden="true" />
              {affordable ? `Buy · ${item.price}` : `${item.price} · need ${item.price - points} more`}
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

function ItemPreview({ item }: { item: ShopItem }) {
  const { avatar } = useGame()

  if (item.unlocks) {
    return (
      <div className="w-28">
        <AstronautAvatar config={{ ...avatar, ...item.unlocks }} />
      </div>
    )
  }

  if (item.category === 'sticker') {
    const Icon = item.id === 'sticker-wheels' ? Aperture : Wind
    return (
      <span
        className="flex size-24 -rotate-6 items-center justify-center rounded-full border-4 border-foreground/90 shadow-lg"
        style={{ background: `linear-gradient(135deg, ${item.preview.from}, ${item.preview.to})` }}
      >
        <Icon className="size-10 text-foreground" aria-hidden="true" />
      </span>
    )
  }

  return (
    <span
      className="flex size-24 items-center justify-center overflow-hidden rounded-full bg-secondary ring-4"
      style={{
        boxShadow: `0 0 32px ${item.preview.from}`,
        ['--tw-ring-color' as string]: item.preview.from,
      }}
    >
      <AstronautAvatar config={avatar} crop="head" />
    </span>
  )
}
