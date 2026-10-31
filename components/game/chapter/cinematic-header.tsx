import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { WORLDS, type Chapter } from '@/lib/game-data'
import { cn } from '@/lib/utils'

export function CinematicHeader({
  chapter,
  tagline,
  setting,
}: {
  chapter: Chapter
  tagline: string
  setting?: string
}) {
  const isMars = chapter.world === 'mars'

  return (
    <header className="relative mt-6 overflow-hidden rounded-3xl border border-border bg-card/60">
      <Image
        src={WORLDS[chapter.world].image}
        alt=""
        width={480}
        height={480}
        priority
        className="pointer-events-none absolute -top-1/3 -right-24 size-[22rem] rounded-full object-cover opacity-50 [mask-image:radial-gradient(circle,black_55%,transparent_70%)] md:-right-10 md:size-[28rem]"
      />
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent',
        )}
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-background" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2 bg-background" />

      <div className="relative px-6 py-8 md:px-10 md:py-12">
        <p
          className={cn(
            'text-sm font-bold tracking-[0.3em] uppercase',
            isMars ? 'text-accent' : 'text-primary',
          )}
        >
          {WORLDS[chapter.world].name} · {chapter.year}
        </p>
        <h1
          id="chapter-title"
          className="mt-2 font-display text-4xl font-bold tracking-tight text-balance md:text-6xl"
        >
          {chapter.name}
        </h1>
        <p className="mt-2 max-w-md text-lg text-muted-foreground text-pretty">{tagline}</p>
        {setting && (
          <p
            key={setting}
            className="mt-5 inline-flex animate-fade-up items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-base backdrop-blur"
          >
            <MapPin className="size-4 text-accent" aria-hidden="true" />
            {setting}
          </p>
        )}
      </div>
    </header>
  )
}
