"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const openLightbox = (videoTitle: string) => {
    setLightboxVideo(videoTitle);
  };

  const getVideoId = (videoTitle: string) => {
    const videoMap: { [key: string]: string } = {
      "Early Creative Work": "Czac1jJNs8A",
      "Music Production Journey": "utPZQtLs7QE",
      "Talpa Productions": "KNxQSljWxb0",
      "Corporate Content": "b0baosgOYQk",
      "Influencer Collaborations": "qm-NCNiGr5w",
      "Colombian Coffee Documentary": "4tYr_3qZiHk",
      "Travel Documentaries": "LgO-ZnEdqyU",
      "Website Portfolio": "-IXF8SmlDKc",
      "Sacred Life in Peru": "4tYr_3qZiHk",
      "Music Video Productions": "LgO-ZnEdqyU"
    };
    return videoMap[videoTitle] || "";
  };

  const closeLightbox = () => {
    setLightboxVideo(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: result.message });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll animation logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
            <Image
              src="/Images/kevin-van-geffen-logo.webp"
              alt="Kevin van Geffen"
              width={150}
              height={50}
              className="h-10 w-auto"
            />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-white hover:text-gold-start px-3 py-2 text-sm font-medium transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('chapters')}
                  className="text-white hover:text-gold-start px-3 py-2 text-sm font-medium transition-colors"
                >
                  My Story
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-white hover:text-gold-start px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gold-start p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-white hover:text-gold-start block px-3 py-2 text-base font-medium w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('chapters')}
                className="text-white hover:text-gold-start block px-3 py-2 text-base font-medium w-full text-left"
              >
                My Story
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-gold-start block px-3 py-2 text-base font-medium w-full text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-start">
        {/* Desktop Background */}
        <div className="hidden md:block absolute inset-0">
        <Image
            src="/Images/kevin-van-geffen-backdrop.webp"
            alt="Kevin van Geffen backdrop"
            fill
            className="object-cover"
          priority
        />
        </div>
        
        {/* Mobile Background */}
        <div className="md:hidden absolute inset-0">
        <Image
            src="/Images/kevin-van-geffen-backdrop-mobile.webp"
            alt="Kevin van Geffen backdrop mobile"
            fill
            className="object-cover"
          priority
        />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl ml-auto -mt-24 md:mt-0">
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 md:mb-8 text-white text-right" style={{textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9), 1px 1px 2px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 0, 0, 0.5)'}}>
              Since I was a kid, all I wanted was to tell stories. Now, let me tell you mine.
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-end">
              <button
                onClick={() => scrollToSection('contact')}
                className="cinematic-btn text-sm md:text-lg px-6 py-3 md:px-8 md:py-4"
              >
                Contact Me
              </button>
              <button
                onClick={() => scrollToSection('chapters')}
                className="cinematic-btn-outline text-sm md:text-lg px-6 py-3 md:px-8 md:py-4"
              >
                My Story & Portfolio
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator"></div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-gradient-to-b from-background to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            This portfolio resume is just a quick overview of some highlights of my work in different stages. 
            Specific portfolio work can be requested and shared if needed.
          </p>
        </div>
      </section>

      {/* Chapters Section */}
      <section id="chapters" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Chapter 1: The Beginning */}
          <div className="mb-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="fade-in-left">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 gold-text">Chapter I: The Spark</h2>
                <div className="text-lg md:text-xl leading-relaxed space-y-6">
                  <p>It began with words. As a kid, I filled pages with poems and short stories. Later, those became song lyrics, and when I realized I wasn&apos;t meant to sing them, I learned how to rap. Rap needed beats, so I taught myself music production. That same mindset guided me ever since: if others can do it, why can&apos;t I?</p>
                  <p>To share my music, I designed my own logos, flyers, and websites. One skill led to the next. Video slipped in naturally—at first just for my own songs, but soon I was creating music videos that people around me wanted too. Requests kept coming, until what started as passion projects turned into professional work. This was the foundation of my first video company in the Netherlands: Green Artworks.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 fade-in-right">
                <div 
                  className="video-block aspect-video relative overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => openLightbox("Early Creative Work")}
                >
                  <img 
                    src="https://img.youtube.com/vi/Czac1jJNs8A/maxresdefault.jpg" 
                    alt="Early Creative Work"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center shadow-xl">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div 
                  className="video-block aspect-video relative overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => openLightbox("Music Production Journey")}
                >
                  <img 
                    src="https://img.youtube.com/vi/utPZQtLs7QE/maxresdefault.jpg" 
                    alt="Music Production Journey"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center shadow-xl">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 2: Talpa */}
          <div className="mb-32">
            <div className="text-center mb-12 fade-in">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 gold-text">Chapter II: The Stage at Talpa</h2>
              <div className="text-lg md:text-xl leading-relaxed space-y-6 max-w-4xl mx-auto">
                <p>After years of freelance work, I stepped onto a bigger stage: <a href="https://www.talpanetwork.com/" target="_blank" rel="noopener noreferrer" className="text-gold-start hover:text-gold-end transition-colors duration-300 underline">Talpa Network</a>, one of the Netherlands&apos; most influential media companies. My role was both director and editor, working with top-tier businesses and some of the country&apos;s biggest influencers. Here, deadlines were tight, expectations higher than ever, and every project demanded precision.</p>
                <p>My job wasn&apos;t just to cut video. I was shaping stories that brands trusted to represent them in front of large audiences. From brainstorming creative concepts to directing shoots to polishing edits, I wore every hat. And it showed me some of my own blind spots that really helped me to grow better.</p>
                <p>Then came COVID. Our department was laid off. Instead of standing still, I took the chance to chase something new: the world itself.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto fade-in">
              <div 
                className="video-block aspect-video relative overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => openLightbox("Talpa Productions")}
              >
                <img 
                  src="https://img.youtube.com/vi/KNxQSljWxb0/maxresdefault.jpg" 
                  alt="Talpa Productions"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shadow-xl">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div 
                className="video-block aspect-video relative overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => openLightbox("Corporate Content")}
              >
                <img 
                  src="https://img.youtube.com/vi/b0baosgOYQk/maxresdefault.jpg" 
                  alt="Corporate Content"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shadow-xl">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div 
                className="video-block aspect-video relative overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => openLightbox("Influencer Collaborations")}
              >
                <img 
                  src="https://img.youtube.com/vi/qm-NCNiGr5w/maxresdefault.jpg" 
                  alt="Influencer Collaborations"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shadow-xl">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 3: The Journey */}
          <div className="mb-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="fade-in-left">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 gold-text">Chapter III: The Journey</h2>
                <div className="text-lg md:text-xl leading-relaxed space-y-6">
                  <p>I packed my camera, my drone, and my laptop, and set off. Greece, Mexico, Colombia, Peru. I captured not just places, but people, cultures, and moments that could vanish in a blink. In Colombia, I spent 6 months traveling alone through coffee regions, documenting farmers, landscapes, and traditions. Out of it came a 37-minute documentary on Colombian coffee, produced, filmed, and edited entirely by me. No crew. Just me and my drive to tell their story.</p>
                  <p>That documentary reached over 1.1 million viewers on YouTube, and it&apos;s still growing fast. Proof that a story, told with authenticity, can travel across the world. In between, I made travel films for my channel, experimenting with style and voice, slowly shaping my identity as a documentary storyteller.</p>
                </div>
        </div>
              <div className="flex justify-center fade-in-right">
                <div 
                  className="video-block aspect-video relative overflow-hidden rounded-lg cursor-pointer group w-full max-w-2xl"
                  onClick={() => openLightbox("Colombian Coffee Documentary")}
                >
                  <img 
                    src="https://img.youtube.com/vi/4tYr_3qZiHk/maxresdefault.jpg" 
                    alt="Colombian Coffee Documentary"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center shadow-xl">
                      <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 4: WP Expert */}
          <div className="mb-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2 fade-in-right">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 gold-text">Chapter IV: The Remote Agency Life</h2>
                <div className="text-lg md:text-xl leading-relaxed space-y-6">
                  <p>Traveling also opened another path. I joined <a href="https://wpexpert.ca/" target="_blank" rel="noopener noreferrer" className="text-gold-start hover:text-gold-end transition-colors duration-300 underline">WP Expert</a>, a Canadian web agency, working fully remote. Over several years, I delivered more than 80 website projects, designing, building, and often guiding clients directly through the process. My focus on UX, SEO, and communication shaped each project into more than just a website, it became a story told through design.</p>
                  <p>I also created promotional videos for the company, blending my design skills with video editing to elevate how the brand presented itself. Here I proved to myself that even from across the world, I could collaborate closely with a team, adapt to different time zones, and deliver high-quality work for clients who expected nothing less.</p>
                </div>
              </div>
              <div className="lg:order-1 flex justify-center fade-in-left">
                <div 
                  className="video-block aspect-video relative overflow-hidden rounded-lg cursor-pointer group w-full max-w-2xl"
                  onClick={() => openLightbox("Website Portfolio")}
                >
                  <img 
                    src="https://img.youtube.com/vi/-IXF8SmlDKc/maxresdefault.jpg" 
                    alt="Website Portfolio"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center shadow-xl">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 5: Sacred Life */}
          <div className="mb-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="fade-in-left">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 gold-text">Chapter V: Home and Beyond</h2>
                <div className="text-lg md:text-xl leading-relaxed space-y-6">
                  <p>Eventually, Peru became home. I met Sandra, we got married and couldn&apos;t be happier. But my work as a storyteller didn&apos;t slow down. Together, we filmed a new documentary, &ldquo;The Sacred Life of Peru,&rdquo; in just 12 days, unplanned, spontaneous, and deeply personal. It reminded me that the best stories often emerge when you least expect them.</p>
                  <p>Today, I continue freelancing as an editor and designer from Lima. Every project, whether a documentary, a branded video, or a website, is another chance to do what I&apos;ve always wanted: to tell stories that people don&apos;t just watch, but truly feel. From a kid scribbling poems to a man filming documentaries across continents, that mission has never changed.</p>
                </div>
              </div>
              <div className="flex justify-center fade-in-right">
                <div 
                  className="video-block aspect-video relative overflow-hidden rounded-lg cursor-pointer group w-full max-w-2xl"
                  onClick={() => openLightbox("Sacred Life in Peru")}
                >
                  <img 
                    src="https://img.youtube.com/vi/LgO-ZnEdqyU/maxresdefault.jpg" 
                    alt="Sacred Life in Peru"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center shadow-xl">
                      <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Scene */}
      <section id="contact" className="py-20 bg-gradient-to-b from-black to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 gold-text">
            Every story deserves to be told.<br />Let&apos;s tell yours.
          </h2>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field for spam protection */}
              <input
                type="text"
                name="honeypot"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-6 py-4 bg-transparent border-2 border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-gold-start focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-6 py-4 bg-transparent border-2 border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-gold-start focus:outline-none transition-colors"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me your story..."
                rows={6}
                required
                className="w-full px-6 py-4 bg-transparent border-2 border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#cb9f41] focus:outline-none transition-colors resize-none"
              />
              
              {/* Status Message */}
              {submitStatus.type && (
                <div className={`p-4 rounded-lg text-center ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-900/50 text-green-300 border border-green-700' 
                    : 'bg-red-900/50 text-red-300 border border-red-700'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="cinematic-btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Kevin van Geffen. Every story matters.
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gold-start text-2xl font-bold z-10"
            >
              ✕
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getVideoId(lightboxVideo)}?autoplay=1&rel=0`}
                title={lightboxVideo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
