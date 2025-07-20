"use client"

import Link from "next/link"
import { Crown, Award, Gem, Star, ExternalLink } from "lucide-react"
import type { JSX } from "react" // Import JSX to fix the undeclared variable error

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SPONSORS } from "@/lib/constants/conference-data"
import { THEME_COLORS, SPONSOR_COLORS } from "@/lib/constants/colors"

// ---------------------------------------------------------------------------
// helpers -------------------------------------------------------------------
type TierKey = "national" | "platinum" | "gold" | "silver"

const tierConfig: Record<
  TierKey,
  {
    icon: JSX.Element
    gradient: string
    cardCols: string
    size: string
  }
> = {
  national: {
    icon: <Star className="h-5 w-5 text-blue-500" />,
    gradient: `${SPONSOR_COLORS.national.bg} ${SPONSOR_COLORS.national.text}`,
    cardCols: "grid-cols-1 md:grid-cols-2",
    size: "h-20 w-40",
  },
  platinum: {
    icon: <Crown className="h-5 w-5 text-gray-300" />,
    gradient: `${SPONSOR_COLORS.platinum.bg} ${SPONSOR_COLORS.platinum.text}`,
    cardCols: "grid-cols-1 md:grid-cols-2",
    size: "h-24 w-48",
  },
  gold: {
    icon: <Award className="h-5 w-5 text-yellow-500" />,
    gradient: `${SPONSOR_COLORS.gold.bg} ${SPONSOR_COLORS.gold.text}`,
    cardCols: "grid-cols-2 md:grid-cols-3",
    size: "h-20 w-40",
  },
  silver: {
    icon: <Gem className="h-5 w-5 text-gray-400" />,
    gradient: `${SPONSOR_COLORS.silver.bg} ${SPONSOR_COLORS.silver.text}`,
    cardCols: "grid-cols-2 md:grid-cols-4 lg:grid-cols-6",
    size: "h-16 w-32",
  },
}

// ---------------------------------------------------------------------------
// component -----------------------------------------------------------------
export function ModernSponsors() {
  /* -----------------------------------------------------------------------
   * Build a normalised array:
   *  [
   *    { tier: "national", title: "National Partner", sponsors: [...] },
   *    { tier: "platinum", title: "Platinum Sponsors", sponsors: [...] },
   *    ...
   *  ]
   * --------------------------------------------------------------------- */
  const tiers = [
    {
      tier: "national" as TierKey,
      title: SPONSORS.nationalPartner.title,
      sponsors: SPONSORS.nationalPartner.sponsors,
    },
    ...SPONSORS.categories.map((c) => ({
      tier: c.title.split(" ")[0].toLowerCase() as TierKey, // "Platinum Sponsors" -> "platinum"
      title: c.title,
      sponsors: c.sponsors,
    })),
  ]

  /* --------------------------------------------------------------------- */
  return (
    <section id="sponsors" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading -------------------------------------------------------- */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Valued Sponsors</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Partnering with industry leaders to make NIT Conference 2025 possible
          </p>
          <Link href="/sponsor-info.pdf" target="_blank">
            <Button
              className={`bg-gradient-to-r ${THEME_COLORS.gradients.primary} hover:from-blue-900 hover:to-indigo-900`}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Become a Sponsor
            </Button>
          </Link>
        </div>

        {/* tiers ---------------------------------------------------------- */}
        <div className="space-y-12">
          {tiers.map(({ tier, title, sponsors }) => {
            const cfg = tierConfig[tier]

            return (
              <div key={tier}>
                {/* tier label */}
                <div className="text-center mb-8">
                  <Badge className={`mb-4 px-6 py-2 text-lg font-semibold bg-gradient-to-r ${cfg.gradient} border-0`}>
                    {cfg.icon}
                    <span className="ml-2">{title}</span>
                  </Badge>
                </div>

                {/* sponsor cards */}
                <div className={`grid gap-8 justify-items-center ${cfg.cardCols}`}>
                  {sponsors.map((sponsor) => (
                    <Card
                      key={sponsor.id}
                      className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:bg-slate-800 overflow-hidden"
                    >
                      <CardContent className="p-6 text-center">
                        {/* logo box keeps aspect ratio */}
                        <div
                          className={`mx-auto mb-4 bg-white dark:bg-gray-100 rounded-lg p-4 flex items-center justify-center ${cfg.size}`}
                        >
                          <div className="w-full h-full bg-gradient-to-br from-blue-800 to-indigo-800 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xs sm:text-sm">{sponsor.name}</span>
                          </div>
                        </div>

                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors">
                          {sponsor.name}
                        </h3>
                        {sponsor.website && (
                          <Link href={sponsor.website} target="_blank">
                            <Button
                              variant="outline"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white dark:border-blue-400 dark:text-blue-400 bg-transparent"
                            >
                              <ExternalLink className="mr-1 h-3 w-3" />
                              Visit
                            </Button>
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
