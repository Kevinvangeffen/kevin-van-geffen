# Kevin van Geffen - Portfolio Website

A cinematic one-page portfolio website built with Next.js, featuring:

- **Cinematic Design**: Black and gold theme with professional typography
- **Scroll Animations**: Smooth fade-in effects on scroll
- **Video Lightbox**: YouTube video integration with custom player
- **Contact Form**: Secure email functionality with spam protection
- **Mobile Optimized**: Responsive design with mobile-specific improvements
- **Custom Scrollbar**: Gold-themed scrollbar matching the brand

## Features

- **Hero Section**: Full-screen background with compelling storytelling
- **Chapter-based Layout**: 5 chapters telling Kevin's professional journey
- **Video Portfolio**: Curated video content with lightbox functionality
- **Contact Form**: Secure email sending with rate limiting and spam protection
- **Scroll Indicator**: Animated scroll indicator for better UX

## Technology Stack

- **Next.js 15.5.3** - React framework
- **Tailwind CSS 3.4.0** - Styling and responsive design
- **TypeScript** - Type safety
- **Nodemailer** - Email functionality
- **Custom CSS** - Scrollbar styling and animations

## Contact Form Security

- Rate limiting (5 requests per 15 minutes)
- Honeypot spam protection
- Input sanitization and validation
- Suspicious content detection
- Email format validation

## Deployment

Deployed on Vercel with environment variables for email functionality.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.
