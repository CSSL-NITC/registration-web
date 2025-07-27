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
  ],
  partners: [
    { name: "Aiken", logo: "/sponsors/Aiken.png" },
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

function SponsorGroup({ title, sponsors, center = false, large = false }: { title: string; sponsors: Sponsor[]; center?: boolean; large?: boolean }) {
  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-center text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide text-gray-800 mb-2">
        {title}
      </h3>
      <div className={`flex flex-wrap ${center ? 'justify-center' : 'justify-start'} items-center gap-4 sm:gap-6 md:gap-8`}>
        {sponsors.map((sponsor: Sponsor) => (
          <div
            key={sponsor.name}
            className={
              large
                ? "relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 transition"
                : title === "Electronic Media Partner"
                ? "relative w-36 h-10 sm:w-48 sm:h-12 md:w-52 md:h-14 transition"
                : "relative w-20 h-10 sm:w-24 sm:h-12 md:w-28 md:h-14 transition"
            }
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
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 md:justify-between items-stretch w-full">
          <div className="flex-1 flex flex-col items-center justify-center mb-6 md:mb-0">
            <SponsorGroup title="National Partner" sponsors={sponsors.national} large center />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center mb-6 md:mb-0">
            <SponsorGroup title="Strategic Partner" sponsors={sponsors.strategic} large center />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <SponsorGroup title="Diamond Sponsors" sponsors={sponsors.diamond} center />
          </div>
        </div>
        <hr className="border-gray-200" />
        {/* Row 2 */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 md:justify-between items-stretch w-full">
          <div className="flex-1 flex flex-col items-center justify-center mb-6 md:mb-0">
            <SponsorGroup title="Gold Sponsors" sponsors={sponsors.gold} center />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <SponsorGroup title="Partners" sponsors={sponsors.partners} center />
          </div>
        </div>
        <hr className="border-gray-200" />
        {/* Row 3 */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 md:justify-between items-stretch w-full">
          <div className="flex-1 flex flex-col items-center justify-center mb-6 md:mb-0">
            <SponsorGroup title="Industry Partners" sponsors={sponsors.industry} center />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center mb-6 md:mb-0">
            <SponsorGroup title="Electronic Media Partner" sponsors={sponsors.electronic} center />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center mb-6 md:mb-0">
            <SponsorGroup title="Event Partner" sponsors={sponsors.event} center />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <SponsorGroup title="Design Partner" sponsors={sponsors.design} center />
          </div>
        </div>
      </div>
    </section>
  )
}
