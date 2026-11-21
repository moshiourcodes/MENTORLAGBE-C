"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  UserRound,
  ChevronDown,
} from "lucide-react"
import { toast } from "sonner"

import { authClient, useSession } from "@/lib/auth-client"
import { ThemeToggle } from "@/components/ThemeToggle"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Tuitions", href: "/tuitions" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
]

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("")
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  const { data: session, isPending } = useSession()
  const user = session?.user

  const userRole =
    (user as (typeof user & { role?: string }) | undefined)?.role || "student"

  const formattedRole = userRole.charAt(0).toUpperCase() + userRole.slice(1)

  const dashboardRoutes: Record<string, string> = {
    student: "/dashboard/student",
    tutor: "/dashboard/tutor",
    admin: "/dashboard/admin",
  }

  const dashboardPath = dashboardRoutes[userRole] || "/dashboard/student"

  // Dashboards render their own shell, so hide the public navbar there.
  if (pathname.startsWith("/dashboard")) {
    return null
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const closeMenu = () => {
    setIsOpen(false)
    setIsProfileOpen(false)
  }

  const handleSignOut = async () => {
    if (isSigningOut) return

    setIsSigningOut(true)

    try {
      const { error } = await authClient.signOut()

      if (error) {
        throw new Error(error.message || "Unable to sign out.")
      }

      closeMenu()

      toast.success("Signed out successfully!")

      router.push("/")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sign out failed.")
    } finally {
      setIsSigningOut(false)
    }
  }

  const renderProfileButton = () => {
    if (!user) return null

    const name = user.name || "User"

    return (
      <div className="relative">
        {/* Profile Button */}
        <button
          type="button"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          aria-expanded={isProfileOpen}
          aria-label="Open account menu"
          className="flex min-w-55 items-center gap-3 rounded-[22px] border border-[#DCE4ED] bg-white px-3 py-2 text-left transition hover:border-[#399B98]/40 hover:shadow-sm dark:border-[#1E2C42] dark:bg-[#111C2E]"
        >
          {/* Avatar */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#CDEAE6] bg-[#0D9488] text-lg font-semibold text-white dark:border-[#399B98]/30">
            {user.image ? (
              <Image
                src={user.image}
                alt={name}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            ) : (
              getInitials(name)
            )}
          </div>

          {/* Name and Role */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[17px] font-semibold text-[#17202D] dark:text-foreground">
              {name}
            </p>

            <p className="text-sm text-[#718096] dark:text-slate-300">{formattedRole}</p>
          </div>

          <ChevronDown
            size={22}
            className={`shrink-0 text-[#64748B] transition-transform duration-200 dark:text-slate-300 ${
              isProfileOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="absolute top-full right-0 z-60 mt-2 w-[320px] max-w-[calc(100vw-24px)] overflow-hidden rounded-[24px] border border-[#E0E7EF] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.12)] dark:border-[#1E2C42] dark:bg-[#111C2E]">
            {/* User Information */}
            <div className="px-6 pt-7 pb-4">
              <h3 className="truncate text-xl font-semibold text-[#17202D] dark:text-foreground">
                {name}
              </h3>

              <p className="mt-1 truncate text-base text-[#64748B] dark:text-slate-300">
                {user.email}
              </p>

              <span className="mt-3 inline-flex items-center rounded-full border border-[#BFE9E3] bg-[#EAF7F5] px-4 py-1.5 text-sm font-medium text-[#087F75] dark:border-[#399B98]/30 dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
                {formattedRole}
              </span>
            </div>

            <div className="border-t border-[#E5EAF0] dark:border-[#1E2C42]" />

            {/* Dashboard */}
            <div className="px-4 py-3">
              <Link
                href={dashboardPath}
                onClick={closeMenu}
                className="flex items-center gap-4 rounded-lg px-3 py-3 text-[17px] font-medium text-[#334155] transition hover:bg-[#EAF6F5] hover:text-[#399B98] dark:text-slate-200 dark:hover:bg-[#399B98]/15 dark:hover:text-[#5FD3C9]"
              >
                <LayoutDashboard size={25} className="text-[#0D9488] dark:text-[#5FD3C9]" />
                Dashboard
              </Link>

              {/* Update Profile */}
              <Link
                href="/profile"
                onClick={closeMenu}
                className="flex items-center gap-4 rounded-lg px-3 py-3 text-[17px] font-medium text-[#334155] transition hover:bg-[#EAF6F5] hover:text-[#399B98] dark:text-slate-200 dark:hover:bg-[#399B98]/15 dark:hover:text-[#5FD3C9]"
              >
                <UserRound size={25} className="text-[#64748B] dark:text-slate-300" />
                Update Profile
              </Link>
            </div>

            <div className="border-t border-[#E5EAF0] dark:border-[#1E2C42]" />

            {/* Sign Out */}
            <div className="px-4 py-3">
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex w-full items-center gap-4 rounded-lg px-3 py-3 text-[17px] font-medium text-rose-600 transition hover:bg-rose-50 disabled:opacity-60 dark:text-[#F0A3A3] dark:hover:bg-[#D45B5B]/15"
              >
                <LogOut size={25} />
                {isSigningOut ? "Signing Out..." : "Sign Out"}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white dark:border-[#1E2C42] dark:bg-[#111C2E]">
      <nav className="mx-auto flex h-17 max-w-360 items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Logo + Desktop Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#399B98] text-xl font-bold text-white shadow-sm">
              M
            </div>

            <span className="text-[19px] font-bold tracking-tight text-[#17202D] dark:text-foreground">
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
                  className={`group relative py-2 text-[13px] font-semibold transition-all duration-300 ease-in-out hover:-translate-y-0.5 ${
                    active
                      ? "text-[#399B98] dark:text-[#5FD3C9]"
                      : "text-slate-600 hover:text-[#399B98] dark:text-slate-300 dark:hover:text-[#5FD3C9]"
                  }`}
                >
                  {link.name}

                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 w-full origin-center rounded-full bg-[#399B98] transition-transform duration-300 ease-in-out ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-12 w-44 animate-pulse rounded-xl bg-gray-100 dark:bg-slate-800" />
          ) : user ? (
            renderProfileButton()
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-lg border border-[#CFE8E5] px-5 py-2.5 text-[13px] font-semibold text-[#399B98] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#399B98] hover:bg-[#EAF6F5] hover:shadow-md active:translate-y-0 active:scale-95 dark:border-[#399B98]/30 dark:text-[#5FD3C9] dark:hover:bg-[#399B98]/15"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-lg bg-[#399B98] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#287F7C] hover:shadow-[0_6px_18px_rgba(57,155,152,0.25)] active:translate-y-0 active:scale-95"
              >
                Sign Up
              </Link>
            </>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile Profile + Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {!isPending && user && (
            <div className="origin-right scale-[0.85]">
              {renderProfileButton()}
            </div>
          )}

          <ThemeToggle size="sm" />

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-[#17202D] transition-colors hover:bg-[#EAF6F5] dark:text-foreground dark:hover:bg-[#399B98]/15"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-5 pt-3 pb-5 shadow-lg md:hidden dark:border-[#1E2C42] dark:bg-[#111C2E]">
          {/* Mobile Profile */}
          {!isPending && user && (
            <Link
              href="/profile"
              onClick={closeMenu}
              className="mb-3 flex items-center gap-3 rounded-xl bg-[#EAF6F5] p-3 dark:bg-[#399B98]/15"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#399B98] text-sm font-semibold text-white">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(user.name || "User")
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#17202D] dark:text-foreground">
                  {user.name || "User"}
                </p>
                <p className="text-xs text-[#6B7C83] dark:text-slate-300">{formattedRole}</p>
              </div>
            </Link>
          )}

          {/* Mobile Navigation Links */}
          <div className="flex flex-col">
            {navLinks.map((link, index) => {
              const active = isActive(link.href)

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  style={{
                    transitionDelay: `${index * 40}ms`,
                  }}
                  className={`group flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 ease-in-out hover:translate-x-1 ${
                    active
                      ? "bg-[#EAF6F5] text-[#399B98] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]"
                      : "text-slate-600 hover:bg-gray-50 hover:text-[#399B98] dark:text-slate-300 dark:hover:bg-[#111C2E] dark:hover:text-[#5FD3C9]"
                  }`}
                >
                  {link.name}

                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-[#399B98] transition-all duration-300 ${
                      active
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              )
            })}
          </div>

          {/* Mobile Authentication */}
          <div className="mt-4 flex gap-3 border-t border-gray-100 pt-4 dark:border-[#1E2C42]">
            {isPending ? (
              <div className="h-10 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-slate-800" />
            ) : user ? (
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#CFE8E5] py-2.5 text-sm font-semibold text-[#399B98] hover:bg-[#EAF6F5] disabled:opacity-60 dark:border-[#399B98]/30 dark:text-[#5FD3C9] dark:hover:bg-[#399B98]/15"
              >
                <LogOut size={16} />
                {isSigningOut ? "Signing Out..." : "Sign Out"}
              </button>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={closeMenu}
                  className="flex-1 rounded-lg border border-[#CFE8E5] py-2.5 text-center text-sm font-semibold text-[#399B98] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EAF6F5] hover:shadow-md active:scale-95 dark:border-[#399B98]/30 dark:text-[#5FD3C9] dark:hover:bg-[#399B98]/15"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  onClick={closeMenu}
                  className="flex-1 rounded-lg bg-[#399B98] py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#287F7C] hover:shadow-[0_6px_18px_rgba(57,155,152,0.25)] active:scale-95"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
