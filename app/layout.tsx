import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { SupabaseProvider } from "@/components/supabase-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SEION | AI-First Business Transformation Partner for India",
  description:
    "SEION delivers AI automation for predictive maintenance, smart scheduling, IoT, and business workflow automation—making digital transformation easy, affordable, and powerful for every industry.",
  keywords: "SEION, AI automation, predictive maintenance, smart scheduling, IoT, business workflow automation, digital transformation, Indian industries",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seion.digital",
    title: "SEION | AI-First Business Transformation Partner for India",
    description:
      "AI automation for predictive maintenance, smart scheduling, IoT, and business workflow automation for Indian industries.",
    siteName: "SEION",
    images: [
      {
        url: "https://seion.digital/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SEION AI Automation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEION | AI-First Business Transformation Partner for India",
    description: "AI automation for predictive maintenance, smart scheduling, IoT, and business workflow automation.",
    images: ["https://seion.digital/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
