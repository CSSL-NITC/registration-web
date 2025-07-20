// Conference constants and data
export const CONFERENCE_COLORS = {
  primary: "#1e3a8a", // Dark blue
  primaryLight: "#3b82f6",
  secondary: "#1e40af",
  accent: "#0ea5e9",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
}

export const EVENT_SCHEDULE = {
  day1: {
    title: "Day 1 - Inauguration",
    date: "March 15, 2025",
    time: "6:00 PM onwards",
    events: [
      { time: "6:00 PM", event: "Registration & Welcome Reception" },
      { time: "7:00 PM", event: "Opening Ceremony" },
      { time: "7:30 PM", event: "Keynote Address" },
      { time: "8:30 PM", event: "Cultural Performance" },
      { time: "9:00 PM", event: "Networking Dinner" },
    ],
  },
  day2: {
    title: "Day 2 - Technical Sessions",
    date: "March 16, 2025",
    time: "9:00 AM to 5:00 PM",
    events: [
      { time: "9:00 AM", event: "Registration & Coffee" },
      { time: "9:30 AM", event: "AI & Machine Learning Track" },
      { time: "11:00 AM", event: "Coffee Break" },
      { time: "11:30 AM", event: "Cloud Computing & DevOps" },
      { time: "1:00 PM", event: "Lunch Break" },
      { time: "2:00 PM", event: "Cybersecurity & Privacy" },
      { time: "3:30 PM", event: "Tea Break" },
      { time: "4:00 PM", event: "Panel Discussion" },
      { time: "5:00 PM", event: "Day 2 Wrap-up" },
    ],
  },
  day3: {
    title: "Day 3 - Innovation & Future",
    date: "March 17, 2025",
    time: "9:00 AM to 5:00 PM",
    events: [
      { time: "9:00 AM", event: "Registration & Coffee" },
      { time: "9:30 AM", event: "Blockchain & Web3" },
      { time: "11:00 AM", event: "Coffee Break" },
      { time: "11:30 AM", event: "IoT & Smart Cities" },
      { time: "1:00 PM", event: "Lunch Break" },
      { time: "2:00 PM", event: "Startup Showcase" },
      { time: "3:30 PM", event: "Tea Break" },
      { time: "4:00 PM", event: "Awards Ceremony" },
      { time: "5:00 PM", event: "Closing Ceremony" },
    ],
  },
}

export const NITC_AWARDS = {
  categories: [
    {
      id: "innovation",
      title: "Innovation Excellence",
      description: "Recognizing groundbreaking innovations in technology",
      awards: [
        { name: "Best AI Innovation", description: "Outstanding AI-powered solution" },
        { name: "Best Mobile App", description: "Exceptional mobile application" },
        { name: "Best Web Platform", description: "Outstanding web-based platform" },
        { name: "Best IoT Solution", description: "Innovative Internet of Things solution" },
      ],
      poster: "/placeholder.svg?height=600&width=400&text=Innovation+Awards+Poster",
      applyUrl: "https://awards.nitconf.lk/innovation",
    },
    {
      id: "startup",
      title: "Startup Excellence",
      description: "Celebrating emerging technology startups",
      awards: [
        { name: "Best Tech Startup", description: "Most promising technology startup" },
        { name: "Best Fintech Startup", description: "Outstanding financial technology startup" },
        { name: "Best Healthtech Startup", description: "Innovative healthcare technology startup" },
        { name: "Best Edtech Startup", description: "Educational technology startup" },
      ],
      poster: "/placeholder.svg?height=600&width=400&text=Startup+Awards+Poster",
      applyUrl: "https://awards.nitconf.lk/startup",
    },
    {
      id: "digital",
      title: "Digital Transformation",
      description: "Recognizing digital transformation initiatives",
      awards: [
        { name: "Best Digital Initiative", description: "Outstanding digital transformation project" },
        { name: "Best Government Digital Service", description: "Exceptional public sector digitization" },
        { name: "Best Enterprise Solution", description: "Outstanding enterprise digital solution" },
        { name: "Best Digital Customer Experience", description: "Exceptional digital customer journey" },
      ],
      poster: "/placeholder.svg?height=600&width=400&text=Digital+Transformation+Awards+Poster",
      applyUrl: "https://awards.nitconf.lk/digital",
    },
    {
      id: "sustainability",
      title: "Sustainable Technology",
      description: "Promoting environmentally conscious technology solutions",
      awards: [
        { name: "Best Green Tech Solution", description: "Environmentally sustainable technology" },
        { name: "Best Energy Efficient System", description: "Outstanding energy-saving technology" },
        { name: "Best Circular Economy Solution", description: "Technology promoting circular economy" },
        { name: "Best Climate Tech Innovation", description: "Technology addressing climate change" },
      ],
      poster: "/placeholder.svg?height=600&width=400&text=Sustainability+Awards+Poster",
      applyUrl: "https://awards.nitconf.lk/sustainability",
    },
  ],
}

export const DIGITAL_INVESTMENT_SUMMIT = {
  title: "Digital Investment Summit 2025",
  subtitle: "Connecting Investors with Sri Lankan Tech Innovation",
  description:
    "Join Sri Lanka's premier digital investment summit, bringing together venture capitalists, angel investors, and innovative startups. Discover the next generation of technology companies and investment opportunities in the rapidly growing Sri Lankan tech ecosystem.",
  content: `
    The Digital Investment Summit is a flagship event within the Nation IT Conference, designed to bridge the gap between innovative technology startups and potential investors. This exclusive summit features pitch sessions, investor panels, and networking opportunities that have historically resulted in over $50 million in funding commitments.

    Our summit attracts leading venture capital firms, angel investors, and corporate venture arms from across Asia-Pacific, providing unparalleled access to funding opportunities for Sri Lankan startups. Previous editions have featured success stories from companies that have gone on to achieve significant growth and international expansion.

    Key highlights include startup pitch competitions, investor roundtables, funding workshops, and one-on-one investor meetings. Whether you're a startup seeking funding or an investor looking for the next big opportunity, this summit provides the perfect platform for meaningful connections and strategic partnerships.
  `,
  registerUrl: "https://summit.nitconf.lk/register",
  features: [
    "Startup Pitch Sessions",
    "Investor Panel Discussions",
    "One-on-One Meetings",
    "Funding Workshops",
    "Networking Reception",
    "Success Story Presentations",
  ],
}

export const EVENT_GALLERY = {
  title: "Previous Events Gallery",
  subtitle: "Highlights from our past conferences",
  images: [
    {
      id: 1,
      url: "/placeholder.svg?height=400&width=600&text=Conference+Opening+Ceremony",
      title: "Opening Ceremony 2024",
      description: "Grand opening with 500+ attendees",
      year: "2024",
    },
    {
      id: 2,
      url: "/placeholder.svg?height=400&width=600&text=Keynote+Speaker+Session",
      title: "Keynote Sessions",
      description: "Industry leaders sharing insights",
      year: "2024",
    },
    {
      id: 3,
      url: "/placeholder.svg?height=400&width=600&text=Technical+Workshop",
      title: "Technical Workshops",
      description: "Hands-on learning experiences",
      year: "2024",
    },
    {
      id: 4,
      url: "/placeholder.svg?height=400&width=600&text=Networking+Event",
      title: "Networking Sessions",
      description: "Building professional connections",
      year: "2024",
    },
    {
      id: 5,
      url: "/placeholder.svg?height=400&width=600&text=Awards+Ceremony",
      title: "Awards Ceremony",
      description: "Recognizing excellence in technology",
      year: "2024",
    },
    {
      id: 6,
      url: "/placeholder.svg?height=400&width=600&text=Exhibition+Hall",
      title: "Technology Exhibition",
      description: "Latest innovations on display",
      year: "2024",
    },
  ],
}

export const ABOUT_CSSL = {
  title: "About Computer Society of Sri Lanka (CSSL)",
  logo: "/placeholder.svg?height=100&width=200&text=CSSL+Logo",
  description:
    "The Computer Society of Sri Lanka (CSSL) is the premier professional body for ICT professionals in Sri Lanka, established in 1976.",
  content: `
    The Computer Society of Sri Lanka (CSSL) has been at the forefront of Sri Lanka's ICT development for over four decades. As the national body representing ICT professionals, CSSL plays a crucial role in shaping the country's digital transformation journey.

    Our mission is to advance the theory and practice of computer science and information technology, promote professional excellence, and contribute to the socio-economic development of Sri Lanka through ICT innovation.

    CSSL organizes various professional development programs, certification courses, and industry events including the annual National IT Conference. We maintain strong partnerships with international organizations and serve as the local representative for several global ICT bodies.

    With over 3,000 members comprising software engineers, IT managers, researchers, and technology entrepreneurs, CSSL continues to be the voice of Sri Lanka's ICT community on both national and international platforms.
  `,
  achievements: [
    "45+ years of professional excellence",
    "3,000+ active members",
    "50+ annual events and workshops",
    "International partnerships and recognition",
  ],
  website: "https://www.cssl.lk",
}

export const SPONSORS = {
  nationalPartner: {
    title: "National Partner",
    sponsors: [
      {
        id: "dialog",
        name: "Dialog Axiata PLC",
        logo: "/placeholder.svg?height=80&width=200&text=Dialog+Logo",
        logoWhite: "/placeholder.svg?height=80&width=200&text=Dialog+Logo+White",
        website: "https://www.dialog.lk",
        tier: "national",
      },
    ],
  },
  categories: [
    {
      title: "Platinum Sponsors",
      sponsors: [
        {
          id: "slt",
          name: "Sri Lanka Telecom",
          logo: "/placeholder.svg?height=60&width=180&text=SLT+Logo",
          logoWhite: "/placeholder.svg?height=60&width=180&text=SLT+Logo+White",
          website: "https://www.slt.lk",
          tier: "platinum",
        },
        {
          id: "mobitel",
          name: "Mobitel",
          logo: "/placeholder.svg?height=60&width=180&text=Mobitel+Logo",
          logoWhite: "/placeholder.svg?height=60&width=180&text=Mobitel+Logo+White",
          website: "https://www.mobitel.lk",
          tier: "platinum",
        },
      ],
    },
    {
      title: "Gold Sponsors",
      sponsors: [
        {
          id: "virtusa",
          name: "Virtusa",
          logo: "/placeholder.svg?height=50&width=160&text=Virtusa+Logo",
          logoWhite: "/placeholder.svg?height=50&width=160&text=Virtusa+Logo+White",
          website: "https://www.virtusa.com",
          tier: "gold",
        },
        {
          id: "wso2",
          name: "WSO2",
          logo: "/placeholder.svg?height=50&width=160&text=WSO2+Logo",
          logoWhite: "/placeholder.svg?height=50&width=160&text=WSO2+Logo+White",
          website: "https://wso2.com",
          tier: "gold",
        },
        {
          id: "sysco",
          name: "Sysco LABS",
          logo: "/placeholder.svg?height=50&width=160&text=Sysco+Logo",
          logoWhite: "/placeholder.svg?height=50&width=160&text=Sysco+Logo+White",
          website: "https://syscolabs.com",
          tier: "gold",
        },
      ],
    },
    {
      title: "Silver Sponsors",
      sponsors: [
        {
          id: "creative",
          name: "Creative Software",
          logo: "/placeholder.svg?height=40&width=140&text=Creative+Logo",
          logoWhite: "/placeholder.svg?height=40&width=140&text=Creative+Logo+White",
          website: "https://www.creative.lk",
          tier: "silver",
        },
        {
          id: "millennium",
          name: "Millennium IT",
          logo: "/placeholder.svg?height=40&width=140&text=Millennium+Logo",
          logoWhite: "/placeholder.svg?height=40&width=140&text=Millennium+Logo+White",
          website: "https://www.millenniumit.com",
          tier: "silver",
        },
      ],
    },
  ],
}
