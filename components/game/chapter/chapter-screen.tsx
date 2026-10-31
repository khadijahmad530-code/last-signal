'use client'

import { useState } from 'react'
import { X, Zap } from 'lucide-react'
import { CHAPTERS } from '@/lib/game-data'
import { STORIES, QUIZ_POINTS } from '@/lib/story-data'
import { useGame } from '../game-provider'
import { CinematicHeader } from './cinematic-header'
import { StoryScene } from './story-scene'
import { RealLifeSummary } from './real-life-summary'
import { QuizStep } from './quiz-step'
import { ChapterResults } from './chapter-results'

export function ChapterScreen() {
  const { activeChapter, navigate, completeChapter, chapterStatus } = useGame()
  const chapter = CHAPTERS.find((c) => c.id === activeChapter) ?? CHAPTERS[0]
  const story = STORIES[chapter.id]

  const [step, setStep] = useState(0)
  const [earned, setEarned] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [isFirstTime] = useState(() => chapterStatus(chapter.id) !== 'completed')

  const sceneCount = story.scenes.length
  const summaryStep = sceneCount
  const quizStart = sceneCount + 1
  const resultsStep = quizStart + story.quiz.length
  const progress = Math.round((Math.min(step, resultsStep) / resultsStep) * 100)

  const stageLabel =
    step < summaryStep
      ? `Scene ${step + 1} of ${sceneCount}`
      : step === summaryStep
        ? 'Real-life record'
        : step < resultsStep
          ? `Question ${step - quizStart + 1} of ${story.quiz.length}`
          : 'Mission complete'

  const next = () => {
    setStep((s) => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const finishQuiz = (wasCorrect: boolean) => {
    const bonus = wasCorrect ? QUIZ_POINTS : 0
    const total = earned + bonus
    setEarned(total)
    if (wasCorrect) setCorrect((c) => c + 1)
    if (step === resultsStep - 1) completeChapter(chapter.id, total)
    next()
  }

  return (
    <section aria-labelledby="chapter-title" className="mx-auto w-full max-w-5xl px-4 py-6 md:px-6 md:py-10">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('missions')}
          aria-label="Leave chapter and return to the mission map"
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-card/70 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
            <span className="font-bold text-muted-foreground">{stageLabel}</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <div
            role="progressbar"
            aria-label="Chapter progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="h-2.5 overflow-hidden rounded-full bg-secondary"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_12px_oklch(0.8_0.12_190/0.6)] transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
          aria-live="polite"
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-2 font-display font-bold text-accent"
        >
          <Zap className="size-4 fill-accent" aria-hidden="true" />
          <span>
            +{earned}
            <span className="sr-only"> points earned this chapter</span>
          </span>
        </div>
      </div>

      {step < resultsStep && (
        <CinematicHeader
          chapter={chapter}
          tagline={story.tagline}
          setting={step < summaryStep ? story.scenes[step].setting : undefined}
        />
      )}

      <div className="mt-6">
        {step < summaryStep && (
          <StoryScene
            key={step}
            scene={story.scenes[step]}
            speaker={story.speaker}
            isLast={step === sceneCount - 1}
            onEarn={(pts) => setEarned((e) => e + pts)}
            onContinue={next}
          />
        )}
        {step === summaryStep && <RealLifeSummary summary={story.summary} onContinue={next} />}
        {step >= quizStart && step < resultsStep && (
          <QuizStep
            key={step}
            question={story.quiz[step - quizStart]}
            number={step - quizStart + 1}
            total={story.quiz.length}
            isLast={step === resultsStep - 1}
            onAnswered={finishQuiz}
          />
        )}
        {step === resultsStep && (
          <ChapterResults
            chapter={chapter}
            earned={earned}
            reward={isFirstTime ? chapter.reward : 0}
            correct={correct}
            total={story.quiz.length}
            onBack={() => navigate('missions')}
          />
        )}
      </div>
    </section>
  )
}
