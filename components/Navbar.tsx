"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useSession } from "@/lib/auth-client"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Tuitions", href: "/tuitions" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const {data:session}=useSession();
  console.log('user session in navbar',session)

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <nav className="mx-auto flex h-17 max-w-360 items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 text-xl font-bold text-white shadow-sm">
            M
          </div>

          <span className="text-[19px] font-bold tracking-tight text-slate-900">
            MentorLagbe
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => {
            const active = isActive(link.href)

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 text-[13px] font-semibold transition-colors duration-200 ${
                  active
                    ? "text-violet-600"
                    : "text-slate-600 hover:text-violet-600"
                }`}
              >
                {link.name}

                {active && (
                  <span className="absolute -bottom-2.75 left-0 h-0.5 w-full rounded-full bg-violet-600" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Desktop Authentication Buttons */}
        <div className="hidden items-center gap-2.5 md:flex">
          <Link
            href="/sign-in"
            className={`rounded-lg border px-5 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
              pathname === "/sign-in"
                ? "border-violet-600 bg-violet-50 text-violet-600"
                : "border-violet-200 text-violet-600 hover:border-violet-600 hover:bg-violet-50"
            }`}
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className={`rounded-lg bg-linear-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:from-violet-700 hover:to-indigo-700 hover:shadow-md ${
              pathname === "/sign-up" ? "ring-2 ring-violet-200" : ""
            }`}
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-violet-50 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-5 pt-3 pb-5 shadow-lg md:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => {
              const active = isActive(link.href)

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-violet-50 text-violet-600"
                      : "text-slate-600 hover:bg-gray-50 hover:text-violet-600"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile Authentication Buttons */}
          <div className="mt-4 flex gap-3 border-t border-gray-100 pt-4">
            <Link
              href="/sign-in"
              onClick={closeMenu}
              className="flex-1 rounded-lg border border-violet-200 py-2.5 text-center text-sm font-semibold text-violet-600 hover:bg-violet-50"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              onClick={closeMenu}
              className="flex-1 rounded-lg bg-linear-to-r from-violet-600 to-indigo-600 py-2.5 text-center text-sm font-semibold text-white hover:from-violet-700 hover:to-indigo-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
