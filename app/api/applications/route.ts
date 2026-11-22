





// import { NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { ObjectId } from "mongodb";

// import { auth, db } from "@/lib/auth";

// export async function POST(request: Request) {
//   try {
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     });

//     if (!session?.user) {
//       return NextResponse.json(
//         { success: false, message: "Please sign in before applying." },
//         { status: 401 }
//       );
//     }

//     const user = session.user as typeof session.user & {
//       role?: string;
//       phone?: string;
//     };

//     if (user.role !== "student") {
//       return NextResponse.json(
//         { success: false, message: "Only students can apply for tuitions." },
//         { status: 403 }
//       );
//     }

//     const body = await request.json();
//     const tuitionId = body.tuitionId;

//     if (typeof tuitionId !== "string" || !ObjectId.isValid(tuitionId)) {
//       return NextResponse.json(
//         { success: false, message: "Invalid tuition ID." },
//         { status: 400 }
//       );
//     }

//     const tuition = await db.collection("tuitions").findOne({
//       _id: new ObjectId(tuitionId),
//       approvalStatus: "approved",
//       isActive: true,
//     });

//     if (!tuition) {
//       return NextResponse.json(
//         { success: false, message: "This tuition is not available." },
//         { status: 404 }
//       );
//     }

//     // The tuition document must contain the tutor's authenticated email.
//     const tutorEmail =
//       typeof tuition.tutorEmail === "string" ? tuition.tutorEmail : "";

//     if (!tutorEmail) {
//       return NextResponse.json(
//         {
//           success: false,
//           message:
//             "The tutor information for this tuition is incomplete. Please contact support.",
//         },
//         { status: 400 }
//       );
//     }

//     const applications = db.collection("applications");
//     const studentId = session.user.id;

//     const application = {
//       tuitionId,
//       userId: studentId,
//       studentId,
//       studentName: session.user.name,
//       studentEmail: session.user.email,
//       studentPhone: user.phone || "",
//       tutorId:
//         typeof tuition.tutorId === "string" ? tuition.tutorId : "",
//       tutorEmail,
//       tutorName: tuition.tutorName || "",
//       tuitionTitle: tuition.title || "",
//       subject: tuition.subject || "",
//       monthlyFee: Number(tuition.monthlyFee || 0),
//       status: "pending",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };

//     try {
//       const result = await applications.insertOne(application);

//       return NextResponse.json(
//         {
//           success: true,
//           message: "Your application has been submitted successfully.",
//           application: {
//             _id: result.insertedId.toString(),
//             tuitionId,
//             status: "pending",
//           },
//         },
//         { status: 201 }
//       );
//     } catch (error: unknown) {
//       if (
//         typeof error === "object" &&
//         error !== null &&
//         "code" in error &&
//         error.code === 11000
//       ) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "You have already applied for this tuition.",
//           },
//           { status: 409 }
//         );
//       }

//       throw error;
//     }
//   } catch (error) {
//     console.error("Application submission error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Something went wrong while submitting your application.",
//       },
//       { status: 500 }
//     );
//   }
// }














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
        { success: false, message: "Please sign in before applying." },
        { status: 401 }
      );
    }

    const user = session.user as typeof session.user & {
      role?: string;
      plan?: string;
      phone?: string;
    };

    if (user.role !== "student") {
      return NextResponse.json(
        { success: false, message: "Only students can apply." },
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
        { success: false, message: "This tuition is not available." },
        { status: 404 }
      );
    }

    const applications = db.collection("applications");
    const studentId = session.user.id;

    await ensureDomainIndexes();

    const existing = await applications.findOne({
      tuitionId,
      studentId,
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

    // Free plan: maximum 2 applications. Enforced here, not only in the UI.
    if (user.plan !== "pro") {
      const totalApplications = await applications.countDocuments({
        studentId,
        status: { $ne: "cancelled" },
      });

      if (totalApplications >= FREE_LIMITS.applications) {
        return NextResponse.json(
          {
            success: false,
            upgradeRequired: true,
            limit: "applications",
            currentPlan: "free",
            message: `You have reached your free limit of ${FREE_LIMITS.applications} tuition applications. Upgrade to Student Pro for unlimited applications.`,
          },
          { status: 403 }
        );
      }
    }

    const tutorEmail =
      typeof tuition.tutorEmail === "string"
        ? tuition.tutorEmail
        : "";

    if (!tutorEmail) {
      return NextResponse.json(
        { success: false, message: "Tutor email is missing." },
        { status: 400 }
      );
    }

    const application = {
      tuitionId,
      userId: studentId,
      studentId,
      studentName: session.user.name,
      studentEmail: session.user.email,
      studentPhone: user.phone || "",
      tutorEmail,
      tutorId: tuition.tutorId || "",
      tutorName: tuition.tutorName || "",
      tuitionTitle: tuition.title || "",
      subject: tuition.subject || "",
      monthlyFee: Number(tuition.monthlyFee || 0),
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await applications.insertOne(application);

    return NextResponse.json(
      {
        success: true,
        message: "Your application has been submitted successfully.",
        application: {
          _id: result.insertedId.toString(),
          status: "pending",
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already applied for this tuition.",
        },
        { status: 409 }
      );
    }

    console.error("Application error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while submitting your application.",
      },
      { status: 500 }
    );
  }
}

