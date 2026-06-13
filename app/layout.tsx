import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alivo — Premium Air Purification',
  description:
    'Official distributor of Fantini Cosmi recuperators and ventilators in Georgia. Breathe cleaner, live better.',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
