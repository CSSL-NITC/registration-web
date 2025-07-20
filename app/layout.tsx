import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { Toaster } from "@/components/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nation IT Conference 2025 | Sri Lanka's Premier Technology Conference",
  description:
    "Join Sri Lanka's premier technology conference. Three days of innovation, networking, and cutting-edge insights from industry leaders at Shangri-La Hotel, Colombo.",
  keywords: "technology conference, IT conference, Sri Lanka, CSSL, innovation, networking, tech summit",
  authors: [{ name: "Computer Society of Sri Lanka" }],
  openGraph: {
    title: "Nation IT Conference 2025",
    description: "Sri Lanka's premier technology conference at Shangri-La Hotel, Colombo",
    type: "website",
    locale: "en_US",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
