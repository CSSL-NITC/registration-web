 "use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function TicketPricing() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/Event_ticket_pricing_BG.png"
          alt="Ticket Pricing Background"
          fill
          className="object-cover object-center"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ticket Pricing
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Experience the NITC IT Conference like never before with our affordable and flexible ticket pricing options, designed to ensure accessibility for all technology enthusiasts.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Card 1: FULL CONFERENCE WITH INAUGURATION */}
          <div className="relative bg-gradient-to-br from-blue-900/90 to-indigo-900/90 rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 flex flex-col h-full backdrop-blur-sm border-2 border-white lg:scale-105 lg:hover:scale-110">

            <div className="absolute inset-0 z-0">
                <Image
                src="/eventScheduleBGLeft.png"
                alt="Conference background"
                fill
                className="object-cover opacity-15"
                />
            </div>
            {/* Content Area */}
            <div className="p-6 relative flex-grow">
                <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-4">
                    FULL CONFERENCE WITH INAUGURATION
                </h3>
                <ul className="space-y-3 text-white/90 text-xs">
                    <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Keynote Speech
                    </li>
                    <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Keynote Presentations
                    </li>
                    <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    CSSL National ICT Awards
                    </li>
                    <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Panel Discussion and Q&A
                    </li>
                    <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Tea, Snacks & Lunch - Day 1, Day 2
                    </li>
                    <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Conference Tracks
                    </li>
                    <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Gala Dinner - Inauguration
                    </li>
                </ul>
                </div>
            </div>

            {/* Pricing Area */}
            <div className="p-6 text-left">
                <div className="mb-4">
                <div className="text-3xl font-bold text-white mb-1">LKR 50,000</div>
                <div className="text-sm text-white/80">$250 - Foreign Registrations</div>
                </div>
                <Button className="bg-white text-blue-900 hover:bg-gray-100 font-semibold py-3 rounded-full transition-all duration-200 hover:bg-transparent hover:text-white hover:border-white" variant="outline">
                Buy Ticket
                </Button>
            </div>
        </div>

          {/* Card 2: INAUGURATION CEREMONY */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 flex flex-col h-full">
            {/* White Content Area */}
            <div className="p-6 bg-white relative flex-grow">
                <div className="absolute inset-0 z-0">
                    <Image
                    src="/ticket_pricing_bg.png"
                    alt="Conference background"
                    fill
                    className="object-cover opacity-20"
                    />
                </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-30"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  INAUGURATION CEREMONY
                </h3>
                <ul className="space-y-3 text-gray-700 text-xs">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Keynote Speech CSSL
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    National ICT Awards
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Gala Dinner
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Networking
                  </li>
                </ul>
              </div>
            </div>

            {/* Dark Purple Pricing Area */}
            <div className="relative bg-gradient-to-br from-blue-900 to-indigo-900 p-6 text-left mt-auto">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                    src="/price_bg.png"
                    alt="Conference background"
                    fill
                    className="object-cover opacity-20"
                    />
                </div>
                <div className="relative z-10">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-white mb-1">LKR 20,000</div>
                  <div className="text-sm text-white/80">$100 - Foreign Registrations</div>
                </div>
                <Button className="bg-transparent hover:bg-white text-blue-900 hover:bg-gray-100 font-semibold py-3 rounded-full transition-all duration-200 border-white text-white hover:text-[#232c7c]" variant="outline" >
                  Buy Ticket
                </Button>
              </div>
              </div>
          </div>

          {/* Card 3: NITC CONFERENCE DAY 01 */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 flex flex-col h-full">
            {/* White Content Area */}
            <div className="p-6 bg-white relative flex-grow">
            <div className="absolute inset-0 z-0">
                    <Image
                    src="/ticket_pricing_bg.png"
                    alt="Conference background"
                    fill
                    className="object-cover opacity-20"
                    />
                </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-30"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  NITC CONFERENCE DAY 01
                </h3>
                <ul className="space-y-3 text-gray-700 text-xs">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Keynote Presentations
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Panel Discussion and Q&A
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Tea, Snacks & Lunch
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Conference Tracks
                  </li>
                </ul>
              </div>
            </div>

            {/* Dark Purple Pricing Area */}
            <div className="relative bg-gradient-to-br from-blue-900 to-indigo-900 p-6 text-left mt-auto">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                    src="/price_bg.png"
                    alt="Conference background"
                    fill
                    className="object-cover opacity-20"
                    />
                </div>
                <div className="relative z-10">
                    <div className="mb-4">
                        <div className="text-3xl font-bold text-white mb-1">LKR 15,000</div>
                        <div className="text-sm text-white/80">$75 - Foreign Registrations</div>
                    </div>
                    <Button className="bg-transparent hover:bg-white text-blue-900 hover:bg-gray-100 font-semibold py-3 rounded-full transition-all duration-200 border-white text-white hover:text-[#232c7c]" variant="outline" >
                        Buy Ticket
                    </Button>
                </div>
                </div>
          </div>

          {/* Card 4: NITC CONFERENCE DAY 02 */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 flex flex-col h-full">
            {/* White Content Area */}
            <div className="p-6 bg-white relative flex-grow">
            <div className="absolute inset-0 z-0">
                    <Image
                    src="/ticket_pricing_bg.png"
                    alt="Conference background"
                    fill
                    className="object-cover opacity-20"
                    />
                </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-30"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  NITC CONFERENCE DAY 02
                </h3>
                <ul className="space-y-3 text-gray-700 text-xs">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Keynote Presentations
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Tea, Snacks & Lunch
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Conference Tracks
                  </li>
                </ul>
              </div>
            </div>

            {/* Dark Purple Pricing Area */}
            <div className="relative bg-gradient-to-br from-blue-900 to-indigo-900 p-6 text-left mt-auto">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                    src="/price_bg.png"
                    alt="Conference background"
                    fill
                    className="object-cover opacity-20"
                    />
                </div>
                <div className="relative z-10">
                    <div className="mb-4">
                    <div className="text-3xl font-bold text-white mb-1">LKR 15,000</div>
                    <div className="text-sm text-white/80">$75 - Foreign Registrations</div>
                    </div>
                    <Button className="bg-transparent hover:bg-white text-blue-900 hover:bg-gray-100 font-semibold py-3 rounded-full transition-all duration-200 border-white text-white hover:text-[#232c7c] z-2" variant="outline" >
                    Buy Ticket
                    </Button>
                </div>
                </div>
          </div>
        </div>
        
      </div>
      {/* CSSL Logo on the right side */}
      <div className="hidden lg:block absolute top-1/2 right-[-30px] transform -translate-y-1/2 translate-x-0">
          <div className="bg-white rounded-lg shadow-lg px-6 -rotate-90">
            <div className="text-center">
                <div className="w-16 h-16 relative">
                    <Image 
                        src="/CSSL_logo.png" 
                        alt="CSSL Logo"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
          </div>
        </div>
    </section>
  )
}