"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CreditCard, CheckCircle, Sparkles, DollarSign, Users } from "lucide-react"
import { IndividualFormData } from "../individual-registration"

interface PaymentSummaryStepProps {
  formData: IndividualFormData
  onPaymentComplete: () => void
  onBack: () => void
  loading: boolean
}

const packages = [
  {
    id: "all3",
    name: "FULL CONFERENCE WITH INAUGURATION",
    price: 50000,
    usdPrice: 250,
  },
  {
    id: "day1",
    name: "INAUGURATION CEREMONY",
    price: 20000,
    usdPrice: 100,
  },
  {
    id: "day1-2",
    name: "NITC CONFERENCE DAY 01",
    price: 15000,
    usdPrice: 75,
  },
  {
    id: "day2-3",
    name: "NITC CONFERENCE DAY 02",
    price: 15000,
    usdPrice: 75,
  },
]

export function PaymentSummaryStep({ formData, onPaymentComplete, onBack, loading }: PaymentSummaryStepProps) {
  const selectedPackage = packages.find((p) => p.id === formData.package)
  const originalPrice = selectedPackage?.price || 0
  const originalUSDPrice = selectedPackage?.usdPrice || 0
  
  const getDiscountPercentage = () => {
    if (formData.isCSSLMember) return 20
    if (formData.isEarlyBird || formData.isBCSMember || formData.isISACAMember || formData.isIESLMember || formData.isFITISMember || formData.isSLASSCOMMember || formData.isIEEEMember) return 10
    return 0
  }
  
  const discountPercentage = getDiscountPercentage()
  const discount = originalPrice * (discountPercentage / 100)
  const usdDiscount = originalUSDPrice * (discountPercentage / 100)
  const finalPrice = originalPrice - discount
  const finalUSDPrice = Math.round(originalUSDPrice - usdDiscount)

  return (
    <div className="max-w-2xl mx-auto font-['Roboto']">
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">Payment Summary</CardTitle>
          <CardDescription className="text-slate-600">
            Complete your registration payment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-lg mb-4 flex items-center text-slate-900">
              <Users className="mr-2 h-5 w-5 text-slate-600" />
              Registration Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Name</p>
                <p className="font-medium text-slate-900">{formData.firstName} {formData.lastName}</p>
              </div>
              <div>
                <p className="text-slate-600">Email</p>
                <p className="font-medium text-slate-900">{formData.email}</p>
              </div>
              <div>
                <p className="text-slate-600">Package</p>
                <p className="font-medium text-slate-900">{selectedPackage?.name}</p>
              </div>
              <div>
                <p className="text-slate-600">Workplace</p>
                <p className="font-medium text-slate-900">{formData.workplace}</p>
              </div>
              {formData.isCSSLMember && (
                <div className="md:col-span-2">
                  <p className="text-slate-600">CSSL Member ID</p>
                  <Badge className="bg-slate-100 text-slate-800 border-slate-200">
                    {formData.csslMembershipId}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h3 className="font-semibold text-lg mb-4 flex items-center text-slate-900">
              <Sparkles className="mr-2 h-5 w-5 text-green-600" />
              Payment Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Package Price:</span>
                <div className="text-right">
                  <div className="font-medium text-slate-900">
                    LKR {originalPrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-500">${originalUSDPrice}</div>
                </div>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center text-green-700">
                  <span>{discountPercentage}% Discount:</span>
                  <div className="text-right">
                    <div className="font-medium">-LKR {discount.toLocaleString()}</div>
                    <div className="text-sm">-${usdDiscount.toFixed(0)}</div>
                  </div>
                </div>
              )}
              <hr className="border-green-200" />
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-slate-900">Total Amount:</span>
                <div className="text-right">
                  <div className="text-green-600">LKR {finalPrice.toLocaleString()}</div>
                  <div className="text-sm text-green-500 flex items-center">
                    <DollarSign className="w-3 h-3 mr-1" />${finalUSDPrice}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Alert className="border-slate-200 bg-slate-50">
            <CheckCircle className="h-4 w-4 text-slate-600" />
            <AlertDescription className="text-slate-800">
              After payment verification by admin, you will receive an invoice and QR code via email for conference
              entry at Shangri-La Hotel, Colombo.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onPaymentComplete}
              className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black py-3 shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </Button>
            <Button
              variant="outline"
              onClick={onBack}
              className="sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Back to Form
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 