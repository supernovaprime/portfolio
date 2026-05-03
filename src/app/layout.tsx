import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio website for Supernovaprime',
  description: 'Full Stack Developer | UI/UX Designer | Problem Solver',
  keywords: ['portfolio', 'developer', 'designer', 'full-stack', 'web development'],
  authors: [{ name: 'Supernova Prime' }],
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'Portfolio website for Supernovaprime',
    description: 'Full Stack Developer | UI/UX Designer | Problem Solver',
    type: 'website',
    url: 'https://your-portfolio.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
