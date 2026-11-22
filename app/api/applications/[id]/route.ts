
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

import { auth, db } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Please sign in." },
        { status: 401 }
      );
    }

    const user = session.user as typeof session.user & {
      role?: string;
    };

    if (user.role !== "tutor") {
      return NextResponse.json(
        { success: false, message: "Only tutors can review applications." },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid application ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const status = body.status;

    if (status !== "accepted" && status !== "rejected") {
      return NextResponse.json(
        { success: false, message: "Invalid application status." },
        { status: 400 }
      );
    }

    const applications = db.collection("applications");

    const application = await applications.findOne({
      _id: new ObjectId(id),
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found." },
        { status: 404 }
      );
    }

    if (application.status !== "pending") {
      return NextResponse.json(
        {
          success: false,
          message: "This application has already been reviewed.",
        },
        { status: 409 }
      );
    }

    // Verify ownership against the actual tuition document.
    if (
      typeof application.tuitionId !== "string" ||
      !ObjectId.isValid(application.tuitionId)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid tuition reference." },
        { status: 400 }
      );
    }

    const tuition = await db.collection("tuitions").findOne({
      _id: new ObjectId(application.tuitionId),
    });

    if (!tuition || tuition.tutorEmail !== session.user.email) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to review this application.",
        },
        { status: 403 }
      );
    }

    const result = await applications.updateOne(
      {
        _id: new ObjectId(id),
        status: "pending",
      },
      {
        $set: {
          status,
          updatedAt: new Date(),
          reviewedAt: new Date(),
          reviewedBy: session.user.id,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "This application has already been updated.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        status === "accepted"
          ? "Student application approved successfully."
          : "Student application rejected.",
      status,
    });
  } catch (error) {
    console.error("Application review error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update this application." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Please sign in." },
        { status: 401 }
      );
    }

    const user = session.user as typeof session.user & {
      role?: string;
    };

    if (user.role !== "student") {
      return NextResponse.json(
        { success: false, message: "Only students can cancel applications." },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid application ID." },
        { status: 400 }
      );
    }

    const result = await db.collection("applications").updateOne(
      {
        _id: new ObjectId(id),
        studentId: session.user.id,
        status: "pending",
      },
      {
        $set: {
          status: "cancelled",
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found or it can no longer be cancelled.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application cancelled successfully.",
    });
  } catch (error) {
    console.error("Application cancellation error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to cancel this application." },
      { status: 500 }
    );
  }
}
