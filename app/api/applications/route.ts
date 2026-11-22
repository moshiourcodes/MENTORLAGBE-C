
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { auth, db } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Please sign in first." },
        { status: 401 }
      );
    }

    const user = session.user as typeof session.user & {
      role?: string;
    };

    if (user.role !== "student") {
      return NextResponse.json(
        {
          success: false,
          message: "Only students can apply for tuitions.",
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const tuitionId = body.tuitionId;

    if (
      typeof tuitionId !== "string" ||
      !ObjectId.isValid(tuitionId)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid tuition ID." },
        { status: 400 }
      );
    }

    const tuition = await db.collection("tuitions").findOne({
      _id: new ObjectId(tuitionId),
      approvalStatus: "approved",
      isActive: true,
    });

    if (!tuition) {
      return NextResponse.json(
        {
          success: false,
          message: "This tuition is not available.",
        },
        { status: 404 }
      );
    }

    const applications = db.collection("applications");

    const existing = await applications.findOne({
      tuitionId,
      studentId: session.user.id,
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already applied for this tuition.",
        },
        { status: 409 }
      );
    }

    const result = await applications.insertOne({
      tuitionId,
      studentId: session.user.id,
      studentName: session.user.name,
      studentEmail: session.user.email,
      tutorName: tuition.tutorName || "",
      tuitionTitle: tuition.title || "",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully.",
        applicationId: result.insertedId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application.",
      },
      { status: 500 }
    );
  }
}
