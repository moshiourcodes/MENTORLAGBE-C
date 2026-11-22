// import { NextResponse } from "next/server"
// import { headers } from "next/headers"
// import { ObjectId } from "mongodb"

// import { auth, db } from "@/lib/auth"

// export async function POST(request: Request) {
//   try {
//     // 1. Verify the logged-in user
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     })

//     if (!session?.user) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please sign in before applying.",
//         },
//         { status: 401 }
//       )
//     }

//     // 2. Read the role from the authenticated session
//     const user = session.user as typeof session.user & {
//       role?: string
//     }

//     if (user.role !== "student") {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Only students can apply for tuitions.",
//         },
//         { status: 403 }
//       )
//     }

//     // 3. Get the tuition ID from the request
//     const body = await request.json()
//     const tuitionId = body.tuitionId

//     if (typeof tuitionId !== "string" || !ObjectId.isValid(tuitionId)) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invalid tuition ID.",
//         },
//         { status: 400 }
//       )
//     }

//     // 4. Check whether the tuition exists and is approved
//     const tuition = await db.collection("tuitions").findOne({
//       _id: new ObjectId(tuitionId),
//       approvalStatus: "approved",
//       isActive: true,
//     })

//     if (!tuition) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "This tuition is not available.",
//         },
//         { status: 404 }
//       )
//     }

//     // 5. Get the authenticated user ID
//     const userId = session.user.id

//     // In the current database structure, studentId and userId
//     // refer to the same authenticated user.
//     const studentId = userId

//     // 6. Check for an existing application
//     const applications = db.collection("applications")

//     const existingApplication = await applications.findOne({
//       tuitionId,
//       studentId,
//     })

//     if (existingApplication) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "You have already applied for this tuition.",
//         },
//         { status: 409 }
//       )
//     }

//     // 7. Create the application document
//     const application = {
//       tuitionId,
//       userId,
//       studentId,

//       studentName: session.user.name,
//       studentEmail: session.user.email,

//       tuitionTitle: tuition.title,
//       tutorName: tuition.tutorName || "",

//       status: "pending",

//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }

//     // 8. Save application in MongoDB
//     const result = await applications.insertOne(application)

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Your application has been submitted successfully.",
//         application: {
//           _id: result.insertedId.toString(),
//           tuitionId,
//           userId,
//           studentId,
//           status: "pending",
//         },
//       },
//       { status: 201 }
//     )
//   } catch (error) {
//     console.error("Application submission error:", error)

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Something went wrong while submitting your application.",
//       },
//       { status: 500 }
//     )
//   }
// }
















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
        { success: false, message: "Please sign in before applying." },
        { status: 401 }
      );
    }

    const user = session.user as typeof session.user & {
      role?: string;
      phone?: string;
    };

    if (user.role !== "student") {
      return NextResponse.json(
        { success: false, message: "Only students can apply for tuitions." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const tuitionId = body.tuitionId;

    if (typeof tuitionId !== "string" || !ObjectId.isValid(tuitionId)) {
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

    // The tuition document must contain the tutor's authenticated email.
    const tutorEmail =
      typeof tuition.tutorEmail === "string" ? tuition.tutorEmail : "";

    if (!tutorEmail) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The tutor information for this tuition is incomplete. Please contact support.",
        },
        { status: 400 }
      );
    }

    const applications = db.collection("applications");
    const studentId = session.user.id;

    const application = {
      tuitionId,
      userId: studentId,
      studentId,
      studentName: session.user.name,
      studentEmail: session.user.email,
      studentPhone: user.phone || "",
      tutorId:
        typeof tuition.tutorId === "string" ? tuition.tutorId : "",
      tutorEmail,
      tutorName: tuition.tutorName || "",
      tuitionTitle: tuition.title || "",
      subject: tuition.subject || "",
      monthlyFee: Number(tuition.monthlyFee || 0),
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const result = await applications.insertOne(application);

      return NextResponse.json(
        {
          success: true,
          message: "Your application has been submitted successfully.",
          application: {
            _id: result.insertedId.toString(),
            tuitionId,
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

      throw error;
    }
  } catch (error) {
    console.error("Application submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while submitting your application.",
      },
      { status: 500 }
    );
  }
}
