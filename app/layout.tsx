import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#2B2B2B', color: '#000000' }}>
        {children}
      </body>
    </html>
  )
}
