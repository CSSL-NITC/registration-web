import { Button } from "@/components/ui/button";
import Image from "next/image";

const AWARD_CATEGORIES = [
  {
    title: "CSSL Elite Awards",
    items: [
      "CSSL ICT Leader of the Year – Male Category",
      "CSSL ICT Leader of the Year – Female Category",
      "CSSL ICT Researcher of the Year",
      "CSSL ICT Educator of the Year"
    ]
  },
  {
    title: "ICT Student Awards",
    items: [
      "School Category (Public)",
      "School Category (International)",
      "Undergraduate Category",
      "Postgraduate Category"
    ]
  },
  {
    title: "Professional Awards",
    items: [
      "CSSL Chief Information Security Officer of the Year",
      "CSSL Leader in ICT Project Manager of the Year (PMP)",
      "CSSL Leader in Business Analysis of the Year",
      "CSSL Leader in Software Quality Assurance of the Year",
      "CSSL Leader in Software Engineering of the Year",
      "CSSL ICT Best Founder of the Year"
    ]
  }
//   {
//     title: "ICT Startup Eco System Awards",
//     items: [
//       "CSSL Best Founder Award",
//       "CSSL Digital Investor Award",
//       "CSSL Digital Social Innovator Award",
//       "CSSL Emerging ICT Leader of the Year Award"
//     ]
//   }
];

const AWARD_CONTENT = {
  title: "NITC Awards 2024",
  subtitle: "At the NITC awards 2025, Come Celebrate the outstanding achievements of the industries shining stars",
  description: "CSSL Awards recognises significant national contributions by ICT Professionals and CSSL Elite awards will be held at the inauguration ceremony of the NITC Conference.",
  buttons: [
    { text: "Apply Now", variant: "default" },
    { text: "View More", variant: "outline" }
  ]
};

export function NitcAwards() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/CSSL_Awards_2024_BG.png"
          alt="CSSL Awards Background"
          fill
          className="object-cover object-center"
          priority={false}
        />
        <div className="absolute inset-0 bg-white/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* 10-column grid (70/30 split on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-start">
          {/* Left Content (70% width) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header Section */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-[#3F3D7A] leading-tight">
                {AWARD_CONTENT.title}
              </h2>
              <p className="text-xl font-bold text-gray-900 leading-relaxed">
                {AWARD_CONTENT.subtitle}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {AWARD_CONTENT.description}
              </p>
              
              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {AWARD_CONTENT.buttons.map((button, index) => (
                  <Button
                    key={index}
                    className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
                      button.variant === "default"
                        ? "bg-[#3F3D7A] hover:bg-[#2A285A] text-white"
                        : "bg-transparent border-2 border-[#3F3D7A] text-[#3F3D7A] hover:bg-[#3F3D7A] hover:text-white"
                    }`}
                  >
                    {button.text}
                  </Button>
                ))}
              </div>
            </div>

            {/* Award Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {AWARD_CATEGORIES.map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-[#3F3D7A] mb-4">{category.title}</h3>
                  <ul className="space-y-2 text-gray-700">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-[15px]">
                        <span className="w-2 h-2 bg-[#3F3D7A] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Space (30% width) */}
          <div className="hidden lg:block lg:col-span-3"></div>
        </div>
      </div>
    </section>
  );
}