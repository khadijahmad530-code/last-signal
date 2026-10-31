import { useId } from 'react'
import { Moon, RadioTower, Rocket, Star, type LucideIcon } from 'lucide-react'
import { SUITS, type BadgeId } from '@/lib/game-data'
import type { AvatarConfig } from './game-provider'
import { cn } from '@/lib/utils'

export const BADGE_ICONS: Record<BadgeId, LucideIcon> = {
  star: Star,
  rocket: Rocket,
  crescent: Moon,
  signal: RadioTower,
}

interface AstronautAvatarProps {
  config: AvatarConfig
  className?: string
  title?: string
  crop?: 'full' | 'head'
}

export function AstronautAvatar({ config, className, title, crop = 'full' }: AstronautAvatarProps) {
  const uid = useId().replace(/:/g, '')
  const suit = SUITS.find((s) => s.id === config.suit) ?? SUITS[0]
  const BadgeIcon = BADGE_ICONS[config.badge]

  return (
    <svg
      viewBox={crop === 'head' ? '30 0 140 140' : '0 0 200 220'}
      className={cn('h-auto w-full', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={`gold-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd88a" />
          <stop offset="55%" stopColor="#e08a3a" />
          <stop offset="100%" stopColor="#5a2a10" />
        </linearGradient>
        <linearGradient id={`teal-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a8fff6" />
          <stop offset="50%" stopColor="#2fa3a6" />
          <stop offset="100%" stopColor="#0d2a3d" />
        </linearGradient>
        <radialGradient id={`shell-${uid}`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#c3ccdc" />
        </radialGradient>
      </defs>

      {/* Backpack */}
      <rect x="45" y="104" width="110" height="96" rx="24" fill={suit.shade} />
      {/* Arms */}
      <rect x="28" y="116" width="30" height="72" rx="15" fill={suit.base} />
      <rect x="142" y="116" width="30" height="72" rx="15" fill={suit.base} />
      <circle cx="43" cy="190" r="13" fill={suit.shade} />
      <circle cx="157" cy="190" r="13" fill={suit.shade} />
      {/* Torso */}
      <rect x="54" y="108" width="92" height="106" rx="30" fill={suit.base} />
      <rect x="54" y="190" width="92" height="10" fill={suit.shade} opacity="0.5" />
      {/* Chest panel */}
      <rect x="80" y="150" width="40" height="26" rx="7" fill="#151c36" />
      <circle cx="90" cy="163" r="3.5" fill="#5fd4cf" />
      <circle cx="100" cy="163" r="3.5" fill="#f5a04a" />
      <circle cx="110" cy="163" r="3.5" fill="#e8edf5" opacity="0.6" />
      {/* Badge */}
      <circle cx="124" cy="130" r="12" fill="#151c36" stroke="#f2cf63" strokeWidth="2" />
      <BadgeIcon x={116} y={122} width={16} height={16} color="#f2cf63" strokeWidth={2.4} />
      {/* Neck ring */}
      <rect x="68" y="98" width="64" height="16" rx="8" fill={suit.shade} />

      <Helmet variant={config.helmet} uid={uid} accent={suit.shade} />
    </svg>
  )
}

function Helmet({
  variant,
  uid,
  accent,
}: {
  variant: AvatarConfig['helmet']
  uid: string
  accent: string
}) {
  if (variant === 'retro') {
    return (
      <g>
        <circle cx="100" cy="62" r="25" fill="#f2c9a0" />
        <circle cx="91" cy="60" r="3" fill="#1b2340" />
        <circle cx="109" cy="60" r="3" fill="#1b2340" />
        <path d="M91 71 Q100 78 109 71" stroke="#1b2340" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M76 52 Q84 34 106 36 Q124 38 124 54 Q112 44 96 46 Q84 48 76 52Z" fill="#3a2a22" />
        <circle cx="100" cy="60" r="54" fill="#9fd8ff" opacity="0.16" stroke="#cfe8ff" strokeWidth="3" />
        <path d="M66 34 Q78 16 102 14" stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
      </g>
    )
  }

  return (
    <g>
      {variant === 'explorer' && (
        <g>
          <line x1="132" y1="24" x2="146" y2="2" stroke="#c3ccdc" strokeWidth="3" strokeLinecap="round" />
          <circle cx="146" cy="4" r="5" fill="#f5a04a" />
        </g>
      )}
      <circle cx="100" cy="62" r="50" fill={`url(#shell-${uid})`} />
      <path d="M52 76 Q100 96 148 76" stroke={accent} strokeWidth="5" fill="none" opacity="0.8" />
      {variant === 'visor' ? (
        <rect x="58" y="44" width="84" height="40" rx="20" fill={`url(#teal-${uid})`} />
      ) : (
        <ellipse
          cx="100"
          cy="62"
          rx="34"
          ry="28"
          fill={variant === 'explorer' ? `url(#teal-${uid})` : `url(#gold-${uid})`}
        />
      )}
      <path
        d={variant === 'visor' ? 'M68 54 Q80 48 96 48' : 'M76 52 Q84 40 100 38'}
        stroke="#ffffff"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      {variant === 'explorer' && (
        <g>
          <rect x="44" y="40" width="16" height="22" rx="5" fill="#2f3c63" />
          <circle cx="52" cy="51" r="5" fill="#fff6c2" />
        </g>
      )}
    </g>
  )
}
