import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from './components/common/sidebar/Sidebar'
import TypekitLoader from '@/app/TypekitLoader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'smitharia',
  description: 'creative platform',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <TypekitLoader/>
      <body className={inter.className}>
        <div className="min-h-screen p-10 flex bg-zinc-300">
          <Sidebar/>
          {children}
        </div>
      </body>
    </html>
  )
}
