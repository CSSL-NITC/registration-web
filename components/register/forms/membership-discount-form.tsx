"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { onMembershipValidation } from "@/lib/api/registration-api"
import toastService from "@/lib/services/toast-service"
import { Building2, Calendar, CheckCircle2, Star, XCircle } from "lucide-react"
import { useState } from "react"
import { IndividualFormData } from "../individual-registration"

interface MembershipDiscountFormProps {
  formData: IndividualFormData
  setFormData: (data: IndividualFormData) => void
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
}

type DiscountType =
  | 'isEarlyBird'
  | 'isCSSLMember'
  | 'isBCSMember'
  | 'isISACAMember'
  | 'isIESLMember'
  | 'isFITISMember'
  | 'isSLASSCOMMember'
  | 'isIEEEMember'

export function MembershipDiscountForm({ formData, setFormData, errors, setErrors }: MembershipDiscountFormProps) {
  const [memberValidation, setMemberValidation] = useState<{ valid: boolean; loading: boolean; message: string }>({ valid: false, loading: false, message: "" })

  const handleDiscountSelect = (discountType: DiscountType, checked: boolean) => {
    // Reset all discount flags
    const resetDiscounts = {
      isEarlyBird: false,
      isCSSLMember: false,
      isBCSMember: false,
      isISACAMember: false,
      isIESLMember: false,
      isFITISMember: false,
      isSLASSCOMMember: false,
      isIEEEMember: false,
      csslMembershipId: "",
      memberId: "",
    }

    // Set the selected discount
    if (checked) {
      resetDiscounts[discountType] = true
    }

    setFormData({ ...formData, ...resetDiscounts })

    // Clear validation state
    setMemberValidation({ valid: false, loading: false, message: "" })

    // Clear errors
    if (errors.csslMembershipId || errors.memberId) {
      const newErrors = { ...errors }
      delete newErrors.csslMembershipId
      delete newErrors.memberId
      setErrors(newErrors)
    }
  }

  const handleMemberIdChange = (field: keyof IndividualFormData, value: string) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user starts typing
    if (errors[field as string]) {
      const newErrors = { ...errors }
      delete newErrors[field as string]
      setErrors(newErrors)
    }
  }

  const validateMemberId = async () => {
    if (!formData.csslMembershipId.trim()) return
    if (!formData.nic.trim()) {
      toastService.showErrorMessage("NIC is should be filed");
      return;
    }
    setMemberValidation({ valid: false, loading: true, message: "" })
   
    try {
      const result = await onMembershipValidation({
        nic: formData.nic,
        code: formData.csslMembershipId
      })

      setMemberValidation({
        valid: true,
        loading: false,
        message: "Valid CSSL member ID",
      })
    } catch (error) {
      setMemberValidation({
        valid: false,
        loading: false,
        message: "Invalid CSSL member ID"
      })
    }
  }

  return (
    <div className="space-y-6 font-['Roboto']">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center text-white text-sm font-bold">
          3
        </div>
        <h3 className="text-xl font-semibold text-slate-900">Membership & Discounts</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Early Bird */}
        <div className={`border-2 rounded-xl p-6 transition-all duration-200 ${formData.isEarlyBird
          ? "border-orange-300 bg-orange-50"
          : "border-slate-200 bg-white hover:border-orange-200"
          }`}>
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-6 h-6 text-orange-600" />
            <Label className="text-lg font-medium text-slate-800">
              Early Bird Discount
            </Label>
          </div>
          <div className="text-2xl font-bold text-orange-600 mb-2">10% OFF</div>
          <p className="text-sm text-slate-700 mb-4">
            Until 10th September 2025
          </p>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="early-bird"
              checked={formData.isEarlyBird}
              onCheckedChange={(checked) => handleDiscountSelect("isEarlyBird", checked as boolean)}
              className="border-slate-300 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
            />
            <Label htmlFor="early-bird" className="text-sm text-slate-700 cursor-pointer">
              I'm eligible for early bird discount
            </Label>
          </div>
        </div>

        {/* CSSL Members */}
        <div className={`border-2 rounded-xl p-6 transition-all duration-200 ${formData.isCSSLMember
          ? "border-slate-300 bg-slate-50"
          : "border-slate-200 bg-white hover:border-slate-300"
          }`}>
          <div className="flex items-center space-x-3 mb-4">
            <Star className="w-6 h-6 text-slate-600" />
            <Label className="text-lg font-medium text-slate-800">
              CSSL Members
            </Label>
          </div>
          <div className="text-2xl font-bold text-slate-600 mb-2">20% OFF</div>
          <p className="text-sm text-slate-700 mb-4">
            Until the event date
          </p>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="cssl-member"
              checked={formData.isCSSLMember}
              onCheckedChange={(checked) => handleDiscountSelect("isCSSLMember", checked as boolean)}
              className="border-slate-300 data-[state=checked]:bg-slate-600 data-[state=checked]:border-slate-600"
            />
            <Label htmlFor="cssl-member" className="text-sm text-slate-700 cursor-pointer">
              I am a CSSL member
            </Label>
          </div>
        </div>

        {/* Other Members */}
        <div className={`border-2 rounded-xl p-6 transition-all duration-200 ${(formData.isBCSMember || formData.isISACAMember || formData.isIESLMember ||
          formData.isFITISMember || formData.isSLASSCOMMember || formData.isIEEEMember)
          ? "border-green-300 bg-green-50"
          : "border-slate-200 bg-white hover:border-green-200"
          }`}>
          <div className="flex items-center space-x-3 mb-4">
            <Building2 className="w-6 h-6 text-green-600" />
            <Label className="text-lg font-medium text-slate-800">
              Other Members
            </Label>
          </div>
          <div className="text-2xl font-bold text-green-600 mb-2">10% OFF</div>
          <p className="text-sm text-slate-700 mb-4">
            Until 30th August 2025
          </p>
          <div className="space-y-2">
            {[
              { id: "bcs", label: "BCS", key: "isBCSMember" },
              { id: "isaca", label: "ISACA", key: "isISACAMember" },
              { id: "iesl", label: "IESL", key: "isIESLMember" },
              { id: "fitis", label: "FITIS", key: "isFITISMember" },
              { id: "slasscom", label: "SLASSCOM", key: "isSLASSCOMMember" },
              { id: "ieee", label: "IEEE", key: "isIEEEMember" },
            ].map((member) => (
              <div key={member.id} className="flex items-center space-x-2">
                <Checkbox
                  id={member.id}
                  checked={formData[member.key as keyof IndividualFormData] as boolean}
                  onCheckedChange={(checked) =>
                    handleDiscountSelect(member.key as DiscountType, checked as boolean)
                  }
                  className="border-slate-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                />
                <Label htmlFor={member.id} className="text-sm text-slate-700 cursor-pointer">
                  {member.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSSL Member ID Field */}
      {formData.isCSSLMember && (
        <div>
          <Label htmlFor="cssl-id" className="text-sm font-medium text-slate-700 mb-2 block">
            CSSL Membership ID *
          </Label>
          <div className="flex gap-2">
            <Input
              id="cssl-id"
              value={formData.csslMembershipId}
              onChange={(e) => handleMemberIdChange("csslMembershipId", e.target.value)}
              className={`flex-1 px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${errors.csslMembershipId ? "border-red-500" : "border-slate-300"
                }`}
              placeholder="Enter your CSSL membership ID"
            />
            <Button
              type="button"
              onClick={validateMemberId}
              disabled={memberValidation.loading || !formData.csslMembershipId.trim()}
              className="px-6 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors"
            >
              {memberValidation.loading ? "Validating..." : "Validate"}
            </Button>
          </div>
          {errors.csslMembershipId && <p className="text-red-500 text-sm mt-1">{errors.csslMembershipId}</p>}
          {memberValidation.message && (
            <div className={`flex items-center mt-2 text-sm ${memberValidation.valid ? "text-green-600" : "text-red-600"
              }`}>
              {memberValidation.valid ? (
                <CheckCircle2 className="w-4 h-4 mr-1" />
              ) : (
                <XCircle className="w-4 h-4 mr-1" />
              )}
              {memberValidation.message}
            </div>
          )}
        </div>
      )}

      {/* Other Member ID Field */}
      {(formData.isBCSMember || formData.isISACAMember || formData.isIESLMember || formData.isFITISMember || formData.isSLASSCOMMember || formData.isIEEEMember) && (
        <div>
          <Label htmlFor="member-id" className="text-sm font-medium text-slate-700 mb-2 block">
            Member ID *
          </Label>
          <Input
            id="member-id"
            value={formData.memberId}
            onChange={(e) => handleMemberIdChange("memberId", e.target.value)}
            className={`w-full px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${errors.memberId ? "border-red-500" : "border-slate-300"
              }`}
            placeholder="Enter your member ID"
          />
          {errors.memberId && <p className="text-red-500 text-sm mt-1">{errors.memberId}</p>}
        </div>
      )}
    </div>
  )
} 