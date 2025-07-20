import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowLeft, Star, Users, Building2, DollarSign } from "lucide-react"

export default function PricingPage() {
  const packages = [
    {
      id: "day1",
      name: "Day 1 - Inauguration",
      price: 20000,
      usdPrice: 67,
      originalPrice: 20000,
      description: "Premium opening day with industry leaders",
      features: [
        "Opening ceremony access",
        "Keynote speeches",
        "Welcome reception",
        "Networking lunch",
        "Conference materials",
        "Certificate of attendance",
      ],
      popular: false,
    },
    {
      id: "day1-2",
      name: "NITC Conference Day 01 (Day 02)",
      price: 35000,
      usdPrice: 117,
      originalPrice: 35000,
      description: "Day 1 plus technical sessions",
      features: [
        "All Day 1 benefits",
        "Technical sessions Day 2",
        "Workshop access",
        "Panel discussions",
        "Networking events",
        "Digital resources access",
      ],
      popular: false,
    },
    {
      id: "day2-3",
      name: "NITC Conference Day 02 (Day 03)",
      price: 35000,
      usdPrice: 117,
      originalPrice: 35000,
      description: "Advanced technical sessions and innovation tracks",
      features: [
        "Day 3 specialized tracks",
        "Innovation workshops",
        "Startup showcase",
        "Technology exhibitions",
        "Expert panel discussions",
        "Networking sessions",
      ],
      popular: false,
    },
    {
      id: "all3",
      name: "Full Conference with Inauguration (All 3 Days)",
      price: 50000,
      usdPrice: 167,
      originalPrice: 50000,
      description: "Complete conference experience with all benefits",
      features: [
        "All previous benefits",
        "VIP networking events",
        "Exclusive workshops",
        "Priority seating",
        "All meal sessions",
        "1-year digital access",
        "Special recognition",
        "Premium conference kit",
      ],
      popular: true,
    },
  ]

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price * (1 - discount / 100)
  }

  const calculateDiscountedUSD = (usdPrice: number, discount: number) => {
    return usdPrice * (1 - discount / 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link
              href="/"
              className="group inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-blue-800 to-indigo-800 hover:from-blue-900 hover:to-indigo-900 dark:from-blue-600 dark:to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-200">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Conference Pricing 2025
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your Conference Experience
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Flexible pricing options for every need. Join us at Shangri-La Hotel, Colombo, Sri Lanka for three days of
            innovation and networking.
          </p>
        </div>

        {/* Discount Banners */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 dark:bg-slate-800 hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
            <CardHeader className="text-center pb-4">
              <Star className="mx-auto h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
              <CardTitle className="text-green-800 dark:text-green-400 text-xl">CSSL Members</CardTitle>
              <CardDescription className="text-green-600 dark:text-green-300">
                Computer Society of Sri Lanka
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">20% OFF</div>
              <p className="text-green-700 dark:text-green-300 mb-4">Exclusive discount for CSSL members</p>
              <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800">
                Must provide valid CSSL membership ID
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 dark:bg-slate-800 hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500" />
            <CardHeader className="text-center pb-4">
              <Users className="mx-auto h-12 w-12 text-orange-600 dark:text-orange-400 mb-4" />
              <CardTitle className="text-orange-800 dark:text-orange-400 text-xl">Early Bird Special</CardTitle>
              <CardDescription className="text-orange-600 dark:text-orange-300">Limited time offer</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-4">15% OFF</div>
              <p className="text-orange-700 dark:text-orange-300 mb-4">For non-CSSL members</p>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-800">
                Register before the deadline!
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {(packages || []).map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-slate-800 ${
                pkg.popular
                  ? "ring-2 ring-blue-500 ring-offset-4 dark:ring-offset-slate-900 transform lg:scale-105"
                  : ""
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-800 to-indigo-800 dark:from-blue-600 dark:to-indigo-600" />
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white mb-2">{pkg.name}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="text-3xl font-bold text-blue-800 dark:text-blue-400">
                      LKR {pkg.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-1 text-gray-500 dark:text-gray-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-lg font-semibold">${pkg.usdPrice}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">per person</p>
                </div>

                <ul className="space-y-2">
                  {(pkg.features || []).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/register" className="block">
                  <Button
                    className={`w-full ${
                      pkg.popular
                        ? "bg-gradient-to-r from-blue-800 to-indigo-800 hover:from-blue-900 hover:to-indigo-900 shadow-lg"
                        : "bg-blue-800 hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-700"
                    } transition-all duration-200`}
                  >
                    Select Package
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Discount Examples */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 mb-16 shadow-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Pricing Examples with Discounts
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">Package</th>
                  <th className="text-right py-4 px-4 text-gray-900 dark:text-white font-semibold">Original Price</th>
                  <th className="text-right py-4 px-4 text-gray-900 dark:text-white font-semibold">
                    CSSL Member (20% off)
                  </th>
                  <th className="text-right py-4 px-4 text-gray-900 dark:text-white font-semibold">
                    Early Bird (15% off)
                  </th>
                </tr>
              </thead>
              <tbody>
                {(packages || []).map((pkg) => (
                  <tr
                    key={pkg.id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">{pkg.name}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="text-gray-700 dark:text-gray-300">LKR {pkg.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">${pkg.usdPrice}</div>
                    </td>
                    <td className="py-4 px-4 text-right text-green-600 dark:text-green-400 font-semibold">
                      <div>LKR {calculateDiscountedPrice(pkg.price, 20).toLocaleString()}</div>
                      <div className="text-sm">${Math.round(calculateDiscountedUSD(pkg.usdPrice, 20))}</div>
                    </td>
                    <td className="py-4 px-4 text-right text-orange-600 dark:text-orange-400 font-semibold">
                      <div>LKR {calculateDiscountedPrice(pkg.price, 15).toLocaleString()}</div>
                      <div className="text-sm">${Math.round(calculateDiscountedUSD(pkg.usdPrice, 15))}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Company Registration */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 dark:bg-slate-800 border-0 shadow-xl">
          <CardHeader className="text-center pb-6">
            <Building2 className="mx-auto h-16 w-16 text-blue-600 dark:text-blue-400 mb-6" />
            <CardTitle className="text-blue-800 dark:text-blue-400 text-2xl">Company Registration</CardTitle>
            <CardDescription className="text-lg">
              Register multiple employees with bulk pricing and management
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-white">Bulk Management</p>
                <p className="text-gray-600 dark:text-gray-300">Excel import for multiple employees</p>
              </div>
              <div className="p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-white">Centralized Billing</p>
                <p className="text-gray-600 dark:text-gray-300">Single invoice for all employees</p>
              </div>
              <div className="p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-white">Admin Portal</p>
                <p className="text-gray-600 dark:text-gray-300">Manage registrations easily</p>
              </div>
            </div>
            <Link href="/company-login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-800 to-indigo-800 hover:from-blue-900 hover:to-indigo-900 dark:from-blue-600 dark:to-indigo-600 px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Company Registration Portal
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">What's included in each package?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Each package includes access to sessions for the specified days, networking events, conference
                materials, meals, and a certificate of attendance.
              </p>
            </div>
            <div className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                How do I get the CSSL member discount?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                During registration, select "I am a CSSL member" and provide your valid CSSL membership ID. The 20%
                discount will be automatically applied.
              </p>
            </div>
            <div className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">When does the early bird offer end?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                The early bird discount is available for a limited time. Register soon to secure your 15% discount!
              </p>
            </div>
            <div className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Can I upgrade my package later?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Yes, you can upgrade your package by contacting our admin team. Additional payment will be required for
                the price difference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
