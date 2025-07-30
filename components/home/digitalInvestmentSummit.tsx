import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Constants for digital investment summit data
const DIGITAL_SUMMIT_CONTENT = {
  title: "Digital Investment Summit",
  description: "Unleash the power of digital innovations and seize growth opportunities at the Sri Lanka Digital Investment Summit.",
  content: "Sri Lanka Digital Investment Summit is a joint industry initiative to connect Sri Lankan Startups and mature companies with local and foreign investors to support their next growth phase and global expansions and serves as a gateway to delve into Sri Lanka's dynamic digital investment ecosystem. This summit rallies all industries and sectors nationwide, fostering partnerships with government officials, venture capitalists, investor groups, multinational corporates, entrepreneurs and thought leaders on the global stage. It also engages bilateral and multilateral associations and acts as a catalyst for economic resurgence while accelerating digital advancements for the country.",
  buttonText: "Learn More",
  buttonLink: "#summit",
  images: {
    conference: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753901565/CT8A8326_50_hpv9co.jpg",
    logo: "/CSSL_logo.png"
  }
};

export function DigitalInvestmentSummit() {
  return (
    <section className="relative bg-white lg:py-0">
      <div className="w-full mx-auto flex flex-col lg:flex-row min-h-[480px]">
        {/* Left: Image - 50% width on desktop, full width on mobile */}
        <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[480px] order-3 lg:order-none">
          <Image
            src={DIGITAL_SUMMIT_CONTENT.images.conference}
            alt="Digital Investment Summit"
            fill
            className="object-cover object-center"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        {/* Logo Section - Horizontal on mobile (overlapping), vertical on desktop */}
        <div className="w-full lg:w-auto absolute lg:relative top-[calc(70%)] lg:top-auto left-0 lg:left-auto z-10 py-4 lg:py-0 flex items-center justify-center lg:items-stretch">
          <div className="relative w-full lg:w-32 px-8 lg:px-0 -mt-8 lg:mt-0 -mx-16">
            {/* Mobile: Horizontal oval */}
            <div className="lg:hidden h-14 w-28 bg-white rounded-lg shadow-2xl border-2 border-gray-100 flex items-center justify-center mx-auto">
              <Image
                src={DIGITAL_SUMMIT_CONTENT.images.logo}
                alt="CSSL Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            
            {/* Desktop: Vertical oval */}
            <div className="hidden lg:flex h-full items-center">
              <div className="w-18 h-28 bg-white rounded-lg shadow-2xl border-2 border-gray-100 flex items-center justify-center mx-auto">
                <div className="transform -rotate-90">
                  <Image
                    src={DIGITAL_SUMMIT_CONTENT.images.logo}
                    alt="CSSL Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            
            {/* Connecting line - horizontal for mobile, vertical for desktop */}
            {/* <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="hidden lg:block w-0.5 h-full bg-gray-200"></div>
            </div> */}
          </div>
        </div>
        
        {/* Right: Content - Full width on mobile, 50% on desktop */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-12 bg-white order-1 lg:order-none">
          <h2 className="text-3xl md:text-4xl font-bold text-[#232c7c] mb-4">
            {DIGITAL_SUMMIT_CONTENT.title}
          </h2>
          <p className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
            {DIGITAL_SUMMIT_CONTENT.description}
          </p>
          <p className="text-gray-700 mb-6">
            {DIGITAL_SUMMIT_CONTENT.content}
          </p>
          <Link href={DIGITAL_SUMMIT_CONTENT.buttonLink}>
            <Button 
              variant="outline" 
              className="bg-transparent border-[#232c7c] text-[#232c7c] font-semibold px-6 py-2 rounded-full hover:bg-[#232c7c] hover:text-white transition-all duration-200"
            >
              {DIGITAL_SUMMIT_CONTENT.buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}