"use client"

import { useState } from "react"
import type { FormEvent } from "react"
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

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)

    const form = event.currentTarget

    try {
      const formData = new FormData(form)

      const name = String(formData.get("name") || "").trim()
      const email = String(formData.get("email") || "").trim()
      const password = String(formData.get("password") || "")
      const role = String(formData.get("role") || "")

      if (!name || !email || !password || !role) {
        throw new Error("Please fill in all required fields.")
      }

      if (password.length < 8 || password.length > 128) {
        throw new Error("Password must contain between 8 and 128 characters.")
      }

      if (!["student", "tutor"].includes(role)) {
        throw new Error("Invalid role selected.")
      }

      // Better Auth Signup
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
        role,
      })

      if (error) {
        throw new Error(error.message || "Unable to create your account.")
      }

      if (!data) {
        throw new Error("Account creation could not be confirmed.")
      }

      console.log("Signup successful:", {
        name,
        email,
        role,
      })

      form.reset()
      setShowPassword(false)

      toast.success("Account created successfully!", {
        description: `Your ${role} account has been created.`,
        duration: 3000,
      })
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
    <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#F7FAFA] px-4 py-12">
      <div className="w-full max-w-115 rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_10px_40px_rgba(0,0,0,0.05)] sm:p-9">
        {/* Logo */}
        <Link href="/" className="mb-7 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#399B98]">
            <GraduationCap size={23} className="text-white" />
          </div>

          <span className="text-xl font-bold text-[#17202D]">
            Mentor<span className="text-[#399B98]">Lagbe</span>
          </span>
        </Link>

        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-[#17202D]">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm text-[#6B7280]">
            Join MentorLagbe and start your learning journey.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[#374151]"
            >
              Full Name
            </label>

            <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10">
              <UserRound size={18} className="shrink-0 text-[#9CA3AF]" />

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                autoComplete="name"
                className="h-full w-full bg-transparent px-3 text-sm font-medium text-[#17202D] outline-none placeholder:font-normal placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#374151]"
            >
              Email Address
            </label>

            <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10">
              <Mail size={18} className="shrink-0 text-[#9CA3AF]" />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                required
                autoComplete="email"
                className="h-full w-full bg-transparent px-3 text-sm font-medium text-[#17202D] outline-none placeholder:font-normal placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#374151]"
            >
              Password
            </label>

            <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10">
              <LockKeyhole size={18} className="shrink-0 text-[#9CA3AF]" />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                required
                minLength={8}
                maxLength={128}
                autoComplete="new-password"
                className="h-full w-full bg-transparent px-3 text-sm font-medium text-[#17202D] outline-none placeholder:font-normal placeholder:text-[#9CA3AF]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0 text-[#9CA3AF] transition hover:text-[#399B98]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="mt-1.5 text-xs text-[#6B7280]">
              Password must contain at least 8 characters.
            </p>
          </div>

          {/* Role Selection */}
          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-semibold text-[#374151]"
            >
              Select Your Role
            </label>

            <div className="relative">
              <ShieldCheck
                size={18}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#9CA3AF]"
              />

              <select
                id="role"
                name="role"
                required
                defaultValue=""
                className="h-12 w-full rounded-lg border border-gray-200 bg-white pr-3 pl-10 text-sm font-medium text-[#17202D] transition outline-none focus:border-[#399B98] focus:ring-2 focus:ring-[#399B98]/10"
              >
                <option value="" disabled>
                  Choose your role
                </option>

                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
            </div>
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
        <p className="mt-7 text-center text-sm text-[#6B7280]">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-[#399B98] hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Back to Home */}
        <div className="mt-6 border-t border-gray-100 pt-5 text-center">
          <Link
            href="/"
            className="text-xs text-[#6B7280] hover:text-[#399B98]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
