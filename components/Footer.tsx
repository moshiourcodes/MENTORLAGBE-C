import Link from "next/link"

import { GraduationCap, Mail, Phone, MapPin } from "lucide-react"

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6"

// Quick Navigation Links
const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Tuitions", href: "/tuitions" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
]

// Bottom Navigation Links
const bottomLinks = [
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Tuitions", href: "/tuitions" },
]

// Social Media Links
const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: FaFacebookF,
  },
  {
    name: "X",
    href: "https://x.com/",
    icon: FaXTwitter,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
  },
]

export default function Footer() {
  return (
    <footer className="w-full bg-[#172F35] text-white">
      <div className="mx-auto max-w-360 px-6 pt-12 pb-6 sm:px-10 lg:px-16">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand Section */}
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#399B98] shadow-sm">
                <GraduationCap size={21} className="text-white" />
              </div>

              <span className="text-[17px] font-bold tracking-tight text-[#8AD4CE]">
                MentorLagbe
              </span>
            </Link>

            <p className="max-w-57.5 text-[12px] leading-[1.8] text-[#B5C9C9]">
              Find your perfect tutor or share your expertise with students
              across Bangladesh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold tracking-wide text-white uppercase">
              Quick Links
            </h3>

            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[12px] text-[#B5C9C9] transition-colors duration-200 hover:text-[#8AD4CE]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold tracking-wide text-white uppercase">
              Contact Info
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:mentorlagbe@gmail.com"
                  className="flex items-center gap-2.5 text-[12px] text-[#B5C9C9] transition-colors hover:text-[#8AD4CE]"
                >
                  <Mail size={14} className="shrink-0 text-[#63C0BA]" />
                  <span>mentorlagbe@gmail.com</span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+8801700000000"
                  className="flex items-center gap-2.5 text-[12px] text-[#B5C9C9] transition-colors hover:text-[#8AD4CE]"
                >
                  <Phone size={14} className="shrink-0 text-[#63C0BA]" />
                  <span>+880-1700-000000</span>
                </a>
              </li>

              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Dhaka%2C+Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[12px] text-[#B5C9C9] transition-colors hover:text-[#8AD4CE]"
                >
                  <MapPin size={14} className="shrink-0 text-[#63C0BA]" />
                  <span>Dhaka, Bangladesh</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-[11px] font-bold tracking-wide text-white uppercase">
              Connect With Us
            </h3>

            <p className="mb-4 max-w-62.5 text-[11px] leading-[1.7] text-[#B5C9C9]">
              Follow our social channels for study tips, tutor highlights, and
              updates.
            </p>

            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#36565A] bg-[#234249] text-[#C6D9D8] transition-all duration-200 hover:-translate-y-1 hover:border-[#399B98] hover:bg-[#399B98] hover:text-white"
                  >
                    <Icon size={15} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-[#36565A]" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-[10px] text-[#91ABAC] sm:text-left">
            © {new Date().getFullYear()} MentorLagbe. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {bottomLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] text-[#91ABAC] transition-colors hover:text-[#8AD4CE]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
