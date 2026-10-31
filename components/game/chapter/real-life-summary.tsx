import { ArrowRight, ImageIcon, Satellite } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ChapterStory } from '@/lib/story-data'

export function RealLifeSummary({
  summary,
  onContinue,
}: {
  summary: ChapterStory['summary']
  onContinue: () => void
}) {
  return (
    <article className="animate-fade-up overflow-hidden rounded-3xl border border-border bg-card/85 backdrop-blur">
      <div className="grid md:grid-cols-2">
        <figure className="flex flex-col">
          <div className="relative flex aspect-[4/3] flex-1 flex-col items-center justify-center gap-3 border-b border-dashed border-border bg-[repeating-linear-gradient(135deg,transparent_0_14px,oklch(0.96_0.01_250/0.03)_14px_28px)] p-6 text-center text-muted-foreground md:border-r md:border-b-0">
            <ImageIcon className="size-10" aria-hidden="true" />
            <p className="text-base font-bold">Archival image coming soon</p>
          </div>
          <figcaption className="px-6 py-3 text-sm text-muted-foreground md:border-r md:border-border md:border-dashed">
            {summary.imageCaption}
          </figcaption>
        </figure>

        <div className="flex flex-col p-6 md:p-8">
          <p className="flex items-center gap-2 text-sm font-bold tracking-widest text-primary uppercase">
            <Satellite className="size-4" aria-hidden="true" />
            Mission record
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">{summary.title}</h2>
          <div className="mt-4 flex flex-col gap-3 text-lg leading-relaxed text-pretty">
            {summary.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-2">
            {summary.stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-secondary/60 p-3">
                <dt className="text-sm text-muted-foreground">{s.label}</dt>
                <dd className="mt-1 font-display text-lg font-bold text-accent">{s.value}</dd>
              </div>
            ))}
          </dl>

          <Button
            onClick={onContinue}
            className="mt-8 h-14 w-full rounded-full font-display text-lg font-bold shadow-[0_0_32px_oklch(0.8_0.12_190/0.35)]"
          >
            Start the memory quiz
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </article>
  )
}
