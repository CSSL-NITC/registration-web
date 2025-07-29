"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Linkedin, Mail } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="bg-[#f7f8f7] border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center text-center gap-4">
        {/* Logo */}
        <Image
          src="https://res.cloudinary.com/djxtjt1uf/image/upload/v1753804463/NITC-Logo-7c1f04fc_qobxl1.png"
          alt="NITC 2025 Logo"
          width={150}
          height={100}
          className="h-auto w-auto max-w-[160px]"
          priority
        />

        {/* Social Icons */}
        <div className="flex gap-4 mt-2">
          <Link
            href="https://www.facebook.com/ComputerSocietySriLanka"
            target="_blank"
            aria-label="Facebook"
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-200 transition"
          >
            <Facebook className="w-5 h-5 text-gray-600" />
          </Link>
          <Link
            href="https://www.linkedin.com/company/cssl/"
            target="_blank"
            aria-label="LinkedIn"
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-200 transition"
          >
            <Linkedin className="w-5 h-5 text-gray-600" />
          </Link>
          <Link
            href="mailto:admin.exec@cssl.lk"
            aria-label="Email"
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-200 transition"
          >
            <Mail className="w-5 h-5 text-gray-600" />
          </Link>
        </div>

        {/* Text */}
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          2025 © Powered by{' '}
          <Link 
            href="https://veloce.onrender.com/" 
            target="_blank"
            className="font-semibold hover:underline"
          >
            VELOCE
          </Link>.
        </p>
      </div>
    </footer>
  )
}
