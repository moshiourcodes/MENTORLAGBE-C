"use server"

import { revalidatePath } from "next/cache"
import { ObjectId } from "mongodb"

import { db } from "@/lib/auth"
import { getDashboardUser } from "@/lib/dashboard"

export async function cancelApplication(formData: FormData) {
  const user = await getDashboardUser()

  if (!user || user.role !== "student") {
    return
  }

  const id = String(formData.get("id") || "")

  if (!id) {
    return
  }

  let objectId: ObjectId

  try {
    objectId = new ObjectId(id)
  } catch {
    return
  }

  const ownershipFilter = {
    _id: objectId,
    studentEmail: user.email,
    status: "pending",
  }

  try {
    await db.collection("applications").deleteOne(ownershipFilter)
  } catch {
    return
  }

  revalidatePath("/dashboard/student")
  revalidatePath("/dashboard/student/my-applications")
}
