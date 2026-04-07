interface PlaceholderImageProps {
  color?: string
  accentColor?: string
  aspectRatio?: string
  label?: string
  className?: string
  pattern?: 'dots' | 'grid' | 'none'
}

export function PlaceholderImage({
  color = '#263947',
  accentColor = '#E4E969',
  aspectRatio = '4/3',
  label,
  className = '',
  pattern = 'dots',
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{ aspectRatio, backgroundColor: color }}
    >
      {/* Pattern overlay */}
      {pattern === 'dots' && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, ${accentColor} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      )}
      {pattern === 'grid' && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />

      {/* Accent corner */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 opacity-20 rounded-tl-full"
        style={{ backgroundColor: accentColor }}
      />

      {/* Label */}
      {label && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/40 text-sm font-medium tracking-widest uppercase">{label}</span>
        </div>
      )}
    </div>
  )
}
