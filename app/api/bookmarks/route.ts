
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { auth, db } from "@/lib/auth";
import { ensureDomainIndexes } from "@/lib/ensure-indexes";
import { FREE_LIMITS } from "@/lib/payments";

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
      plan?: string;
    };

    if (user.role !== "student") {
      return NextResponse.json(
        { success: false, message: "Only students can bookmark tuitions." },
        { status: 403 }
      );
    }

    const { tuitionId } = await request.json();

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
        { success: false, message: "Tuition not found." },
        { status: 404 }
      );
    }

    const bookmarks = db.collection("bookmarks");
    const studentId = session.user.id;

    await ensureDomainIndexes();

    const existing = await bookmarks.findOne({
      studentId,
      tuitionId,
    });

    if (existing) {
      return NextResponse.json(
        { success: true, message: "Already bookmarked." }
      );
    }

    if (user.plan !== "pro") {
      const count = await bookmarks.countDocuments({ studentId });

      if (count >= FREE_LIMITS.bookmarks) {
        return NextResponse.json(
          {
            success: false,
            upgradeRequired: true,
            limit: "bookmarks",
            currentPlan: "free",
            message: `You have reached your free limit of ${FREE_LIMITS.bookmarks} bookmarks. Upgrade to Student Pro for unlimited bookmarks.`,
          },
          { status: 403 }
        );
      }
    }

    await bookmarks.insertOne({
      studentId,
      tuitionId,
      tuitionTitle: tuition.title || "",
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Tuition bookmarked successfully.",
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json({
        success: true,
        message: "Already bookmarked.",
      });
    }

    console.error(
      "Bookmark error:",
      error instanceof Error ? error.message : "unknown error"
    );

    return NextResponse.json(
      { success: false, message: "Unable to bookmark tuition." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
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

    const deletingUser = session.user as typeof session.user & {
      role?: string;
    };

    if (deletingUser.role !== "student") {
      return NextResponse.json(
        { success: false, message: "Only students can manage bookmarks." },
        { status: 403 }
      );
    }

    const { tuitionId } = await request.json();

    if (
      typeof tuitionId !== "string" ||
      !ObjectId.isValid(tuitionId)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid tuition ID." },
        { status: 400 }
      );
    }

    await db.collection("bookmarks").deleteOne({
      studentId: session.user.id,
      tuitionId,
    });

    return NextResponse.json({
      success: true,
      message: "Bookmark removed successfully.",
    });
  } catch (error) {
    console.error("Remove bookmark error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to remove bookmark." },
      { status: 500 }
    );
  }
}
