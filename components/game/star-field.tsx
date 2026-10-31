function seeded(seed: number) {
  let t = seed
  return () => {
    t = (t * 16807) % 2147483647
    return (t - 1) / 2147483646
  }
}

interface Star {
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

function makeStars(count: number, seed: number): Star[] {
  const rand = seeded(seed)
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    size: rand() * 2 + 0.8,
    delay: rand() * 6,
    duration: 3 + rand() * 4,
  }))
}

const TWINKLING = makeStars(70, 42)
const DRIFTING = makeStars(40, 7)

export function StarField() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.22_0.06_250/0.7),transparent_60%),radial-gradient(ellipse_at_bottom_right,oklch(0.3_0.08_45/0.25),transparent_55%)]" />

      {TWINKLING.map((s, i) => (
        <span
          key={`t-${i}`}
          className="absolute animate-twinkle rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      <div className="absolute inset-y-0 left-0 flex w-[200%] animate-drift">
        {[0, 1].map((half) => (
          <div key={half} className="relative h-full w-1/2">
            {DRIFTING.map((s, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-primary/70"
                style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size * 0.8, height: s.size * 0.8 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
