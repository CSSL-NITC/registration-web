"use client"

import { useState } from "react"
import { PersonalInformationForm } from "./forms/personal-information-form"
import { PackageSelectionForm } from "./forms/package-selection-form"
import { MembershipDiscountForm } from "./forms/membership-discount-form"
import { EmailVerificationStep } from "./steps/email-verification-step"
import { PaymentSummaryStep } from "./steps/payment-summary-step"
import { SuccessStep } from "./steps/success-step"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export interface IndividualFormData {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  nic: string;
  workplace: string;
  designation: string;
  password: string;
  package: string;
  isCSSLMember: boolean;
  csslMembershipId: string;
  isEarlyBird: boolean;
  isBCSMember: boolean;
  isISACAMember: boolean;
  isIESLMember: boolean;
  isFITISMember: boolean;
  isSLASSCOMMember: boolean;
  isIEEEMember: boolean;
  memberId: string;
}

export function IndividualRegistration() {
  const [formData, setFormData] = useState<IndividualFormData>({
    title: "Mr.",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    nic: "",
    workplace: "",
    designation: "",
    password: "",
    package: "",
    isCSSLMember: false,
    csslMembershipId: "",
    isEarlyBird: true,
    isBCSMember: false,
    isISACAMember: false,
    isIESLMember: false,
    isFITISMember: false,
    isSLASSCOMMember: false,
    isIEEEMember: false,
    memberId: "",
  })

  const [step, setStep] = useState(1) // 1: Registration, 2: Email Verification, 3: Payment, 4: Success
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Personal Information Validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required"
    if (!formData.nic.trim()) newErrors.nic = "NIC number is required"
    if (!formData.workplace.trim()) newErrors.workplace = "Workplace is required"
    if (!formData.designation.trim()) newErrors.designation = "Designation is required"
    if (!formData.password.trim()) newErrors.password = "Password is required"

    // Package Validation
    if (!formData.package) newErrors.package = "Please select a conference package"

    // CSSL Member Validation
    if (formData.isCSSLMember && !formData.csslMembershipId.trim()) {
      newErrors.csslMembershipId = "CSSL membership ID is required"
    }

    // Other Member Validation
    if ((formData.isBCSMember || formData.isISACAMember || formData.isIESLMember || 
         formData.isFITISMember || formData.isSLASSCOMMember || formData.isIEEEMember) && 
        !formData.memberId.trim()) {
      newErrors.memberId = "Member ID is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields")
      return
    }

    setStep(2)
  }

  const handleBackToForm = () => {
    setStep(1)
  }

  const handleEmailVerified = () => {
    setStep(3)
  }

  const handlePaymentComplete = () => {
    setStep(4)
  }

  if (step === 2) {
    return (
      <EmailVerificationStep 
        email={formData.email}
        onVerified={handleEmailVerified}
        onBack={handleBackToForm}
        loading={loading}
      />
    )
  }

  if (step === 3) {
    return (
      <PaymentSummaryStep 
        formData={formData}
        onPaymentComplete={handlePaymentComplete}
        onBack={handleBackToForm}
        loading={loading}
      />
    )
  }

  if (step === 4) {
    return <SuccessStep />
  }

  return (
    <div className="max-w-4xl mx-auto font-['Roboto']">
      <div className="bg-white rounded-lg shadow-2xl border-0">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Individual Registration</h2>
            <p className="text-slate-600">
              Complete your registration for the NITC 2025 conference
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-12">
            <PersonalInformationForm 
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />

            <PackageSelectionForm 
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />

            <MembershipDiscountForm 
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />

            <div className="flex justify-center pb-2">
              <Button
                type="submit"
                className="w-full py-3 text-white text-base bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Processing..." : "Continue to Email Verification"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 