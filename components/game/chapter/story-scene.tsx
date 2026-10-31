'use client'

import { useState } from 'react'
import { ArrowRight, Lightbulb, Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { StoryScene as Scene } from '@/lib/story-data'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C']

export function StoryScene({
  scene,
  speaker,
  isLast,
  onEarn,
  onContinue,
}: {
  scene: Scene
  speaker: string
  isLast: boolean
  onEarn: (points: number) => void
  onContinue: () => void
}) {
  const [picked, setPicked] = useState<number | null>(null)
  const choice = picked === null ? null : scene.choices[picked]

  const pick = (index: number) => {
    if (picked !== null) return
    setPicked(index)
    onEarn(scene.choices[index].points)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
      <div className="flex flex-col gap-5">
        <DialogueBox speaker={speaker} text={scene.line} />

        {choice && (
          <div className="animate-fade-up rounded-3xl border border-primary/30 bg-primary/5 p-5 md:p-6" aria-live="polite">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold tracking-widest text-primary uppercase">{speaker} replies</p>
              <span className="rounded-full bg-accent/15 px-3 py-1 font-display text-sm font-bold text-accent">
                +{choice.points} pts
              </span>
            </div>
            <p className="mt-2 text-lg leading-relaxed text-pretty">{choice.response}</p>
          </div>
        )}

        <fieldset className="flex flex-col gap-3" disabled={picked !== null}>
          <legend className="mb-3 text-base font-bold text-muted-foreground">
            {picked === null ? 'What do you do?' : 'Your choice'}
          </legend>
          {scene.choices.map((c, i) => {
            const isPicked = picked === i
            const isDimmed = picked !== null && !isPicked
            return (
              <button
                key={c.label}
                type="button"
                onClick={() => pick(i)}
                aria-pressed={isPicked}
                className={cn(
                  'group flex min-h-16 w-full items-center gap-4 rounded-2xl border-2 bg-card/80 px-4 py-3 text-left text-lg font-bold transition-all',
                  picked === null && 'border-border hover:-translate-y-0.5 hover:border-primary hover:bg-card hover:shadow-[0_0_24px_oklch(0.8_0.12_190/0.25)]',
                  isPicked && 'border-primary bg-primary/10',
                  isDimmed && 'border-transparent opacity-40',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex size-10 shrink-0 items-center justify-center rounded-xl font-display text-base',
                    isPicked ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground group-hover:text-foreground',
                  )}
                >
                  {LETTERS[i]}
                </span>
                {c.label}
              </button>
            )
          })}
        </fieldset>

        {choice && (
          <Button
            onClick={onContinue}
            autoFocus
            className="h-14 w-full animate-fade-up rounded-full font-display text-lg font-bold shadow-[0_0_32px_oklch(0.8_0.12_190/0.35)] sm:w-auto sm:self-end sm:px-10"
          >
            {isLast ? 'See what really happened' : 'Continue'}
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        )}
      </div>

      <FactCard fact={scene.fact} />
    </div>
  )
}

function DialogueBox({ speaker, text }: { speaker: string; text: string }) {
  return (
    <div className="animate-fade-up rounded-3xl border border-border bg-card/85 p-5 backdrop-blur md:p-7">
      <div className="flex items-center gap-3">
        <span className="relative flex size-11 items-center justify-center rounded-full bg-accent/15 text-accent">
          <span className="absolute inset-0 animate-signal rounded-full bg-accent/30" aria-hidden="true" />
          <Radio className="relative size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-lg font-bold leading-tight">{speaker}</p>
          <p className="text-sm text-muted-foreground">Incoming transmission</p>
        </div>
      </div>
      <blockquote className="mt-4 text-xl leading-relaxed text-pretty md:text-2xl md:leading-relaxed">
        {`“${text}”`}
      </blockquote>
    </div>
  )
}

function FactCard({ fact }: { fact: string }) {
  return (
    <aside
      aria-label="Did you know?"
      className="animate-slide-in rounded-3xl border border-gold/30 bg-gold/5 p-5 lg:sticky lg:top-24"
    >
      <p className="flex items-center gap-2 font-display text-base font-bold text-gold">
        <Lightbulb className="size-5" aria-hidden="true" />
        Did you know?
      </p>
      <p className="mt-2 text-base leading-relaxed text-pretty">{fact}</p>
    </aside>
  )
}
