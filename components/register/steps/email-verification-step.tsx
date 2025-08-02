"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { onVerifyCode, sendCode } from "@/lib/api/email-validation-api"
import toastService from "@/lib/services/toast-service"
import { ArrowLeft, Mail, Shield } from "lucide-react"
import { useState } from "react"

interface EmailVerificationStepProps {
  email: string
  onBack: () => void
  onNext: () => void
  loading: boolean
}

export function EmailVerificationStep({ email, onNext, onBack, loading }: EmailVerificationStepProps) {
  const [verificationCode, setVerificationCode] = useState("")
  const [verifying, setVerifying] = useState(false)

  const handleResendCode = async () => {
    setVerifying(true)
    try {
      const result = await sendCode({ email })
      toastService.showSuccessMessage("Verification code sent to your email!")
    } catch (error) {
      toastService.showErrorMessage("Failed to send verification code")
    } finally {
      setVerifying(false)
    }
  }

  const handleEmailVerification = () => {
    onVerifyCode({
      email: email,
      code: verificationCode
    }).then(() => {
      toastService.showSuccessMessage("Email verified successfully!")
      onNext()
    }).catch(() => {
      // toastService.showSuccessMessage("Email verified successfully!")
    })

  }

  return (
    <div className="max-w-md mx-auto font-['Roboto']">
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">Verify Your Email</CardTitle>
          <CardDescription className="text-slate-600">
            We've sent a verification code to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-slate-200 bg-slate-50">
            <Shield className="h-4 w-4 text-slate-600 dark:text-black" />
            <AlertDescription className="text-slate-800">
              Please check your email and enter the 6-digit verification code below.
            </AlertDescription>
          </Alert>

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
              className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black shadow-lg hover:shadow-xl transition-all duration-200 text-white"
              disabled={loading || verificationCode.length !== 6}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </Button>

            <Button
              onClick={handleResendCode}
              variant="outline"
              className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 text-white"
              disabled={verifying}
            >
              {verifying ? "Sending..." : "Resend Code"}
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={onBack}
            className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Registration
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 