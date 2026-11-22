"use client"

import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  LoaderCircle,
} from "lucide-react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"

type SelectableRole = "student" | "tutor"

export default function SelectRolePage() {
  const router = useRouter()
  const { data: session, isPending, refetch } = authClient.useSession()

  const [role, setRole] = useState<SelectableRole>("student")
  const [isSaving, setIsSaving] = useState(false)

  const user = session?.user as
    | (NonNullable<typeof session>["user"] & {
        role?: string
        roleSelected?: boolean
      })
    | undefined

  useEffect(() => {
    if (isPending) return

    if (!user) {
      router.replace("/sign-in")
      return
    }

    if (user.roleSelected !== false) {
      router.replace(`/dashboard/${user.role || "student"}`)
    }
  }, [isPending, user, router])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSaving) return
    setIsSaving(true)

    try {
      const response = await fetch("/api/account/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      })

      const data = (await response.json()) as {
        success?: boolean
        message?: string
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to save your role.")
      }

      await refetch()
      toast.success(`You're all set as a ${role}.`)
      router.replace(`/dashboard/${role}`)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to save your role."
      )
      setIsSaving(false)
    }
  }

  if (isPending || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFA] px-4 dark:bg-[#0B1220]">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <LoaderCircle
            size={18}
            className="animate-spin text-[#399B98] dark:text-[#5FD3C9]"
          />
          Loading your account...
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFA] px-4 py-10 dark:bg-[#0B1220]">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-9">
        <Link
          href="/"
          className="mb-7 flex items-center justify-center gap-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#399B98] text-white">
            <GraduationCap size={23} />
          </span>
          <span className="text-xl font-bold text-[#17202D] dark:text-foreground">
            Mentor<span className="text-[#399B98] dark:text-[#5FD3C9]">Lagbe</span>
          </span>
        </Link>

        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-[#17202D] dark:text-foreground">
            Choose how you&apos;ll use MentorLagbe
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#6B7280] dark:text-slate-300">
            This is a one-time choice for your new Google account. It cannot be
            changed later from here.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
              role === "student"
                ? "border-[#399B98] bg-[#EAF6F5] dark:bg-[#399B98]/15"
                : "border-border bg-background hover:border-[#399B98]/40"
            }`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#3B82C4] dark:bg-[#3B82C4]/15 dark:text-[#8EC3EE]">
              <GraduationCap size={20} />
            </span>
            <span>
              <span className="block text-sm font-bold text-foreground">
                I&apos;m a Student
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                Find tutors, apply, and save listings.
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setRole("tutor")}
            className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
              role === "tutor"
                ? "border-[#399B98] bg-[#EAF6F5] dark:bg-[#399B98]/15"
                : "border-border bg-background hover:border-[#399B98]/40"
            }`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#CDEAE2] text-[#2F8481] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
              <BookOpen size={20} />
            </span>
            <span>
              <span className="block text-sm font-bold text-foreground">
                I&apos;m a Tutor
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                Post tuitions and manage applicants.
              </span>
            </span>
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#399B98] text-sm font-semibold text-white transition hover:bg-[#2F8481] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <ArrowRight size={17} />
            )}
            {isSaving ? "Saving..." : "Continue to Dashboard"}
          </button>
        </form>
      </div>
    </main>
  )
}
