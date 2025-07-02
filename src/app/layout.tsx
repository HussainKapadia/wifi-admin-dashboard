import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WiFi Admin Dashboard',
  description: 'Manage WiFi settings and firewall rules'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
