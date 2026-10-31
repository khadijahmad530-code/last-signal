'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Lock, Play, RotateCcw, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CHAPTERS, WORLDS, type Chapter, type ChapterId, type WorldId } from '@/lib/game-data'
import { cn } from '@/lib/utils'
import { useGame } from '../game-provider'
import { ScreenHeader } from '../screen-header'

type Status = 'completed' | 'available' | 'locked'

export function MissionMap() {
  const { chapterStatus, completed } = useGame()
  const [world, setWorld] = useState<WorldId>('mars')
  const [selectedId, setSelectedId] = useState<ChapterId>('sojourner')

  const chapters = CHAPTERS.filter((c) => c.world === world)
  const selected = chapters.find((c) => c.id === selectedId) ?? chapters[0]

  const switchWorld = (next: WorldId) => {
    setWorld(next)
    setSelectedId(CHAPTERS.find((c) => c.world === next)!.id)
  }

  return (
    <section aria-labelledby="map-title" className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <ScreenHeader
        id="map-title"
        eyebrow="Mission Map"
        title="Where will you listen first?"
        description="Each glowing marker is a machine that once sent messages home. Tap one to hear its story."
      >
        <p className="flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-base text-gold">
          <Check className="size-4" aria-hidden="true" />
          {completed.length} of {CHAPTERS.length} Memory Badges
        </p>
      </ScreenHeader>

      <div role="group" aria-label="Choose a world" className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
        {(Object.keys(WORLDS) as WorldId[]).map((id) => {
          const active = world === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => switchWorld(id)}
              aria-pressed={active}
              className={cn(
                'flex items-center gap-3 rounded-2xl border-2 bg-card/70 p-3 text-left transition-all',
                active
                  ? id === 'mars'
                    ? 'border-accent shadow-[0_0_24px_oklch(0.76_0.15_55/0.3)]'
                    : 'border-primary shadow-[0_0_24px_oklch(0.8_0.12_190/0.3)]'
                  : 'border-transparent hover:bg-card',
              )}
            >
              <Image src={WORLDS[id].image} alt="" width={44} height={44} className="rounded-full" />
              <span>
                <span className="block font-display text-lg font-bold">{WORLDS[id].name}</span>
                <span className="block text-sm text-muted-foreground">
                    {(() => {
                      const count = CHAPTERS.filter((c) => c.world === id).length
                      return `${count} ${count === 1 ? 'chapter' : 'chapters'}`
                    })()}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 grid items-center gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
        <div className="relative mx-auto aspect-square w-full max-w-[560px]">
          <div
            aria-hidden="true"
            className={cn(
              'absolute inset-[12%] rounded-full blur-3xl',
              world === 'mars' ? 'bg-accent/25' : 'bg-primary/20',
            )}
          />
          <Image
            key={world}
            src={WORLDS[world].image}
            alt={`Illustration of ${WORLDS[world].name}`}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="animate-in fade-in zoom-in-95 rounded-full object-cover duration-700 [mask-image:radial-gradient(circle,black_62%,transparent_71%)]"
          />
          {chapters.map((chapter) => (
            <MapMarker
              key={chapter.id}
              chapter={chapter}
              status={chapterStatus(chapter.id)}
              selected={chapter.id === selected.id}
              onSelect={() => setSelectedId(chapter.id)}
            />
          ))}
          <p className="absolute inset-x-0 bottom-0 text-center text-sm text-muted-foreground">
            {WORLDS[world].caption}
          </p>
        </div>

        <ChapterCard key={selected.id} chapter={selected} status={chapterStatus(selected.id)} />
      </div>

      <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-base text-muted-foreground lg:justify-start" aria-label="Map legend">
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-primary" aria-hidden="true" /> Available
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-gold" aria-hidden="true" /> Memory Badge earned
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-muted-foreground/40" aria-hidden="true" /> Locked
        </li>
      </ul>
    </section>
  )
}

function MapMarker({
  chapter,
  status,
  selected,
  onSelect,
}: {
  chapter: Chapter
  status: Status
  selected: boolean
  onSelect: () => void
}) {
  const statusLabel = { completed: 'completed', available: 'available', locked: 'locked' }[status]

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${chapter.name}, ${chapter.year}, ${statusLabel}`}
      className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-full"
      style={{ left: `${chapter.position.x}%`, top: `${chapter.position.y}%` }}
    >
      <span className="relative flex size-11 items-center justify-center">
        {status === 'available' && (
          <>
            <span className="absolute inset-0 animate-signal rounded-full bg-primary/60" />
            <span className="absolute inset-0 animate-signal rounded-full bg-primary/40 [animation-delay:1.2s]" />
          </>
        )}
        <span
          className={cn(
            'relative flex size-11 items-center justify-center rounded-full border-2 transition-transform group-hover:scale-110',
            status === 'available' && 'border-primary-foreground/20 bg-primary text-primary-foreground shadow-[0_0_24px_oklch(0.8_0.12_190/0.8)]',
            status === 'completed' && 'border-background/40 bg-gold text-accent-foreground shadow-[0_0_24px_oklch(0.85_0.14_85/0.7)]',
            status === 'locked' && 'border-border bg-background/80 text-muted-foreground',
            selected && 'scale-110 ring-4 ring-foreground/80',
          )}
        >
          {status === 'completed' && <Check className="size-5" strokeWidth={3} aria-hidden="true" />}
          {status === 'locked' && <Lock className="size-4" aria-hidden="true" />}
          {status === 'available' && <span className="size-2.5 rounded-full bg-primary-foreground" aria-hidden="true" />}
        </span>
      </span>
      <span
        className={cn(
          'rounded-full bg-background/85 px-3 py-1 text-sm font-bold whitespace-nowrap backdrop-blur',
          status === 'locked' && 'text-muted-foreground',
        )}
      >
        {chapter.name}
      </span>
    </button>
  )
}

function ChapterCard({ chapter, status }: { chapter: Chapter; status: Status }) {
  const { completeChapter } = useGame()
  const [justPlayed, setJustPlayed] = useState(false)
  const requirement = CHAPTERS.find((c) => c.id === chapter.requires)

  const begin = () => {
    completeChapter(chapter.id)
    setJustPlayed(true)
  }

  return (
    <article
      aria-live="polite"
      className={cn(
        'animate-fade-up rounded-3xl border bg-card/80 p-6 backdrop-blur md:p-8',
        status === 'completed' ? 'border-gold/40' : 'border-border',
        status === 'locked' && 'opacity-75',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
            Chapter · {chapter.year}
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">{chapter.name}</h2>
        </div>
        {status === 'completed' && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-sm font-bold text-accent-foreground">
            <Check className="size-4" strokeWidth={3} aria-hidden="true" />
            Memory Badge
          </span>
        )}
        {status === 'locked' && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
            <Lock className="size-4" aria-hidden="true" />
            Locked
          </span>
        )}
      </div>

      <p className="mt-4 text-lg leading-relaxed text-pretty">{chapter.teaser}</p>

      <dl className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-secondary/60 p-4">
          <dt className="text-sm text-muted-foreground">Difficulty</dt>
          <dd className="mt-1 flex gap-1" aria-label={`${chapter.difficulty} out of 3`}>
            {[1, 2, 3].map((n) => (
              <Star
                key={n}
                aria-hidden="true"
                className={cn('size-5', n <= chapter.difficulty ? 'fill-accent text-accent' : 'text-muted-foreground/40')}
              />
            ))}
          </dd>
        </div>
        <div className="rounded-2xl bg-secondary/60 p-4">
          <dt className="text-sm text-muted-foreground">Reward</dt>
          <dd className="mt-1 flex items-center gap-1 font-display text-lg font-bold text-accent">
            <Zap className="size-4 fill-accent" aria-hidden="true" />
            {chapter.reward} pts
          </dd>
        </div>
      </dl>

      {justPlayed && (
        <p className="mt-6 rounded-2xl border border-gold/40 bg-gold/10 p-4 text-base text-gold">
          Signal received. You earned the {chapter.name} Memory Badge and {chapter.reward} points.
          <span className="block text-muted-foreground">(Chapter gameplay coming soon.)</span>
        </p>
      )}

      <div className="mt-6">
        {status === 'locked' ? (
          <Button disabled className="h-14 w-full rounded-full text-lg font-bold">
            <Lock className="size-5" aria-hidden="true" />
            Complete {requirement?.name} to unlock
          </Button>
        ) : status === 'completed' ? (
          <Button
            variant="outline"
            className="h-14 w-full rounded-full border-gold/50 bg-transparent text-lg font-bold text-gold hover:bg-gold/10 hover:text-gold"
          >
            <RotateCcw className="size-5" aria-hidden="true" />
            Replay Chapter
          </Button>
        ) : (
          <Button
            onClick={begin}
            className="h-14 w-full rounded-full font-display text-lg font-bold shadow-[0_0_32px_oklch(0.8_0.12_190/0.35)] hover:bg-primary/90"
          >
            <Play className="size-5 fill-primary-foreground" aria-hidden="true" />
            Begin Chapter
          </Button>
        )}
      </div>
    </article>
  )
}
