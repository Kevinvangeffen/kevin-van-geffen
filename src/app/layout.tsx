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
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://kevin-van-geffen.vercel.app' : 'http://localhost:3000'),
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
    icon: '/Images/kevin-favicon.webp',
    shortcut: '/Images/kevin-favicon.webp',
    apple: '/Images/kevin-favicon.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
