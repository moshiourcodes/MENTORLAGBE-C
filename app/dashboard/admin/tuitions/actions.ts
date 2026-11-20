"use server"

import { revalidatePath } from "next/cache"
import { ObjectId } from "mongodb"

import { db } from "@/lib/auth"
import { getDashboardUser } from "@/lib/dashboard"

export async function updateTuitionStatus(formData: FormData) {
  const user = await getDashboardUser()

  if (!user || user.role !== "admin") {
    return
  }

  const id = String(formData.get("id") || "")
  const status = String(formData.get("status") || "")

  if (!id || (status !== "approved" && status !== "rejected")) {
    return
  }

  let objectId: ObjectId

  try {
    objectId = new ObjectId(id)
  } catch {
    return
  }

  const filter = { _id: objectId }

  try {
    await db.collection("tuitions").updateOne(filter, {
      $set: { approvalStatus: status, updatedAt: new Date() },
    })
  } catch {
    return
  }

  revalidatePath("/dashboard/admin")
  revalidatePath("/dashboard/admin/tuitions")
  revalidatePath("/dashboard/tutor")
  revalidatePath("/dashboard/tutor/my-tuitions")
}
