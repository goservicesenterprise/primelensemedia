import type { Metadata, Viewport } from 'next'
import 'goey-toast/styles.css'
import './globals.css'
import { siteConfig } from '@/config/site'
import ToasterProvider from '@/components/shared/ui/ToasterProvider'

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  keywords: [
    'Film Production',
    'Cinematography',
    'Arri Alexa 35',
    'RED V-Raptor',
    'Studio London',
    'Stage Fabrication',
    'Brand Media',
    'Commercials',
    'Music Videos',
    'Creative Consultation',
    'West Africa Media Hub',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/primelense_media_logo_4k.png', sizes: '4096x4096', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: siteConfig.name,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        type: 'image/png',
      },
      {
        url: '/og-image-transparent.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Transparent Watermark`,
        type: 'image/png',
      },
      {
        url: '/primelense_media_logo_4k.png',
        width: 4096,
        height: 4096,
        alt: `${siteConfig.name} Brand Identity 4K`,
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    site: '@primelensemedia',
    creator: '@primelensemedia',
    images: ['/opengraph-image.png', '/primelense_media_logo_4k.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/primelense_media_logo_4k.png`,
    image: `${siteConfig.url}/opengraph-image.png`,
    description: siteConfig.description,
    sameAs: [
      siteConfig.socials.instagram,
      siteConfig.socials.facebook,
      siteConfig.socials.youtube,
      siteConfig.socials.linkedin,
      siteConfig.socials.tiktok,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'production inquiry',
      telephone: siteConfig.phoneNumbers[0],
      email: siteConfig.email,
    },
  }

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white antialiased selection:bg-white selection:text-black min-h-screen">
        <ToasterProvider />
        {children}
      </body>
    </html>
  )
}
