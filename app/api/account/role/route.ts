import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"

import { auth, db } from "@/lib/auth"

const selectableRoles = ["student", "tutor"] as const

/**
 * One-time role setup for new OAuth users. Admin is deliberately excluded:
 * it can never be chosen by a user through a public request.
 */
export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    return NextResponse.json(
      { success: false, message: "Please sign in first." },
      { status: 401 }
    )
  }

  const body = (await request.json().catch(() => ({}))) as {
    role?: unknown
  }
  const role = body.role

  if (
    typeof role !== "string" ||
    !selectableRoles.includes(role as (typeof selectableRoles)[number])
  ) {
    return NextResponse.json(
      { success: false, message: "Please choose Student or Tutor." },
      { status: 400 }
    )
  }

  let userId: ObjectId

  try {
    userId = new ObjectId(session.user.id)
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid account identifier." },
      { status: 400 }
    )
  }

  const existing = await db.collection("user").findOne({ _id: userId })

  if (!existing) {
    return NextResponse.json(
      { success: false, message: "Account not found." },
      { status: 404 }
    )
  }

  // Existing users keep their role. Only flagged OAuth users can set it once.
  if (existing.roleSelected !== false) {
    return NextResponse.json(
      { success: false, message: "Your role is already configured." },
      { status: 403 }
    )
  }

  await db.collection("user").updateOne(
    { _id: userId, roleSelected: false },
    {
      $set: {
        role,
        roles: role,
        roleSelected: true,
        updatedAt: new Date(),
      },
    }
  )

  revalidatePath("/dashboard")

  return NextResponse.json({ success: true, role })
}
