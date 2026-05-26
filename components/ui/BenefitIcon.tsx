interface BenefitIconProps {
  name: string
  className?: string
}

const ICONS: Record<string, React.ReactNode> = {
  wind: (
    <>
      <path d="M3 8h10a3 3 0 1 0-3-3" />
      <path d="M3 14h14a3 3 0 1 1-3 3" />
      <path d="M3 11h7" />
    </>
  ),
  recycle: (
    <>
      <path d="M5.5 9.5L8 5.5l2.5 4" />
      <path d="M18 11l-2 4-4-1" />
      <path d="M4 16l4-1 1 4" />
      <path d="M8 5.5h6a2 2 0 0 1 1.7 1l1.5 2.5" />
      <path d="M16 15l-3 4.5h-3a2 2 0 0 1-1.7-1L7 16" />
      <path d="M8 19l-3-4.5 1.5-2.5" />
    </>
  ),
  sensor: (
    <>
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="9" />
    </>
  ),
  power: (
    <>
      <path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" />
    </>
  ),
  filter: (
    <>
      <path d="M4 6h16" />
      <path d="M6 11h12" />
      <path d="M9 16h6" />
      <path d="M11 21h2" />
    </>
  ),
  sound: (
    <>
      <path d="M4 9h3l5-4v14l-5-4H4z" />
      <path d="M16 8.5l4 7" />
      <path d="M20 8.5l-4 7" />
    </>
  ),
  thermometer: (
    <>
      <path d="M11 4a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0V4z" />
      <path d="M13 6v8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  air: (
    <>
      <path d="M4 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M4 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M4 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.5 5.5l4 4M14.5 14.5l4 4M18.5 5.5l-4 4M9.5 14.5l-4 4" />
    </>
  ),
}

const EMOJI_MAP: Record<string, string> = {
  '💨': 'wind',
  '🌬': 'wind',
  '🌬️': 'wind',
  '♻': 'recycle',
  '♻️': 'recycle',
  '🔄': 'recycle',
  '📡': 'sensor',
  '🎯': 'sensor',
  '🔌': 'power',
  '⚡': 'power',
  '⚡️': 'power',
  '🧹': 'filter',
  '🌫': 'filter',
  '🌫️': 'filter',
  '🔇': 'sound',
  '🔈': 'sound',
  '🌡': 'thermometer',
  '🌡️': 'thermometer',
  '🛡': 'shield',
  '🛡️': 'shield',
  '💧': 'air',
  '✨': 'spark',
  '⭐': 'spark',
}

export function BenefitIcon({ name, className = '' }: BenefitIconProps) {
  const resolved = EMOJI_MAP[name] || (ICONS[name] ? name : 'spark')
  const paths = ICONS[resolved] || ICONS.spark

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths}
    </svg>
  )
}
