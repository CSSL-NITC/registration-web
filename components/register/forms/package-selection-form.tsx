"use client"

import { useState } from "react"
import { CheckCircle, DollarSign, Calendar, Users, Award, Sparkles } from "lucide-react"
import { IndividualFormData } from "../individual-registration"
import { toast } from "sonner"

interface PackageSelectionFormProps {
  formData: IndividualFormData
  setFormData: (data: IndividualFormData) => void
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
}

const packages = [
  {
    id: "all3",
    name: "FULL CONFERENCE PACKAGE",
    price: 50000,
    usdPrice: 250,
    summary: "All 3 days including Inauguration, Conference Days 1 & 2",
    icon: Award,
    color: "from-blue-700 to-blue-900",
    popular: true,
    includes: ["Inauguration", "Day 1 Sessions", "Day 2 Sessions", "Gala Dinner", "Networking"]
  },
  {
    id: "day1",
    name: "INAUGURATION CEREMONY",
    price: 20000,
    usdPrice: 100,
    summary: "Opening ceremony, awards and gala dinner",
    icon: Sparkles,
    color: "from-blue-600 to-blue-800",
    includes: ["Opening Ceremony", "Keynote Speeches", "Awards", "Gala Dinner"]
  },
  {
    id: "day1-2",
    name: "CONFERENCE DAY 1",
    price: 15000,
    usdPrice: 75,
    summary: "Technical sessions, workshops and networking",
    icon: Users,
    color: "from-blue-500 to-blue-700",
    includes: ["Keynotes", "Panel Discussions", "Technical Sessions", "Tea, Snacks & Lunch"]
  },
  {
    id: "day2-3",
    name: "CONFERENCE DAY 2",
    price: 15000,
    usdPrice: 75,
    summary: "Technical sessions, workshops and closing",
    icon: Calendar,
    color: "from-blue-400 to-blue-600",
    includes: ["Technical Sessions", "Workshops", "Closing Ceremony", "Tea, Snacks & Lunch"]
  },
]


export function PackageSelectionForm({ formData, setFormData, errors, setErrors }: PackageSelectionFormProps) {
  const [selectedPackages, setSelectedPackages] = useState<string[]>(formData.package ? [formData.package] : [])

  const handlePackageSelect = (packageId: string) => {
    let newSelectedPackages = [...selectedPackages]

    // Handle full conference package selection
    if (packageId === "all3") {
      if (newSelectedPackages.includes("all3")) {
        // Deselect full conference if already selected
        newSelectedPackages = newSelectedPackages.filter(id => id !== "all3")
      } else {
        // Select full conference and deselect others
        newSelectedPackages = ["all3"]
        toast.success("Full Conference package selected! This includes all events.")
      }
    } else {
      // Handle individual package selection
      if (newSelectedPackages.includes(packageId)) {
        // Deselect individual package
        newSelectedPackages = newSelectedPackages.filter(id => id !== packageId)
      } else {
        // Can't select individual with full conference
        if (newSelectedPackages.includes("all3")) {
          toast.info("Please deselect Full Conference package first to select individual days")
          return
        }
        // Select individual package
        newSelectedPackages.push(packageId)

        // Check if all individual packages are selected
        const individualPackages = ["day1", "day1-2", "day2-3"]
        const hasAllIndividual = individualPackages.every(id => newSelectedPackages.includes(id))

        if (hasAllIndividual) {
          newSelectedPackages = ["all3"]
          toast.success("We've upgraded you to the Full Conference package for better value!")
        }
      }
    }

    setSelectedPackages(newSelectedPackages)
    setFormData({ ...formData, package: newSelectedPackages[0] || "" })

    if (errors.package) {
      const newErrors = { ...errors }
      delete newErrors.package
      setErrors(newErrors)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center text-white text-sm font-bold">
          2
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Select Your Conference Package *</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {packages.map((pkg) => {
          const IconComponent = pkg.icon
          const isSelected = selectedPackages.includes(pkg.id)
          const isFullConference = pkg.id === "all3"

          return (
            <div
              key={pkg.id}
              className={`relative transition-all duration-200 rounded-xl overflow-hidden border
                ${isSelected ? "ring-2 ring-blue-500 ring-offset-2" : "border-gray-200 hover:border-[#232c7c]"}
                ${pkg.popular ? "shadow-lg" : "shadow-md"}
                bg-white
              `}
            >
              <button
                type="button"
                onClick={() => handlePackageSelect(pkg.id)}
                className="w-full text-left focus:outline-none"
              >
                <div className={`p-6 ${isSelected ? "bg-gradient-to-br " + pkg.color : "bg-white"}`}>
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${isSelected ? "bg-white/20" : "bg-gray-100"}`}>
                          <IconComponent className={`w-5 h-5 ${isSelected ? "text-white" : "text-[#232c7c]"}`} />
                        </div>
                        <h4 className={`text-lg font-bold ${isSelected ? "text-white" : "text-gray-900"}`}>
                          {pkg.name}
                        </h4>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      )}
                    </div>

                    <p className={`text-sm ${isSelected ? "text-white/90" : "text-gray-600"}`}>
                      {pkg.summary}
                    </p>

                    <div className="pt-2 border-t border-white/10">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className={`text-2xl font-bold ${isSelected ? "text-white" : "text-gray-900"}`}>
                            LKR {pkg.price.toLocaleString()}
                          </span>
                          <span className={`ml-2 text-sm ${isSelected ? "text-white/80" : "text-gray-500"}`}>
                            (${pkg.usdPrice})
                          </span>
                        </div>
                        {pkg.popular && (
                          <span className="px-2 py-1 rounded-full text-xs font-bold bg-white text-blue-700">
                            BEST VALUE
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 ${isSelected ? "bg-blue-50" : "bg-gray-50"}`}>
                  <ul className={`text-sm space-y-1 ${isSelected ? "text-blue-800" : "text-gray-600"}`}>
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      {selectedPackages.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <div className="mb-4">
            <h4 className="font-medium text-blue-800">Selected Packages:</h4>
            <ul className="mt-2 space-y-2">
              {selectedPackages.map(id => {
                const pkg = packages.find(p => p.id === id)
                return (
                  <li key={id} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">{pkg?.name}</p>
                      <p className="text-sm text-gray-600">LKR {pkg?.price.toLocaleString()}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}

      {errors.package && (
        <div className="mt-2 text-center">
          <p className="text-red-500 text-sm">{errors.package}</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>Note: Full Conference package includes all events at a discounted rate.</p>
        <p>Select individual days if you can't attend all events.</p>
      </div>
    </div>
  )
}