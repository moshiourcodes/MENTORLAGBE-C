"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { db } from "@/lib/auth"
import { getDashboardUser } from "@/lib/dashboard"
import { FREE_LIMITS } from "@/lib/payments"

export type PostTuitionState = {
  error?: string
  upgradeRequired?: boolean
  limit?: "tuitions"
  currentPlan?: "free" | "pro"
}

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Programming",
  "IELTS",
  "Other",
]

const CLASS_LEVELS = [
  "Class 1-5",
  "Class 6-8",
  "Class 9-10",
  "HSC",
  "Admission",
  "University",
  "Other",
]

export async function createTuition(
  _previousState: PostTuitionState,
  formData: FormData
): Promise<PostTuitionState> {
  const user = await getDashboardUser()

  if (!user) {
    return { error: "Your session has expired. Please sign in again." }
  }

  if (user.role !== "tutor") {
    return { error: "Only tutors can post tuitions." }
  }

  const title = String(formData.get("title") || "").trim()
  const subject = String(formData.get("subject") || "").trim()
  const classLevel = String(formData.get("classLevel") || "").trim()
  const mode = String(formData.get("mode") || "").trim()
  const location = String(formData.get("location") || "").trim()
  const monthlyFee = Number(formData.get("monthlyFee"))
  const daysPerWeek = Number(formData.get("daysPerWeek"))
  const description = String(formData.get("description") || "").trim()
  const bannerImage = String(formData.get("bannerImage") || "").trim()

  if (title.length < 3 || title.length > 120) {
    return { error: "Title must be between 3 and 120 characters." }
  }

  if (!SUBJECTS.includes(subject)) {
    return { error: "Please select a valid subject." }
  }

  if (!CLASS_LEVELS.includes(classLevel)) {
    return { error: "Please select a valid class level." }
  }

  if (mode !== "Online" && mode !== "Offline") {
    return { error: "Please select a valid mode." }
  }

  if (mode === "Offline" && location.length < 3) {
    return { error: "Location is required for offline tuitions." }
  }

  if (!Number.isFinite(monthlyFee) || monthlyFee <= 0) {
    return { error: "Monthly fee must be a positive number." }
  }

  if (!Number.isInteger(daysPerWeek) || daysPerWeek < 1 || daysPerWeek > 7) {
    return { error: "Days per week must be between 1 and 7." }
  }

  if (description.length < 10 || description.length > 2000) {
    return { error: "Description must be between 10 and 2000 characters." }
  }

  if (bannerImage && !/^https?:\/\//i.test(bannerImage)) {
    return { error: "Banner image must be a valid http(s) URL." }
  }

  try {
    const existingCount = await db
      .collection("tuitions")
      .countDocuments({ tutorEmail: user.email })

    const limit = user.plan === "pro" ? Number.POSITIVE_INFINITY : FREE_LIMITS.tuitions

    if (existingCount >= limit) {
      return {
        error: `Your free plan allows up to ${FREE_LIMITS.tuitions} tuition posts. Upgrade to Tutor Pro for unlimited posts.`,
        upgradeRequired: true,
        limit: "tuitions",
        currentPlan: "free",
      }
    }

    await db.collection("tuitions").insertOne({
      title,
      subject,
      classLevel,
      mode,
      location: mode === "Online" ? "Online" : location,
      monthlyFee,
      daysPerWeek,
      bannerImage,
      description,
      tutorName: user.name,
      tutorEmail: user.email,
      tutorId: user.id,
      approvalStatus: "pending",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  } catch {
    return {
      error: "Could not save your tuition right now. Please try again.",
    }
  }

  revalidatePath("/dashboard/tutor")
  revalidatePath("/dashboard/tutor/my-tuitions")
  revalidatePath("/dashboard/admin")
  revalidatePath("/dashboard/admin/tuitions")

  redirect("/dashboard/tutor/my-tuitions")
}
