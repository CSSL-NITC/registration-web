"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export function SuccessStep() {
  return (
    <div className="max-w-md mx-auto font-['Roboto']">
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            Registration Successful!
          </CardTitle>
          <CardDescription className="text-slate-600">
            Your registration has been submitted successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
            <div className="text-sm text-green-700 space-y-2">
              <p>✓ Your registration is now pending payment verification</p>
              <p>✓ Admin will verify your payment within 24 hours</p>
              <p>✓ You'll receive an invoice and QR code via email</p>
              <p>✓ Use the QR code for seamless conference entry</p>
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