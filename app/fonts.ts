import localFont from 'next/font/local'

export const avivoFont = localFont({
  src: [
    {
      path: '../assets/fonts/AvenirNextGeorgian-UltLt.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AvenirNextGeorgian-Thin.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AvenirNextGeorgian-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AvenirNextGeorgian-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AvenirNextGeorgian-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AvenirNextGeorgian-Demi.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AvenirNextGeorgian-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AvenirNextGeorgian-Heavy.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AvenirNextGeorgian-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-avivo',
  display: 'swap',
  fallback: ['system-ui', 'Arial'],
})
