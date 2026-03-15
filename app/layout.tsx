import type { Metadata } from 'next'
import './globals.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  
  return {
    title: 'XV Años Nicol | Invitación Especial',
    description: 'Estás cordialmente invitado a celebrar los XV años de Nicol - 16 de mayo del 2026',
    metadataBase: new URL(baseUrl),
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
    },
    openGraph: {
      title: 'XV Años Nicol | Invitación Especial',
      description: 'Estás cordialmente invitado a celebrar los XV años de Nicol - 16 de mayo del 2026',
      images: ['/og-image.png'],
      type: 'website',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
