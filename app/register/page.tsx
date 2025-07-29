"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { IndividualRegistration } from "@/components/register/individual-registration"
import { CompanyRegistration } from "@/components/register/company-registration"

export default function RegisterPage() {
  const [registrationType, setRegistrationType] = useState<"individual" | "company">("individual")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 font-['Roboto']">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="group inline-flex items-center text-slate-700 hover:text-slate-900 transition-all duration-200 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image 
              src="https://res.cloudinary.com/djxtjt1uf/image/upload/v1753804463/NITC-Logo-7c1f04fc_qobxl1.png" 
              alt="NITC 2025 Logo" 
              width={120} 
              height={120} 
              className="h-24 w-auto" 
            />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Conference Registration
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Register for Nation IT Conference 2025 at Shangri-La Hotel, Colombo, Sri Lanka
          </p>
        </div>

        {/* Registration Type Selector */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-1 border border-slate-200">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setRegistrationType("individual")}
                className={`py-2 px-4 rounded-xl font-semibold transition-all duration-200 ${
                  registrationType === "individual"
                    ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                Individual Registration
              </button>
              <button
                onClick={() => setRegistrationType("company")}
                className={`py-2 px-4 rounded-xl font-semibold transition-all duration-200 ${
                  registrationType === "company"
                    ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                Company Registration
              </button>
            </div>
          </div>
        </div>

        {/* Registration Forms */}
        {registrationType === "individual" ? (
          <IndividualRegistration />
        ) : (
          <CompanyRegistration />
        )}
      </div>
    </div>
  )
} 