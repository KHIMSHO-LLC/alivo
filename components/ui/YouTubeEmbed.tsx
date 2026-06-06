interface YouTubeEmbedProps {
  url: string
  className?: string
}

/** Extracts the 11-char video id from any common YouTube URL shape. */
export function getYouTubeId(url: string): string | null {
  if (!url) return null
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
  ]
  for (const re of patterns) {
    const m = url.match(re)
    if (m?.[1]) return m[1]
  }
  // Bare id
  if (/^[\w-]{11}$/.test(url.trim())) return url.trim()
  return null
}

export function YouTubeEmbed({ url, className }: YouTubeEmbedProps) {
  const id = getYouTubeId(url)
  if (!id) return null

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden rounded-2xl border border-[#DAEFFF]/15 bg-black ${className ?? ''}`}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
