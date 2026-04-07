interface SectionHeadingProps {
  badge?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({ badge, title, subtitle, align = 'left', light = false }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  const titleColor = light ? 'text-[#0C1A23]' : 'text-[#DAEFFF]'
  const subtitleColor = light ? 'text-[#263947]/70' : 'text-[#DAEFFF]/60'
  const badgeBg = light ? 'bg-[#0C1A23]/10 text-[#0C1A23]' : 'bg-[#E4E969]/15 text-[#E4E969]'

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {badge && (
        <span className={`inline-flex self-auto text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full ${badgeBg}`}>
          {badge}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-xl leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
