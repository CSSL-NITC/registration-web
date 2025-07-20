"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Shield, CreditCard, CheckCircle, Globe, Sparkles, DollarSign } from "lucide-react"
import Link from "next/link"
import { createRegistration } from "@/lib/mock-api/registrations"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    nic: "",
    address: "",
    workplace: "",
    designation: "",
    package: "",
    isCSSLMember: false,
    csslMembershipId: "",
    isEarlyBird: true,
  })

  const [step, setStep] = useState(1) // 1: Registration, 2: Email Verification, 3: Payment
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const packages = [
    {
      id: "day1",
      name: "Day 1 - Inauguration",
      price: 20000,
      usdPrice: 67,
      description: "Opening ceremony and keynote speeches",
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: "day1-2",
      name: "NITC Conference Day 01 (Day 02)",
      price: 35000,
      usdPrice: 117,
      description: "Day 1 plus technical sessions",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "day2-3",
      name: "NITC Conference Day 02 (Day 03)",
      price: 35000,
      usdPrice: 117,
      description: "Advanced technical sessions and innovation",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "all3",
      name: "Full Conference with Inauguration (All 3 Days)",
      price: 50000,
      usdPrice: 167,
      description: "Complete conference experience",
      color: "from-purple-500 to-pink-500",
    },
  ]

  const calculatePrice = () => {
    const selectedPackage = packages.find((p) => p.id === formData.package)
    if (!selectedPackage) return 0

    let price = selectedPackage.price

    if (formData.isCSSLMember) {
      price = price * 0.8 // 20% discount
    } else if (formData.isEarlyBird) {
      price = price * 0.85 // 15% discount
    }

    return price
  }

  const calculateUSDPrice = () => {
    const selectedPackage = packages.find((p) => p.id === formData.package)
    if (!selectedPackage) return 0

    let price = selectedPackage.usdPrice

    if (formData.isCSSLMember) {
      price = price * 0.8 // 20% discount
    } else if (formData.isEarlyBird) {
      price = price * 0.85 // 15% discount
    }

    return Math.round(price)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required"
    else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/\s/g, "")))
      newErrors.mobile = "Mobile number must be 10 digits"
    if (!formData.nic.trim()) newErrors.nic = "NIC is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.workplace.trim()) newErrors.workplace = "Workplace is required"
    if (!formData.package) newErrors.package = "Please select a package"
    if (formData.isCSSLMember && !formData.csslMembershipId.trim()) {
      newErrors.csslMembershipId = "CSSL Membership ID is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setLoading(true)
      try {
        // Simulate email verification
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setStep(2)
      } catch (error) {
        console.error("Registration failed:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEmailVerification = async () => {
    setLoading(true)
    try {
      // Simulate email verification
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStep(3)
    } catch (error) {
      console.error("Email verification failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    setLoading(true)
    try {
      const selectedPackage = packages.find((p) => p.id === formData.package)
      if (!selectedPackage) return

      const registrationData = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        nic: formData.nic,
        address: formData.address,
        workplace: formData.workplace,
        designation: formData.designation,
        package: formData.package as "day1" | "day1-2" | "day2-3" | "all3",
        packageName: selectedPackage.name,
        originalPrice: selectedPackage.price,
        discountPercentage: formData.isCSSLMember ? 20 : formData.isEarlyBird ? 15 : 0,
        finalPrice: calculatePrice(),
        isCSSLMember: formData.isCSSLMember,
        csslMembershipId: formData.csslMembershipId,
        paymentStatus: "pending" as const,
        emailVerified: true,
        qrCodeGenerated: false,
        invoiceGenerated: false,
      }

      await createRegistration(registrationData)
      setStep(4) // Success step
    } catch (error) {
      console.error("Payment processing failed:", error)
    } finally {
      setLoading(false)
    }
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-blue-950 py-12">
        <div className="max-w-md mx-auto px-4">
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Verify Your Email</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                We've sent a verification link to {formData.email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-800 dark:text-blue-300">
                  Please check your email and click the verification link to continue with payment.
                </AlertDescription>
              </Alert>
              <Button
                onClick={handleEmailVerification}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Verifying..." : "I've Verified My Email"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="w-full border-gray-300 dark:border-gray-600"
              >
                Back to Registration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === 3) {
    const selectedPackage = packages.find((p) => p.id === formData.package)
    const finalPrice = calculatePrice()
    const finalUSDPrice = calculateUSDPrice()
    const originalPrice = selectedPackage?.price || 0
    const originalUSDPrice = selectedPackage?.usdPrice || 0
    const discount = originalPrice - finalPrice
    const usdDiscount = originalUSDPrice - finalUSDPrice

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-blue-950 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Payment Summary</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Complete your registration payment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-700 dark:to-blue-900/20 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <h3 className="font-semibold text-lg mb-4 flex items-center text-gray-900 dark:text-white">
                  <Globe className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Registration Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Package</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedPackage?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Workplace</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.workplace}</p>
                  </div>
                  {formData.isCSSLMember && (
                    <div className="md:col-span-2">
                      <p className="text-gray-600 dark:text-gray-400">CSSL Member ID</p>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800">
                        {formData.csslMembershipId}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-lg mb-4 flex items-center text-gray-900 dark:text-white">
                  <Sparkles className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                  Payment Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Package Price:</span>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-white">
                        LKR {originalPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">${originalUSDPrice}</div>
                    </div>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-green-700 dark:text-green-400">
                      <span>{formData.isCSSLMember ? "CSSL Member Discount (20%)" : "Early Bird Discount (15%)"}:</span>
                      <div className="text-right">
                        <div className="font-medium">-LKR {discount.toLocaleString()}</div>
                        <div className="text-sm">-${usdDiscount}</div>
                      </div>
                    </div>
                  )}
                  <hr className="border-green-200 dark:border-green-700" />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900 dark:text-white">Total Amount:</span>
                    <div className="text-right">
                      <div className="text-green-600 dark:text-green-400">LKR {finalPrice.toLocaleString()}</div>
                      <div className="text-sm text-green-500 dark:text-green-400 flex items-center">
                        <DollarSign className="w-3 h-3 mr-1" />${finalUSDPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
                <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-800 dark:text-blue-300">
                  After payment verification by admin, you will receive an invoice and QR code via email for conference
                  entry at Shangri-La Hotel, Colombo.
                </AlertDescription>
              </Alert>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handlePayment}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Proceed to Payment"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="sm:w-auto border-gray-300 dark:border-gray-600"
                >
                  Back to Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-slate-900 dark:to-green-950 py-12">
        <div className="max-w-md mx-auto px-4">
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-400">
                Registration Successful!
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Your registration has been submitted successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">What's Next?</h3>
                <div className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <p>✓ Your registration is now pending payment verification</p>
                  <p>✓ Admin will verify your payment within 24 hours</p>
                  <p>✓ You'll receive an invoice and QR code via email</p>
                  <p>✓ Use the QR code for seamless conference entry</p>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200">
                    Back to Home
                  </Button>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400">Questions? Contact us at info@nitconf.lk</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-blue-950 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/"
            className="group inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Conference Registration</CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              Register for Nation IT Conference 2025 at Shangri-La Hotel, Colombo, Sri Lanka
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`mt-1 ${errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"} dark:bg-slate-700 dark:text-white`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`mt-1 ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"} dark:bg-slate-700 dark:text-white`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="mobile" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Mobile Number *
                    </Label>
                    <Input
                      id="mobile"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="0771234567"
                      className={`mt-1 ${errors.mobile ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"} dark:bg-slate-700 dark:text-white`}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                  </div>

                  <div>
                    <Label htmlFor="nic" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      NIC Number *
                    </Label>
                    <Input
                      id="nic"
                      value={formData.nic}
                      onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                      placeholder="123456789V or 123456789012"
                      className={`mt-1 ${errors.nic ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"} dark:bg-slate-700 dark:text-white`}
                    />
                    {errors.nic && <p className="text-red-500 text-sm mt-1">{errors.nic}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address *
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`mt-1 ${errors.address ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"} dark:bg-slate-700 dark:text-white`}
                    placeholder="Enter your full address"
                    rows={3}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="workplace" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Workplace *
                    </Label>
                    <Input
                      id="workplace"
                      value={formData.workplace}
                      onChange={(e) => setFormData({ ...formData, workplace: e.target.value })}
                      className={`mt-1 ${errors.workplace ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"} dark:bg-slate-700 dark:text-white`}
                      placeholder="Your company or organization"
                    />
                    {errors.workplace && <p className="text-red-500 text-sm mt-1">{errors.workplace}</p>}
                  </div>

                  <div>
                    <Label htmlFor="designation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Designation
                    </Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="mt-1 border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:bg-slate-700 dark:text-white"
                      placeholder="Your job title (optional)"
                    />
                  </div>
                </div>
              </div>

              {/* Package Selection */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Conference Package *</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {packages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg dark:bg-slate-700 ${
                        formData.package === pkg.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
                      }`}
                      onClick={() => setFormData({ ...formData, package: pkg.id })}
                    >
                      <CardHeader className="pb-4">
                        <div className={`w-full h-2 bg-gradient-to-r ${pkg.color} rounded-t-lg -mx-6 -mt-6 mb-4`} />
                        <CardTitle className="text-lg text-gray-900 dark:text-white">{pkg.name}</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-300">
                          {pkg.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            LKR {pkg.price.toLocaleString()}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span className="text-lg font-semibold">${pkg.usdPrice}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="package"
                            value={pkg.id}
                            checked={formData.package === pkg.id}
                            onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-300">Select this package</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {errors.package && <p className="text-red-500 text-sm">{errors.package}</p>}
              </div>

              {/* Membership and Discounts */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Membership & Discounts</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Checkbox
                          id="cssl-member"
                          checked={formData.isCSSLMember}
                          onCheckedChange={(checked) => setFormData({ ...formData, isCSSLMember: checked as boolean })}
                        />
                        <Label htmlFor="cssl-member" className="text-lg font-medium text-green-800 dark:text-green-400">
                          I am a CSSL member
                        </Label>
                      </div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">20% OFF</div>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Computer Society of Sri Lanka members get exclusive discount
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <CheckCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        <Label className="text-lg font-medium text-orange-800 dark:text-orange-400">
                          Early Bird Special
                        </Label>
                      </div>
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">15% OFF</div>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        Automatically applied for non-CSSL members!
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {formData.isCSSLMember && (
                  <div>
                    <Label htmlFor="cssl-id" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      CSSL Membership ID *
                    </Label>
                    <Input
                      id="cssl-id"
                      value={formData.csslMembershipId}
                      onChange={(e) => setFormData({ ...formData, csslMembershipId: e.target.value })}
                      className={`mt-1 ${errors.csslMembershipId ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"} dark:bg-slate-700 dark:text-white`}
                      placeholder="Enter your CSSL membership ID"
                    />
                    {errors.csslMembershipId && <p className="text-red-500 text-sm mt-1">{errors.csslMembershipId}</p>}
                  </div>
                )}
              </div>

              {/* Price Preview */}
              {formData.package && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-lg mb-4 flex items-center text-gray-900 dark:text-white">
                    <Sparkles className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Price Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">Base Price:</span>
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white">
                          LKR {packages.find((p) => p.id === formData.package)?.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          ${packages.find((p) => p.id === formData.package)?.usdPrice}
                        </div>
                      </div>
                    </div>
                    {(formData.isCSSLMember || formData.isEarlyBird) && (
                      <div className="flex justify-between items-center text-green-700 dark:text-green-400">
                        <span>{formData.isCSSLMember ? "CSSL Discount (20%)" : "Early Bird Discount (15%)"}:</span>
                        <div className="text-right">
                          <div className="font-medium">
                            -LKR{" "}
                            {(
                              (packages.find((p) => p.id === formData.package)?.price || 0) - calculatePrice()
                            ).toLocaleString()}
                          </div>
                          <div className="text-sm">
                            -${(packages.find((p) => p.id === formData.package)?.usdPrice || 0) - calculateUSDPrice()}
                          </div>
                        </div>
                      </div>
                    )}
                    <hr className="border-blue-200 dark:border-blue-700" />
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span className="text-gray-900 dark:text-white">Total Amount:</span>
                      <div className="text-right">
                        <div className="text-blue-600 dark:text-blue-400">LKR {calculatePrice().toLocaleString()}</div>
                        <div className="text-sm text-blue-500 dark:text-blue-400 flex items-center justify-end">
                          <DollarSign className="w-3 h-3 mr-1" />${calculateUSDPrice()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full py-3 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Processing..." : "Continue to Email Verification"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
