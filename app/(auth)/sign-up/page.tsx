"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"

import {
  GraduationCap,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"

type UserRole = "student" | "tutor"

const dashboardRoutes: Record<UserRole, string> = {
  student: "/dashboard/student",
  tutor: "/dashboard/tutor",
}

export default function SignUpPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)

      const name = String(formData.get("name") || "").trim()

      const email = String(formData.get("email") || "")
        .trim()
        .toLowerCase()

      const password = String(formData.get("password") || "")

      const role = String(formData.get("role") || "")

      if (!name || !email || !password || !role) {
        throw new Error("Please fill in all required fields.")
      }

      if (password.length < 8 || password.length > 128) {
        throw new Error("Password must contain between 8 and 128 characters.")
      }

      if (role !== "student" && role !== "tutor") {
        throw new Error("Please select a valid role.")
      }

      const selectedRole = role as UserRole

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        role: selectedRole,
        callbackURL: dashboardRoutes[selectedRole],
      })

      if (error) {
        throw new Error(error.message || "Unable to create your account.")
      }

      if (!data) {
        throw new Error("Account creation could not be confirmed.")
      }

      toast.success("Account created successfully!", {
        description: `Welcome to MentorLagbe as a ${selectedRole}!`,
        duration: 3000,
      })

      router.replace(dashboardRoutes[selectedRole])
      router.refresh()
    } catch (error) {
      console.error("Sign Up Error:", error)

      toast.error("Sign up failed!", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        duration: 4000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#F7FAFA] px-4 py-12 dark:bg-[#0B1220]">
      <div className="w-full max-w-115 rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_10px_40px_rgba(0,0,0,0.05)] sm:p-9 dark:border-[#1E2C42] dark:bg-[#111C2E]">
        {/* Logo */}
        <Link href="/" className="mb-7 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#399B98]">
            <GraduationCap size={23} className="text-white" />
          </div>

          <span className="text-xl font-bold text-[#17202D] dark:text-foreground">
            Mentor<span className="text-[#399B98] dark:text-[#5FD3C9]">Lagbe</span>
          </span>
        </Link>

        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-[#17202D] dark:text-foreground">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm text-[#6B7280] dark:text-slate-300">
            Join MentorLagbe and start your learning journey.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[#374151] dark:text-slate-200"
            >
              Full Name
            </label>

            <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10 dark:border-[#1E2C42] dark:bg-[#111C2E]">
              <UserRound size={18} className="shrink-0 text-[#9CA3AF] dark:text-slate-400" />

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                autoComplete="name"
                className="h-full w-full bg-transparent px-3 text-sm font-medium text-[#17202D] outline-none placeholder:font-normal placeholder:text-[#9CA3AF] dark:text-foreground dark:placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#374151] dark:text-slate-200"
            >
              Email Address
            </label>

            <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10 dark:border-[#1E2C42] dark:bg-[#111C2E]">
              <Mail size={18} className="shrink-0 text-[#9CA3AF] dark:text-slate-400" />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                required
                autoComplete="email"
                className="h-full w-full bg-transparent px-3 text-sm font-medium text-[#17202D] outline-none placeholder:font-normal placeholder:text-[#9CA3AF] dark:text-foreground dark:placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#374151] dark:text-slate-200"
            >
              Password
            </label>

            <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10 dark:border-[#1E2C42] dark:bg-[#111C2E]">
              <LockKeyhole size={18} className="shrink-0 text-[#9CA3AF] dark:text-slate-400" />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                required
                minLength={8}
                maxLength={128}
                autoComplete="new-password"
                className="h-full w-full bg-transparent px-3 text-sm font-medium text-[#17202D] outline-none placeholder:font-normal placeholder:text-[#9CA3AF] dark:text-foreground dark:placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0 text-[#9CA3AF] transition hover:text-[#399B98] dark:text-slate-400 dark:hover:text-[#5FD3C9]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="mt-1.5 text-xs text-[#6B7280] dark:text-slate-300">
              Password must contain at least 8 characters.
            </p>
          </div>

          {/* Role Selection */}
          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-semibold text-[#374151] dark:text-slate-200"
            >
              Select Your Role
            </label>

            <div className="relative">
              <ShieldCheck
                size={18}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#9CA3AF] dark:text-slate-400"
              />

              <select
                id="role"
                name="role"
                required
                defaultValue=""
                className="h-12 w-full rounded-lg border border-gray-200 bg-white pr-3 pl-10 text-sm font-medium text-[#17202D] transition outline-none focus:border-[#399B98] focus:ring-2 focus:ring-[#399B98]/10 dark:border-[#1E2C42] dark:bg-[#111C2E] dark:text-foreground"
              >
                <option value="" disabled>
                  Choose your role
                </option>

                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
            </div>

            <p className="mt-1.5 text-xs text-[#6B7280] dark:text-slate-300">
              You can add another role later using the same account.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#399B98] text-sm font-semibold text-white transition hover:bg-[#287F7C] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              "Creating Account..."
            ) : (
              <>
                Create Account
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Sign In */}
        <p className="mt-7 text-center text-sm text-[#6B7280] dark:text-slate-300">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-[#399B98] hover:underline dark:text-[#5FD3C9]"
          >
            Sign In
          </Link>
        </p>

        {/* Back to Home */}
        <div className="mt-6 border-t border-gray-100 pt-5 text-center dark:border-[#1E2C42]">
          <Link
            href="/"
            className="text-xs text-[#6B7280] hover:text-[#399B98] dark:text-slate-300 dark:hover:text-[#5FD3C9]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
