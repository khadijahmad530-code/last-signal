import { Check, Map, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Chapter } from '@/lib/game-data'

export function ChapterResults({
  chapter,
  earned,
  reward,
  correct,
  total,
  onBack,
}: {
  chapter: Chapter
  earned: number
  reward: number
  correct: number
  total: number
  onBack: () => void
}) {
  return (
    <article className="mx-auto flex max-w-xl animate-fade-up flex-col items-center py-6 text-center">
      <div className="relative flex size-52 items-center justify-center" aria-hidden="true">
        <span className="absolute inset-0 animate-burst rounded-full bg-gold/40" />
        <span className="absolute inset-4 animate-spin-slow rounded-full border-2 border-dashed border-gold/50" />
        <span className="absolute inset-8 rounded-full bg-gold/20 blur-2xl" />
        <span className="relative flex size-32 animate-badge-pop items-center justify-center rounded-full border-4 border-background/40 bg-gradient-to-br from-gold to-accent shadow-[0_0_60px_oklch(0.85_0.14_85/0.6)]">
          <Check className="size-16 text-accent-foreground" strokeWidth={3} />
        </span>
      </div>

      <p className="mt-4 text-sm font-bold tracking-[0.3em] text-gold uppercase">Memory Badge unlocked</p>
      <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-balance md:text-5xl">
        {chapter.name}
      </h2>
      <p className="mt-3 max-w-md text-lg text-muted-foreground text-pretty">
        You listened to its last signal. Now its story lives on with you.
      </p>

      <dl className="mt-8 grid w-full grid-cols-3 gap-3">
        <Stat label="Story & quiz" value={`+${earned}`} />
        <Stat label="Chapter reward" value={reward > 0 ? `+${reward}` : 'Claimed'} />
        <Stat label="Quiz score" value={`${correct}/${total}`} />
      </dl>

      <p className="mt-6 flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 font-display text-xl font-bold text-accent">
        <Zap className="size-5 fill-accent" aria-hidden="true" />
        {earned + reward} points earned
      </p>

      <Button
        onClick={onBack}
        className="mt-8 h-14 w-full rounded-full font-display text-lg font-bold shadow-[0_0_32px_oklch(0.8_0.12_190/0.35)] sm:w-auto sm:px-10"
      >
        <Map className="size-5" aria-hidden="true" />
        Back to Mission Map
      </Button>
    </article>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/80 p-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-display text-2xl font-bold">{value}</dd>
    </div>
  )
}
