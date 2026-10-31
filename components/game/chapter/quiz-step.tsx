'use client'

import { useState } from 'react'
import { ArrowRight, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QUIZ_POINTS, type QuizQuestion } from '@/lib/story-data'
import { cn } from '@/lib/utils'

export function QuizStep({
  question,
  number,
  total,
  isLast,
  onAnswered,
}: {
  question: QuizQuestion
  number: number
  total: number
  isLast: boolean
  onAnswered: (correct: boolean) => void
}) {
  const [picked, setPicked] = useState<number | null>(null)
  const answered = picked !== null
  const isCorrect = picked === question.answer

  return (
    <article className="mx-auto max-w-2xl animate-fade-up rounded-3xl border border-border bg-card/85 p-6 backdrop-blur md:p-8">
      <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
        Memory quiz · {number}/{total}
      </p>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">
        {question.question}
      </h2>

      <fieldset className="mt-6 flex flex-col gap-3" disabled={answered}>
        <legend className="sr-only">Choose an answer</legend>
        {question.options.map((option, i) => {
          const showCorrect = answered && i === question.answer
          const showWrong = answered && i === picked && !isCorrect
          return (
            <button
              key={option}
              type="button"
              onClick={() => setPicked(i)}
              aria-pressed={picked === i}
              className={cn(
                'flex min-h-16 w-full items-center justify-between gap-4 rounded-2xl border-2 bg-secondary/40 px-5 py-3 text-left text-lg font-bold transition-all',
                !answered && 'border-border hover:border-primary hover:bg-secondary',
                showCorrect && 'border-primary bg-primary/10 text-foreground',
                showWrong && 'border-destructive bg-destructive/10',
                answered && !showCorrect && !showWrong && 'border-transparent opacity-40',
              )}
            >
              {option}
              {showCorrect && <Check className="size-6 shrink-0 text-primary" strokeWidth={3} aria-label="Correct answer" />}
              {showWrong && <X className="size-6 shrink-0 text-destructive" strokeWidth={3} aria-label="Your answer, incorrect" />}
            </button>
          )
        })}
      </fieldset>

      {answered && (
        <div className="mt-6 animate-fade-up" aria-live="polite">
          <p
            className={cn(
              'rounded-2xl p-4 text-base leading-relaxed',
              isCorrect ? 'bg-primary/10 text-foreground' : 'bg-destructive/10 text-foreground',
            )}
          >
            <span className={cn('font-bold', isCorrect ? 'text-primary' : 'text-destructive')}>
              {isCorrect ? `Correct! +${QUIZ_POINTS} pts. ` : 'Not quite. '}
            </span>
            {question.explanation}
          </p>
          <Button
            onClick={() => onAnswered(isCorrect)}
            autoFocus
            className="mt-4 h-14 w-full rounded-full font-display text-lg font-bold"
          >
            {isLast ? 'See my results' : 'Next question'}
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        </div>
      )}
    </article>
  )
}
