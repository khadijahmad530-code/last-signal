interface ScreenHeaderProps {
  id: string
  eyebrow: string
  title: string
  description: string
  children?: React.ReactNode
}

export function ScreenHeader({ id, eyebrow, title, description, children }: ScreenHeaderProps) {
  return (
    <header className="flex animate-fade-up flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="text-sm font-bold tracking-widest text-primary uppercase">{eyebrow}</p>
        <h1 id={id} className="mt-2 font-display text-4xl font-bold tracking-tight text-balance md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-pretty text-muted-foreground">{description}</p>
      </div>
      {children}
    </header>
  )
}
