import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kevin van Geffen - Storyteller & Creative Director",
  description: "Since I was a kid, all I wanted was to tell stories. Now, let me tell you mine.",
  keywords: ["Kevin van Geffen", "video editor", "documentary filmmaker", "creative director", "storyteller", "video production", "Colombia's Black Gold", "Sacred Life of Peru"],
  authors: [{ name: "Kevin van Geffen" }],
  creator: "Kevin van Geffen",
  publisher: "Kevin van Geffen",
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kevin-van-geffen.com',
    title: 'Kevin van Geffen - Storyteller & Creative Director',
    description: "Since I was a kid, all I wanted was to tell stories. Now, let me tell you mine.",
    siteName: 'Kevin van Geffen',
    images: [
      {
        url: '/Images/kevin-van-geffen-backdrop.webp',
        width: 1200,
        height: 630,
        alt: 'Kevin van Geffen - Storyteller & Creative Director',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kevin van Geffen - Storyteller & Creative Director',
    description: "Since I was a kid, all I wanted was to tell stories. Now, let me tell you mine.",
    images: ['/Images/kevin-van-geffen-backdrop.webp'],
  },
  icons: {
    icon: [
      { url: '/Images/kevin-favicon.webp', type: 'image/webp' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/Images/kevin-favicon.webp',
    apple: '/Images/kevin-favicon.webp',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Images/kevin-favicon.webp" type="image/webp" />
        <link rel="shortcut icon" href="/Images/kevin-favicon.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/Images/kevin-favicon.webp" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
