import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Constants for hero section data
const HERO_CONTENT = {
  tagline: "43RD NATIONAL IT CONFERENCE",
  title: "Fostering a Human<br className=\"hidden md:block\" />Centric Nation",
  subtitle: "Towards Society 5.0",
  buttonText: "Register Now",
  buttonLink: "/register",
  backgroundImage: "/HeroBG.png"
};

const ANIMATION_STYLES = {
  tagline: {
    animationDelay: '0ms',
    animationFillMode: 'both'
  },
  title: {
    lineHeight: 1.1,
    animationDelay: '200ms', 
    animationFillMode: 'both'
  },
  subtitle: {
    animationDelay: '400ms',
    animationFillMode: 'both'
  },
  button: {
    fontFamily: 'Roboto, sans-serif',
    animationDelay: '600ms',
    animationFillMode: 'both',
    backdropFilter: 'blur(4px)'
  }
};

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center" id="hero">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_CONTENT.backgroundImage}
          alt="NITC 2025 Hero Background"
          fill
          className="object-cover object-right md:object-center"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center min-h-[80vh]">
        <div className="flex-1 flex flex-col justify-center items-start text-left py-24 lg:py-0">
          <div 
            className="mb-4 text-xs md:text-sm tracking-widest text-white uppercase font-medium opacity-90 animate-fade-slide-up"
            style={ANIMATION_STYLES.tagline}
          >
            {HERO_CONTENT.tagline}
          </div>
          <h1 
            className="mb-2 text-3xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase leading-tight animate-fade-slide-up"
            style={ANIMATION_STYLES.title}
            dangerouslySetInnerHTML={{ __html: HERO_CONTENT.title }}
          />
          <div 
            className="mb-8 text-base md:text-xl text-white font-semibold uppercase opacity-90 animate-fade-slide-up"
            style={ANIMATION_STYLES.subtitle}
          >
            {HERO_CONTENT.subtitle}
          </div>
          <Link href={HERO_CONTENT.buttonLink}>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white font-bold px-8 py-2 rounded-full transition-all duration-300 animate-fade-slide-up transform-gpu hover:scale-105 hover:bg-white hover:text-[#0a1440] hover:shadow-xl hover:border-blue-400 focus-visible:scale-105 focus-visible:shadow-xl"
              style={ANIMATION_STYLES.button}
            >
              {HERO_CONTENT.buttonText}
            </Button>
          </Link>
        </div>
        {/* Right side is intentionally left empty for now, as in the image */}
      </div>
    </section>
  );
}