"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IndividualFormData } from "../individual-registration"
import { Eye, EyeOff } from "lucide-react"

interface PersonalInformationFormProps {
  formData: IndividualFormData
  setFormData: (data: IndividualFormData) => void
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
}

export function PersonalInformationForm({ formData, setFormData, errors, setErrors }: PersonalInformationFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (field: keyof IndividualFormData, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  return (
    <div className="space-y-6 font-['Roboto']">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center text-white text-sm font-bold">
          1
        </div>
        <h3 className="text-xl font-semibold text-slate-900">Personal Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title Field */}
        <div className="md:col-span-1">
          <Label htmlFor="title" className="text-sm font-medium text-slate-700 mb-2 block">Title *</Label>
          <div className="relative">
            <select
              id="title"
              value={formData.title}
              onChange={e => handleInputChange("title", e.target.value)}
              className={`w-full px-4 py-[10px] bg-white text-sm text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors appearance-none ${errors.title ? "border-red-500" : "border-slate-300"}`}
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
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* First Name Field */}
        <div>
          <Label htmlFor="firstName" className="text-sm font-medium text-slate-700 mb-2 block">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={e => handleInputChange("firstName", e.target.value)}
            className={`w-full px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${errors.firstName ? "border-red-500" : "border-slate-300"}`}
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        {/* Last Name Field */}
        <div>
          <Label htmlFor="lastName" className="text-sm font-medium text-slate-700 mb-2 block">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={e => handleInputChange("lastName", e.target.value)}
            className={`w-full px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${errors.lastName ? "border-red-500" : "border-slate-300"}`}
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

        {/* Email Field */}
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2 block">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={e => handleInputChange("email", e.target.value)}
            className={`w-full px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${errors.email ? "border-red-500" : "border-slate-300"}`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Mobile Field */}
        <div>
          <Label htmlFor="mobile" className="text-sm font-medium text-slate-700 mb-2 block">Mobile Number *</Label>
          <Input
            id="mobile"
            value={formData.mobile}
            onChange={e => handleInputChange("mobile", e.target.value)}
            placeholder="0771234567"
            className={`w-full px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${errors.mobile ? "border-red-500" : "border-slate-300"}`}
          />
          {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
        </div>

        {/* NIC Field */}
        <div>
          <Label htmlFor="nic" className="text-sm font-medium text-slate-700 mb-2 block">NIC Number *</Label>
          <Input
            id="nic"
            value={formData.nic}
            onChange={e => handleInputChange("nic", e.target.value)}
            placeholder="123456789V or 123456789012"
            className={`w-full px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${errors.nic ? "border-red-500" : "border-slate-300"}`}
          />
          {errors.nic && <p className="text-red-500 text-sm mt-1">{errors.nic}</p>}
        </div>

        {/* Workplace Field */}
        <div>
          <Label htmlFor="workplace" className="text-sm font-medium text-slate-700 mb-2 block">Workplace *</Label>
          <Input
            id="workplace"
            value={formData.workplace}
            onChange={e => handleInputChange("workplace", e.target.value)}
            className={`w-full px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${errors.workplace ? "border-red-500" : "border-slate-300"}`}
            placeholder="Your company or organization"
          />
          {errors.workplace && <p className="text-red-500 text-sm mt-1">{errors.workplace}</p>}
        </div>

        {/* Designation Field */}
        <div>
          <Label htmlFor="designation" className="text-sm font-medium text-slate-700 mb-2 block">Designation *</Label>
          <Input
            id="designation"
            value={formData.designation}
            onChange={e => handleInputChange("designation", e.target.value)}
            className={`w-full px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors ${errors.designation ? "border-red-500" : "border-slate-300"}`}
            placeholder="Your job title"
          />
          {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
        </div>

        {/* Improved Password Field */}
        <div>
          <Label htmlFor="password" className="text-sm font-medium text-slate-700 mb-2 block">Password *</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={e => handleInputChange("password", e.target.value)}
              className={`w-full px-4 py-3 bg-white text-slate-900 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors pr-12 ${errors.password ? "border-red-500" : "border-slate-300"}`}
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
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="hidden md:block"></div>
      </div>
    </div>
  )
}