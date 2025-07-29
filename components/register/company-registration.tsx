"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Shield, CheckCircle, Building2, User, Phone, MapPin, Eye, EyeOff } from "lucide-react"
import { sendVerificationEmail } from "@/lib/mock-api/registrations"
import Link from "next/link"
import { toast } from "sonner"

export function CompanyRegistration() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    contactPersonTitle: "Mr.",
    contactPersonFirstName: "",
    contactPersonLastName: "",
    contactPersonDesignation: "",
    contactPersonMobile: "",
    contactPersonEmail: "",
    contactPersonPassword: "",
  })

  const [step, setStep] = useState(1) // 1: Registration, 2: Email Verification, 3: Success
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [sentCode, setSentCode] = useState("")
  const [codeSent, setCodeSent] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required"
    if (!formData.contactPersonFirstName.trim()) newErrors.contactPersonFirstName = "Contact person first name is required"
    if (!formData.contactPersonLastName.trim()) newErrors.contactPersonLastName = "Contact person last name is required"
    if (!formData.contactPersonDesignation.trim()) newErrors.contactPersonDesignation = "Designation is required"
    if (!formData.contactPersonMobile.trim()) newErrors.contactPersonMobile = "Mobile number is required"
    if (!formData.contactPersonEmail.trim()) newErrors.contactPersonEmail = "Email is required"
    if (!formData.contactPersonPassword.trim()) newErrors.contactPersonPassword = "Password is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields")
      return
    }

    setStep(2)
  }

  const handleSendCode = async () => {
    setLoading(true)
    try {
      const result = await sendVerificationEmail(formData.contactPersonEmail)
      setSentCode(result.code)
      setCodeSent(true)
      toast.success("Verification code sent to your email!")
    } catch (error) {
      toast.error("Failed to send verification code")
    } finally {
      setLoading(false)
    }
  }

  const handleEmailVerification = async () => {
    if (verificationCode === sentCode) {
      toast.success("Email verified successfully!")
      setStep(3)
    } else {
      toast.error("Invalid verification code")
    }
  }

  if (step === 2) {
    return (
      <div className="max-w-md mx-auto font-['Roboto']">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Verify Your Email</CardTitle>
            <CardDescription className="text-slate-600">
              We've sent a verification code to {formData.contactPersonEmail}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-slate-200 bg-slate-50">
              <Shield className="h-4 w-4 text-slate-600" />
              <AlertDescription className="text-slate-800">
                Please check your email and enter the 6-digit verification code below.
              </AlertDescription>
            </Alert>

            {!codeSent ? (
              <Button
                onClick={handleSendCode}
                className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="verification-code" className="text-sm font-medium text-slate-700 mb-2 block">
                    Verification Code *
                  </Label>
                  <Input
                    id="verification-code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                  />
                </div>
                
                <Button
                  onClick={handleEmailVerification}
                  className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={verificationCode.length !== 6}
                >
                  Verify Code
                </Button>
                
                <Button
                  onClick={handleSendCode}
                  variant="outline"
                  className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Resend Code"}
                </Button>
              </div>
            )}

            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Back to Registration
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="max-w-md mx-auto font-['Roboto']">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">
              Company Registration Successful!
            </CardTitle>
            <CardDescription className="text-slate-600">
              Your company has been registered successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
              <div className="text-sm text-green-700 space-y-2">
                <p>✓ Your company account has been created</p>
                <p>✓ You can now add team members to your account</p>
                <p>✓ All team members will be managed through your company account</p>
                <p>✓ No individual payment processing required</p>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/">
                <Button className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black shadow-lg hover:shadow-xl transition-all duration-200">
                  Back to Home
                </Button>
              </Link>
              <p className="text-sm text-slate-600">Questions? Contact us at info@nitconf.lk</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto font-['Roboto']">
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            {/* <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div> */}
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Company Registration</h2>
            <p className="text-slate-600">
              Register your company for the NITC 2025 conference. You can add team members after registration.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Company Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName" className="text-sm font-medium text-slate-700">Company Name *</Label>
                  <Input 
                    id="companyName" 
                    value={formData.companyName} 
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} 
                    className={`mt-1 px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${
                      errors.companyName ? "border-red-500" : "border-slate-300"
                    }`} 
                    placeholder="Enter your company name" 
                  />
                  {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <Label htmlFor="companyAddress" className="text-sm font-medium text-slate-700">Company Address *</Label>
                  <Textarea 
                    id="companyAddress" 
                    value={formData.companyAddress} 
                    onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })} 
                    className={`mt-1 px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors resize-none ${
                      errors.companyAddress ? "border-red-500" : "border-slate-300"
                    }`} 
                    placeholder="Enter your company address" 
                    rows={1} 
                  />
                  {errors.companyAddress && <p className="text-red-500 text-sm mt-1">{errors.companyAddress}</p>}
                </div>
              </div>
            </div>

            {/* Contact Person Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Contact Person Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Improved Title Field */}
                <div>
                  <Label htmlFor="contactPersonTitle" className="text-sm font-medium text-slate-700 mb-2 block">Title *</Label>
                  <div className="relative">
                    <select
                      id="contactPersonTitle"
                      value={formData.contactPersonTitle}
                      onChange={e => setFormData({ ...formData, contactPersonTitle: e.target.value })}
                      className={`w-full px-4 py-[10px] text-sm bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors appearance-none ${
                        errors.contactPersonTitle ? "border-red-500" : "border-slate-300"
                      }`}
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactPersonFirstName" className="text-sm font-medium text-slate-700">First Name *</Label>
                  <Input
                    id="contactPersonFirstName"
                    value={formData.contactPersonFirstName}
                    onChange={e => setFormData({ ...formData, contactPersonFirstName: e.target.value })}
                    className={`mt-1 px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${errors.contactPersonFirstName ? "border-red-500" : "border-slate-300"}`}
                    placeholder="Enter first name"
                  />
                  {errors.contactPersonFirstName && <p className="text-red-500 text-sm mt-1">{errors.contactPersonFirstName}</p>}
                </div>
                <div>
                  <Label htmlFor="contactPersonLastName" className="text-sm font-medium text-slate-700">Last Name *</Label>
                  <Input
                    id="contactPersonLastName"
                    value={formData.contactPersonLastName}
                    onChange={e => setFormData({ ...formData, contactPersonLastName: e.target.value })}
                    className={`mt-1 px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${errors.contactPersonLastName ? "border-red-500" : "border-slate-300"}`}
                    placeholder="Enter last name"
                  />
                  {errors.contactPersonLastName && <p className="text-red-500 text-sm mt-1">{errors.contactPersonLastName}</p>}
                </div>
                <div>
                  <Label htmlFor="contactPersonDesignation" className="text-sm font-medium text-slate-700">Designation *</Label>
                  <Input
                    id="contactPersonDesignation"
                    value={formData.contactPersonDesignation}
                    onChange={e => setFormData({ ...formData, contactPersonDesignation: e.target.value })}
                    className={`mt-1 px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${errors.contactPersonDesignation ? "border-red-500" : "border-slate-300"}`}
                    placeholder="e.g., HR Manager, Director"
                  />
                  {errors.contactPersonDesignation && <p className="text-red-500 text-sm mt-1">{errors.contactPersonDesignation}</p>}
                </div>
                <div>
                  <Label htmlFor="contactPersonMobile" className="text-sm font-medium text-slate-700">Mobile Number *</Label>
                  <Input
                    id="contactPersonMobile"
                    value={formData.contactPersonMobile}
                    onChange={e => setFormData({ ...formData, contactPersonMobile: e.target.value })}
                    placeholder="0771234567"
                    className={`mt-1 px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${errors.contactPersonMobile ? "border-red-500" : "border-slate-300"}`}
                  />
                  {errors.contactPersonMobile && <p className="text-red-500 text-sm mt-1">{errors.contactPersonMobile}</p>}
                </div>
                <div>
                  <Label htmlFor="contactPersonEmail" className="text-sm font-medium text-slate-700">Email Address *</Label>
                  <Input
                    id="contactPersonEmail"
                    type="email"
                    value={formData.contactPersonEmail}
                    onChange={e => setFormData({ ...formData, contactPersonEmail: e.target.value })}
                    className={`mt-1 px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${errors.contactPersonEmail ? "border-red-500" : "border-slate-300"}`}
                    placeholder="contact@example.com"
                  />
                  {errors.contactPersonEmail && <p className="text-red-500 text-sm mt-1">{errors.contactPersonEmail}</p>}
                </div>
                <div className="col-span-1">
                  <Label htmlFor="contactPersonPassword" className="text-sm font-medium text-slate-700">Password *</Label>
                  <div className="relative">
                    <Input
                      id="contactPersonPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.contactPersonPassword}
                      onChange={e => setFormData({ ...formData, contactPersonPassword: e.target.value })}
                      className={`w-full px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors pr-12 ${errors.contactPersonPassword ? "border-red-500" : "border-slate-300"}`}
                      placeholder="Enter a secure password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                      tabIndex={-1}
                      onClick={() => setShowPassword(v => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.contactPersonPassword && <p className="text-red-500 text-sm mt-1">{errors.contactPersonPassword}</p>}
                </div>
              </div>
            </div>

            {/* Information Alert */}
            <Alert className="border-slate-200 bg-slate-50">
              <Building2 className="h-4 w-4 text-slate-600" />
              <AlertDescription className="text-slate-800">
                <strong>Company Registration Benefits:</strong> After registration, you can add multiple team members
                without individual payment processing. All team members will be managed through your company account.
              </AlertDescription>
            </Alert>

            <Button
              type="submit"
              className="w-full py-3 text-white text-base bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Processing..." : "Continue to Email Verification"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}