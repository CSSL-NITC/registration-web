import Image from "next/image"

const sponsors = {
  national: [
    { name: "Ministry of Digital Economy", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803014/Ministry_of_Digital_Economy_sovzwz.png" },
  ],
  strategic: [
    { name: "Mastercard", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803006/Mastercard_xwkion.png" },
  ],
  diamond: [
    { name: "DMS", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803013/DMS_nbkzs0.png" },
    { name: "Oracle", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803013/Oracal_sohpql.png" },
    { name: "Google Cloud", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803010/Google_Cloud_pzpaxk.png" },
    { name: "Anfer", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803004/ANFER_xtuixt.png" },
    { name: "OZOREF", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803015/OZOREF_sxdwuq.png" },
    { name: "Safe Project", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803016/Safe_Project_ij9gae.png" },
    { name: "ORIN", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803014/ORIN_arge9e.png" },
  ],
  gold: [
    { name: "DELL", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803000/Dell_ybeilr.png" },
    { name: "Fortinet", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803003/Fortinet_pszqp7.png" },
    { name: "Huawei", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803002/Huawei_xidbwm.png" },
    { name: "CommScope", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803003/Commscope_avsxri.png" },
    { name: "Aiken", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753802999/Aiken_ocoors.png" },
  ],
  partners: [
    { name: "Bluechip Technical Services", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803003/Bluechip_rexdto.png" },
    { name: "Informatics", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803000/INFORMATICS_yk6r2k.png" },
  ],
  industry: [
    { name: "FITIS", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803007/FITIS_mbiqu5.png" },
    { name: "BCS", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803011/BCS_wc9gaq.png" },
    { name: "SLASSCOM", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803016/SLASSCOM_i0h7ik.png" },
    { name: "ISACA", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803005/ISACA_nykifh.png" },
    { name: "IFIP", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803001/ifip_snynhy.png" },
    { name: "SEARCC", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803017/SEARCC_r2vpav.png" },
    { name: "OPA", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803012/OPA_j1fadj.png" },
  ],
  electronic: [
    { name: "ITN", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803008/ITN_zui6l7.png" },
  ],
  event: [
    { name: "Prime Events", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803016/Prime_Events_adbb84.png" },
  ],
  design: [
    { name: "GARVI", logo: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753803012/Garvi_gbpk1z.png" },
  ],
}

type Sponsor = { name: string; logo: string };

function DiamondSponsorGroup() {
    return (
      <div className="flex flex-col items-center w-full gap-2">
        <h3 className="text-center text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide text-gray-800 mb-2">
          Diamond Sponsors
        </h3>
        
        {/* Main row containing both groups */}
        <div className="flex flex-col md:flex-row justify-evenly items-center gap-8 w-full">
          {/* First group (DMS + Oracle/Google) */}
          <div className="flex flex-col items-center gap-2">
            {/* DMS row */}
            <div className="flex justify-center mb-2">
              <div className="relative w-36 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32 transition">
                <Image src={sponsors.diamond[0].logo} alt={sponsors.diamond[0].name} fill className="object-contain" />
              </div>
            </div>
            {/* Oracle + Google Cloud row */}
            <div className="flex justify-center gap-6 mb-4">
              <div className="relative w-28 h-24 sm:w-40 sm:h-28 md:w-40 md:h-32 transition">
                <Image src={sponsors.diamond[1].logo} alt={sponsors.diamond[1].name} fill className="object-contain" />
              </div>
              <div className="relative w-28 h-24 sm:w-40 sm:h-28 md:w-40 md:h-32 transition">
                <Image src={sponsors.diamond[2].logo} alt={sponsors.diamond[2].name} fill className="object-contain" />
              </div>
            </div>
          </div>
  
          {/* Second group (Anfer + OZOREF/Safe/ORIN) */}
          <div className="flex flex-col items-center gap-2">
            {/* Anfer row */}
            <div className="flex justify-center mb-2">
              <div className="relative w-36 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 transition">
                <Image src={sponsors.diamond[3].logo} alt={sponsors.diamond[3].name} fill className="object-contain" />
              </div>
            </div>
            {/* OZOREF + Safe Project + ORIN row */}
            <div className="flex justify-center gap-6">
              <div className="relative w-28 h-24 sm:w-40 sm:h-28 md:w-40 md:h-32 transition">
                <Image src={sponsors.diamond[4].logo} alt={sponsors.diamond[4].name} fill className="object-contain" />
              </div>
              <div className="relative w-28 h-24 sm:w-40 sm:h-28 md:w-40 md:h-32 transition">
                <Image src={sponsors.diamond[5].logo} alt={sponsors.diamond[5].name} fill className="object-contain" />
              </div>
              <div className="relative w-28 h-24 sm:w-40 sm:h-28 md:w-40 md:h-32 transition">
                <Image src={sponsors.diamond[6].logo} alt={sponsors.diamond[6].name} fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

function SponsorGroup({ title, sponsors, size = "medium" }: { title: string; sponsors: Sponsor[]; size?: "large" | "medium" | "small" | "xsmall" | "other" | "electronic" | "industry" }) {
  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "relative w-36 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 transition"
      case "medium":
        return "relative w-24 h-20 sm:w-28 sm:h-24 md:w-36 md:h-32 transition"
      case "small":
        return "relative w-20 h-20 sm:w-24 sm:h-16 md:w-32 md:h-24 transition"
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
          <DiamondSponsorGroup />
        </div>
        <hr className="border-gray-200" />
        {/* Row 3: Gold Sponsors + Partners */}
        <div className="flex flex-col items-center justify-center w-full">
            <SponsorGroup title="Gold Sponsors" sponsors={sponsors.gold} size="small" />
        </div>
        <hr className="border-gray-200" />
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 md:justify-between items-stretch w-full lg:items-start">
          <div className="flex-1 flex flex-col items-center justify-center mb-6 md:mb-0">
            <SponsorGroup title="Partners" sponsors={sponsors.partners} size="xsmall" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <SponsorGroup title="Industry Partners" sponsors={sponsors.industry} size="industry" />
          </div>
        </div>
        <hr className="border-gray-200" />
        {/* Row 4: Industry Partners */}
        {/* <div className="flex flex-col items-center justify-center w-full">
          <SponsorGroup title="Industry Partners" sponsors={sponsors.industry} size="industry" />
        </div> */}
        {/* <hr className="border-gray-200" /> */}
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
