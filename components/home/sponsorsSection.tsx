import Image from "next/image"

const sponsors = {
  national: [
    { name: "Ministry of Digital Economy", logo: "/sponsors/Ministry_of_Digital_Economy.png" },
  ],
  strategic: [
    { name: "Mastercard", logo: "/sponsors/Mastercard.png" },
  ],
  diamond: [
    { name: "DMS", logo: "/sponsors/DMS.png" },
    { name: "Oracle", logo: "/sponsors/Oracal.png" },
    { name: "Google Cloud", logo: "/sponsors/Google Cloud.png" },
    { name: "Anfer", logo: "/sponsors/ANFER.png" },
    { name: "OZOREF", logo: "/sponsors/OZOREF.png" },
    { name: "Safe Project", logo: "/sponsors/Safe Project.png" },
    { name: "ORIN", logo: "/sponsors/ORIN.png" },
  ],
  gold: [
    { name: "DELL", logo: "/sponsors/DELL.png" },
    { name: "Fortinet", logo: "/sponsors/Fortinet.png" },
    { name: "Huawei", logo: "/sponsors/Huawei.png" },
    { name: "CommScope", logo: "/sponsors/CommScope.png" },
    { name: "Aiken", logo: "/sponsors/Aiken.png" },
  ],
  partners: [
    { name: "Bluechip Technical Services", logo: "/sponsors/Bluechip.png" },
    { name: "Informatics", logo: "/sponsors/Informatics.png" },
  ],
  industry: [
    { name: "FITIS", logo: "/sponsors/FITIS.png" },
    { name: "BCS", logo: "/sponsors/BCS.png" },
    { name: "SLASSCOM", logo: "/sponsors/SLASSCOM.png" },
    { name: "ISACA", logo: "/sponsors/ISACA.png" },
    { name: "IFIP", logo: "/sponsors/IFIP.png" },
    { name: "SEARCC", logo: "/sponsors/SEARCC.png" },
    { name: "OPA", logo: "/sponsors/OPA.png" },
  ],
  electronic: [
    { name: "ITN", logo: "/sponsors/ITN.png" },
  ],
  event: [
    { name: "Prime Events", logo: "/sponsors/Prime Events.png" },
  ],
  design: [
    { name: "GARVI", logo: "/sponsors/GARVI.png" },
  ],
}

type Sponsor = { name: string; logo: string };

function SponsorGroup({ title, sponsors, size = "medium" }: { title: string; sponsors: Sponsor[]; size?: "large" | "medium" | "small" | "xsmall" | "other" | "electronic" | "industry" }) {
  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "relative w-36 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 transition"
      case "medium":
        return "relative w-24 h-20 sm:w-28 sm:h-24 md:w-36 md:h-32 transition"
      case "small":
        return "relative w-20 h-10 sm:w-24 sm:h-12 md:w-24 md:h-20 transition"
      case "xsmall":
        return "relative w-36 h-10 sm:w-42 sm:h-12 md:w-48 md:h-20 transition"
      case "other":
        return "relative w-16 h-10 sm:w-20 sm:h-12 md:w-28 md:h-20 transition"
      case "electronic":
        return "relative w-36 h-10 sm:w-32 sm:h-12 md:w-48 md:h-20 transition"
        case "industry":
        return "relative w-16 h-10 sm:w-14 sm:h-12 md:w-24 md:h-20 transition"
      default:
        return "relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 transition"
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-center text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide text-gray-800 mb-2">
        {title}
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
        {sponsors.map((sponsor: Sponsor) => (
          <div
            key={sponsor.name}
            className={getSizeClasses(size)}
          >
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function SponsorsSection() {
  return (
    <section className="w-full py-10 px-2 sm:px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Row 1: National Partner + Strategic Partner */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 md:justify-between items-stretch w-full">
          <div className="flex-1 flex flex-col items-center justify-center mb-6 md:mb-0">
            <SponsorGroup title="National Partner" sponsors={sponsors.national} size="large" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <SponsorGroup title="Strategic Partner" sponsors={sponsors.strategic} size="large" />
          </div>
        </div>
        <hr className="border-gray-200" />
        
        {/* Row 2: Diamond Sponsors */}
        <div className="flex flex-col items-center justify-center w-full">
          <SponsorGroup title="Diamond Sponsors" sponsors={sponsors.diamond} size="medium" />
        </div>
        <hr className="border-gray-200" />
        
        {/* Row 3: Gold Sponsors + Partners */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 md:justify-between items-stretch w-full">
          <div className="flex-1 flex flex-col items-center justify-center mb-6 md:mb-0">
            <SponsorGroup title="Gold Sponsors" sponsors={sponsors.gold} size="small" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <SponsorGroup title="Partners" sponsors={sponsors.partners} size="xsmall" />
          </div>
        </div>
        <hr className="border-gray-200" />
        
        {/* Row 4: Industry Partners */}
        <div className="flex flex-col items-center justify-center w-full">
          <SponsorGroup title="Industry Partners" sponsors={sponsors.industry} size="industry" />
        </div>
        <hr className="border-gray-200" />
        
        {/* Row 5: Electronic Media Partner + Event Partner + Design Partner */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 md:justify-between items-stretch w-full">
          <div className="flex-1 flex flex-col items-center justify-center mb-6 md:mb-0">
            <SponsorGroup title="Electronic Media Partner" sponsors={sponsors.electronic} size="electronic" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center mb-6 md:mb-0">
            <SponsorGroup title="Event Partner" sponsors={sponsors.event} size="other" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <SponsorGroup title="Design Partner" sponsors={sponsors.design} size="other" />
          </div>
        </div>
      </div>
    </section>
  )
}
