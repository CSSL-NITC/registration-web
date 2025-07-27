import Image from 'next/image';

// Constants for event highlights data
const EVENT_HIGHLIGHTS = {
  mobileHeader: {
    title: "ABOUT THE CONFERENCE",
    description: "NITC 2025 Conference will feature 6 tracks and will have 30+ local and foreign high-profile speakers and a series of prior events."
  },
  highlightBoxes: [
    {
      id: 'location',
      title: "Location",
      mainText: "Shangri-La Hotel",
      subText: "Colombo 02",
      imageSrc: "/shangri-la_hotel.png"
    },
    {
      id: 'date',
      title: "Date",
      mainText: "14th - 16th",
      subText: "October 2025",
      imageSrc: "/event_calender.png"
    },
    {
      id: 'speakers',
      title: "Speakers",
      mainText: "20+",
      subText: "Professionals",
      imageSrc: "/speakers.png"
    },
    {
      id: 'seats',
      title: "Seats",
      mainText: "450+",
      subText: "People",
      imageSrc: "/people.png"
    }
  ]
};

export function EventHighlights() {
  return (
    <section className="relative pt-16 pb-10 sm:py-20 overflow-hidden">
      {/* Section Background */}
      <div className="absolute inset-0">
        <Image
          src="/event_bg.jpg"
          alt="Event Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Mobile Gradient Overlay */}
      <div className="lg:hidden absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-black via-black/60 to-transparent z-[5]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Mobile-only Header */}
        <div className="lg:hidden mb-8 text-left">
          <h2 className="text-2xl font-bold text-white uppercase mb-4">
            {EVENT_HIGHLIGHTS.mobileHeader.title}
          </h2>
          <p className="text-white text-sm md:text-base max-w-2xl mx-auto">
            {EVENT_HIGHLIGHTS.mobileHeader.description}
          </p>
        </div>

        {/* Highlight Boxes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {EVENT_HIGHLIGHTS.highlightBoxes.map((box) => (
            <div 
              key={box.id}
              className="relative h-[280px] md:h-[320px] rounded-xl overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:z-10 hover:scale-[1.02]"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E3292]/50 via-[#2E3292]/10 to-transparent z-10" />
              
              {/* Background Image */}
              <Image
                src={box.imageSrc}
                alt={box.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-2">
                  {box.title}
                </h3>
                <p className="text-xl md:text-2xl font-bold leading-tight">
                  {box.mainText}
                </p>
                <p className="text-sm md:text-base font-medium text-white/90">
                  {box.subText}
                </p>
              </div>
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}