"use client"

import { Button } from "@/components/ui/button"
import { onRegistrationInit } from "@/lib/api/registration-api"
import { PredefinedRole } from "@/lib/constants/@types"
import { isAlreadyUsed } from "@/lib/utils/email-vaildation-utils"
import { useState } from "react"
import { toast } from "sonner"
import { MembershipDiscountForm } from "./forms/membership-discount-form"
import { PackageSelectionForm } from "./forms/package-selection-form"
import { PersonalInformationForm } from "./forms/personal-information-form"
import { EmailVerificationStep } from "./steps/email-verification-step"
import { PaymentSummaryStep } from "./steps/payment-summary-step"
import { IframeViewer } from "../iframe-veiwer"

export interface CompanyCreateRQ {
  name: string;
  address: string;
}

export interface RegistrationRequest {
  userType: string;
  password: string;
  mobile: string;
  firstName: string;
  lastName: string;
  designation: string;
  email: string;
  nic?: string;
  workplace?: string;
  packages?: number[];
  company?: CompanyCreateRQ;
  address?: string;
  membershipCode?: string;
  discountId?: number;
}

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
  packageIds: number[];
  packageNames: string[];
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
  discountId?: number;
}

interface RegistrationInitResponseData {
  reqid: string;
  expireAt: string;
  paymentPageUrl: string;
}

interface RegistrationInitResponse {
  messageId: string;
  responseData: RegistrationInitResponseData;
}

export function IndividualRegistration() {
  const [registrationInitResponse, setRegistrationInitResponse] = useState<RegistrationInitResponse | undefined>(undefined);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
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
    packageIds: [],
    packageNames: [],
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

  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

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

    // Package Validation - now checking packageId instead of package
    if (formData.packageIds.length === 0) {
      newErrors.package = "Please select at least one conference package"
    }

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fill in all required fields")
      return
    }

    isAlreadyUsed(formData.email, () => { setStep(2) });
  }

  const handleBackToForm = () => {
    setStep(1)
  }

  // discount and payment should go with this
  const handlePaymentComplete = () => {
    const request: RegistrationRequest = {
      userType: PredefinedRole.INDIVIDUAL_USER,
      password: formData.password,
      mobile: formData.mobile,
      nic: formData.nic,
      firstName: `${formData.title} ${formData.firstName}`,
      lastName: formData.lastName,
      email: formData.email,
      packages: formData.packageIds,
      designation: formData.designation,
      workplace: formData.workplace,
      membershipCode: formData.csslMembershipId,
      discountId: formData.discountId,
    };

    console.log(request);

    onRegistrationInit(request)
      .then(res => {
        setRegistrationInitResponse(res.data);
        setShowPaymentModal(true);
      }).catch(() => { });
  }

  if (step === 2) {
    return (
      <EmailVerificationStep
        email={formData.email}
        onNext={() => setStep(3)}
        onBack={() => setStep(1)}
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

  if (showPaymentModal && !!registrationInitResponse) {
    return (
      <IframeViewer 
        url={registrationInitResponse.responseData.paymentPageUrl}
        onClose={() => setShowPaymentModal(false)}
      />
    )
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