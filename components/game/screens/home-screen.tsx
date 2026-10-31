'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Award, Map, Radio, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGame } from '../game-provider'

const STEPS = [
  {
    icon: UserRound,
    title: 'Create your astronaut',
    body: 'Pick a suit, a helmet and a badge. This is you, out there.',
  },
  {
    icon: Map,
    title: 'Choose a world',
    body: 'Travel to the Moon or Mars and find the machines that came before you.',
  },
  {
    icon: Radio,
    title: 'Relive their missions',
    body: 'Make the choices their engineers made and learn why they mattered.',
  },
  {
    icon: Award,
    title: 'Collect Memory Badges',
    body: 'Finish a chapter to earn points and keep its story alive.',
  },
]

export function HomeScreen() {
  const { navigate, isConfirmed, playerName } = useGame()
  const [showHowItWorks, setShowHowItWorks] = useState(false)

  return (
    <section
      aria-labelledby="home-title"
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[70%]">
        <Image
          src="/images/rover-silhouette.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[30%_bottom] opacity-60 [mask-image:linear-gradient(to_top,black_40%,transparent)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 pt-12 pb-40 text-center md:pb-48">
        <p className="mb-6 flex animate-fade-up items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inset-0 animate-signal rounded-full bg-primary" />
            <span className="relative size-2 rounded-full bg-primary" />
          </span>
          Incoming transmission
        </p>

        <h1
          id="home-title"
          className="animate-fade-up font-display text-6xl font-bold tracking-tight text-balance [animation-delay:100ms] sm:text-7xl md:text-8xl"
        >
          Last <span className="text-accent drop-shadow-[0_0_24px_oklch(0.76_0.15_55/0.5)]">Signal</span>
        </h1>

        <p className="mt-5 max-w-xl animate-fade-up text-xl leading-relaxed text-pretty text-muted-foreground [animation-delay:200ms] md:text-2xl">
          They never stopped sending. Will you listen?
        </p>

        <div className="mt-10 flex animate-fade-up flex-col items-center gap-4 [animation-delay:300ms]">
          <Button
            onClick={() => navigate(isConfirmed ? 'missions' : 'creator')}
            className="h-14 rounded-full px-8 font-display text-lg font-bold shadow-[0_0_40px_oklch(0.8_0.12_190/0.35)] hover:bg-primary/90 hover:shadow-[0_0_56px_oklch(0.8_0.12_190/0.5)]"
          >
            {isConfirmed ? `Continue, ${playerName}` : 'Start Mission'}
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
          <button
            type="button"
            onClick={() => setShowHowItWorks((v) => !v)}
            aria-expanded={showHowItWorks}
            aria-controls="how-it-works"
            className="rounded-md px-2 py-1 text-base text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-primary"
          >
            How it works
          </button>
        </div>

        {showHowItWorks && (
          <ol
            id="how-it-works"
            className="mt-10 grid w-full animate-fade-up gap-3 text-left sm:grid-cols-2"
          >
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <li
                key={title}
                className="flex gap-4 rounded-2xl border border-border bg-card/80 p-5 backdrop-blur"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display font-bold">
                    <span className="text-muted-foreground">{i + 1}. </span>
                    {title}
                  </p>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}
