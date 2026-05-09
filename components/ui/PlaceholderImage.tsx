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
  accentColor = '#DAEFFF',
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
      {pattern === 'dots' && (
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle, ${accentColor} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      )}
      {pattern === 'grid' && (
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {label && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/40 text-sm font-medium tracking-widest uppercase">{label}</span>
        </div>
      )}
    </div>
  )
}
