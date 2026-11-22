// import { cache } from "react"
// import { headers } from "next/headers"
// import { redirect } from "next/navigation"

// import { auth, db } from "@/lib/auth"

// export type DashboardRole = "student" | "tutor" | "admin"

// export type DashboardUser = {
//   id: string
//   name: string
//   email: string
//   image: string | null
//   role: DashboardRole
//   plan: "free" | "pro"
// }

// export type StudentStats = {
//   totalApplied: number
//   accepted: number
//   pending: number
// }

// export type TutorStats = {
//   totalTuitions: number
//   activeApproved: number
//   totalApplicants: number
// }

// export type AdminStats = {
//   totalUsers: number
//   totalStudents: number
//   totalTutors: number
//   totalTuitions: number
//   pendingApprovals: number
//   totalApplications: number
//   revenue: number
// }

// export type RecentUser = {
//   id: string
//   name: string
//   email: string
//   role: DashboardRole
//   plan: "free" | "pro"
//   createdAt: unknown
// }

// export type TuitionRecord = {
//   id: string
//   title: string
//   subject: string
//   classLevel: string
//   mode: string
//   location: string
//   monthlyFee: number
//   daysPerWeek: number
//   approvalStatus: "pending" | "approved" | "rejected"
//   isActive: boolean
//   tutorName: string
//   tutorEmail: string
//   createdAt: unknown
// }

// export type ApplicationRecord = {
//   id: string
//   tuitionId: string
//   tuitionTitle: string
//   subject: string
//   monthlyFee: number
//   tutorEmail: string
//   studentName: string
//   studentEmail: string
//   studentPhone: string
//   preferredSchedule: string
//   studentNote: string
//   status: "pending" | "accepted" | "rejected"
//   appliedAt: unknown
// }

// export function normalizeDashboardRole(value: unknown): DashboardRole {
//   if (value === "admin") return "admin"
//   if (value === "tutor") return "tutor"
//   return "student"
// }

// export function dashboardPathForRole(role: DashboardRole): string {
//   return `/dashboard/${role}`
// }

// /**
//  * Reads the authenticated user from the Better Auth session on the server.
//  * Cached per request so the layout and page do not duplicate the lookup.
//  */
// export const getDashboardUser = cache(
//   async (): Promise<DashboardUser | null> => {
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     })

//     if (!session?.user) {
//       return null
//     }

//     const user = session.user as typeof session.user & {
//       role?: unknown
//       plan?: unknown
//     }

//     return {
//       id: session.user.id,
//       name: session.user.name || "MentorLagbe User",
//       email: session.user.email,
//       image: session.user.image ?? null,
//       role: normalizeDashboardRole(user.role),
//       plan: user.plan === "pro" ? "pro" : "free",
//     }
//   }
// )

// /**
//  * Server-side role guard. Redirects unauthenticated users to sign-in and
//  * users with a different role to their own dashboard.
//  */
// export async function requireDashboardRole(
//   role: DashboardRole
// ): Promise<DashboardUser> {
//   const user = await getDashboardUser()

//   if (!user) {
//     redirect("/sign-in")
//   }

//   if (user.role !== role) {
//     redirect(dashboardPathForRole(user.role))
//   }

//   return user
// }

// async function safeCount(
//   collection: string,
//   filter: Record<string, unknown> = {}
// ): Promise<number> {
//   try {
//     return await db.collection(collection).countDocuments(filter)
//   } catch {
//     return 0
//   }
// }

// async function safeRevenue(): Promise<number> {
//   try {
//     const rows = await db
//       .collection("payments")
//       .aggregate([
//         { $match: { paymentStatus: "paid" } },
//         { $group: { _id: null, total: { $sum: "$amount" } } },
//       ])
//       .toArray()

//     const total = rows[0]?.total
//     return typeof total === "number" ? total : 0
//   } catch {
//     return 0
//   }
// }

// export async function getStudentStats(email: string): Promise<StudentStats> {
//   const [totalApplied, accepted, pending] = await Promise.all([
//     safeCount("applications", { studentEmail: email }),
//     safeCount("applications", { studentEmail: email, status: "accepted" }),
//     safeCount("applications", { studentEmail: email, status: "pending" }),
//   ])

//   return { totalApplied, accepted, pending }
// }

// export async function getTutorStats(email: string): Promise<TutorStats> {
//   const [totalTuitions, activeApproved, totalApplicants] = await Promise.all([
//     safeCount("tuitions", { tutorEmail: email }),
//     safeCount("tuitions", {
//       tutorEmail: email,
//       approvalStatus: "approved",
//       isActive: true,
//     }),
//     safeCount("applications", { tutorEmail: email }),
//   ])

//   return { totalTuitions, activeApproved, totalApplicants }
// }

// export async function getAdminStats(): Promise<AdminStats> {
//   const [
//     totalUsers,
//     totalStudents,
//     totalTutors,
//     totalTuitions,
//     pendingApprovals,
//     totalApplications,
//     revenue,
//   ] = await Promise.all([
//     safeCount("user"),
//     safeCount("user", { role: "student" }),
//     safeCount("user", { role: "tutor" }),
//     safeCount("tuitions"),
//     safeCount("tuitions", { approvalStatus: "pending" }),
//     safeCount("applications"),
//     safeRevenue(),
//   ])

//   return {
//     totalUsers,
//     totalStudents,
//     totalTutors,
//     totalTuitions,
//     pendingApprovals,
//     totalApplications,
//     revenue,
//   }
// }

// function asString(value: unknown, fallback = ""): string {
//   return typeof value === "string" ? value : fallback
// }

// function asNumber(value: unknown): number {
//   return typeof value === "number" ? value : 0
// }

// function mapTuition(doc: Record<string, unknown>): TuitionRecord {
//   const status =
//     doc.approvalStatus === "approved" || doc.approvalStatus === "rejected"
//       ? doc.approvalStatus
//       : "pending"

//   return {
//     id: String(doc._id),
//     title: asString(doc.title, "Untitled tuition"),
//     subject: asString(doc.subject),
//     classLevel: asString(doc.classLevel),
//     mode: asString(doc.mode),
//     location: asString(doc.location),
//     monthlyFee: asNumber(doc.monthlyFee),
//     daysPerWeek: asNumber(doc.daysPerWeek),
//     approvalStatus: status,
//     isActive: doc.isActive !== false,
//     tutorName: asString(doc.tutorName),
//     tutorEmail: asString(doc.tutorEmail),
//     createdAt: doc.createdAt,
//   }
// }

// function mapApplication(doc: Record<string, unknown>): ApplicationRecord {
//   const status =
//     doc.status === "accepted" || doc.status === "rejected"
//       ? doc.status
//       : "pending"

//   return {
//     id: String(doc._id),
//     tuitionId: asString(doc.tuitionId),
//     tuitionTitle: asString(doc.tuitionTitle, "Untitled tuition"),
//     subject: asString(doc.subject),
//     monthlyFee: asNumber(doc.monthlyFee),
//     tutorEmail: asString(doc.tutorEmail),
//     studentName: asString(doc.studentName),
//     studentEmail: asString(doc.studentEmail),
//     studentPhone: asString(doc.studentPhone),
//     preferredSchedule: asString(doc.preferredSchedule),
//     studentNote: asString(doc.studentNote),
//     status,
//     appliedAt: doc.appliedAt,
//   }
// }

// async function fetchTuitions(
//   filter: Record<string, unknown>,
//   limit?: number
// ): Promise<TuitionRecord[]> {
//   try {
//     let cursor = db
//       .collection("tuitions")
//       .find(filter)
//       .sort({ createdAt: -1 })

//     if (limit) {
//       cursor = cursor.limit(limit)
//     }

//     const docs = await cursor.toArray()
//     return docs.map((doc) => mapTuition(doc as Record<string, unknown>))
//   } catch {
//     return []
//   }
// }

// async function fetchApplications(
//   filter: Record<string, unknown>,
//   limit?: number
// ): Promise<ApplicationRecord[]> {
//   try {
//     let cursor = db
//       .collection("applications")
//       .find(filter)
//       .sort({ appliedAt: -1 })

//     if (limit) {
//       cursor = cursor.limit(limit)
//     }

//     const docs = await cursor.toArray()
//     return docs.map((doc) => mapApplication(doc as Record<string, unknown>))
//   } catch {
//     return []
//   }
// }

// export function getRecentUsers(limit = 6): Promise<RecentUser[]> {
//   return (async () => {
//     try {
//       const docs = await db
//         .collection("user")
//         .find(
//           {},
//           { projection: { name: 1, email: 1, role: 1, plan: 1, createdAt: 1 } }
//         )
//         .sort({ createdAt: -1 })
//         .limit(limit)
//         .toArray()

//       return docs.map((doc) => ({
//         id: String(doc._id),
//         name: asString(doc.name, "Unnamed user"),
//         email: asString(doc.email),
//         role: normalizeDashboardRole(doc.role),
//         plan: doc.plan === "pro" ? "pro" : "free",
//         createdAt: doc.createdAt,
//       }))
//     } catch {
//       return []
//     }
//   })()
// }

// export function getAllUsers(): Promise<RecentUser[]> {
//   return (async () => {
//     try {
//       const docs = await db
//         .collection("user")
//         .find(
//           {},
//           { projection: { name: 1, email: 1, role: 1, plan: 1, createdAt: 1 } }
//         )
//         .sort({ createdAt: -1 })
//         .toArray()

//       return docs.map((doc) => ({
//         id: String(doc._id),
//         name: asString(doc.name, "Unnamed user"),
//         email: asString(doc.email),
//         role: normalizeDashboardRole(doc.role),
//         plan: doc.plan === "pro" ? "pro" : "free",
//         createdAt: doc.createdAt,
//       }))
//     } catch {
//       return []
//     }
//   })()
// }

// export function getTutorTuitions(email: string): Promise<TuitionRecord[]> {
//   return fetchTuitions({ tutorEmail: email })
// }

// export function getRecentTuitions(limit = 6): Promise<TuitionRecord[]> {
//   return fetchTuitions({}, limit)
// }

// export function getAllTuitions(): Promise<TuitionRecord[]> {
//   return fetchTuitions({})
// }

// export function getTutorApplications(
//   email: string
// ): Promise<ApplicationRecord[]> {
//   return fetchApplications({ tutorEmail: email })
// }

// export function getStudentApplications(
//   email: string
// ): Promise<ApplicationRecord[]> {
//   return fetchApplications({ studentEmail: email })
// }

// export function getRecentApplications(limit = 6): Promise<ApplicationRecord[]> {
//   return fetchApplications({}, limit)
// }

// export function getAllApplications(): Promise<ApplicationRecord[]> {
//   return fetchApplications({})
// }

// export function formatDashboardDate(value: unknown): string {
//   if (!value) return "—"

//   const date = value instanceof Date ? value : new Date(String(value))

//   if (Number.isNaN(date.getTime())) return "—"

//   return new Intl.DateTimeFormat("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   }).format(date)
// }



















import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth, db } from "@/lib/auth";

// ============================================
// ROLE AND USER TYPES
// ============================================

export type DashboardRole = "student" | "tutor" | "admin";

export type DashboardUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: DashboardRole;
  plan: "free" | "pro";
};

export type StudentStats = {
  totalApplied: number;
  accepted: number;
  pending: number;
};

export type TutorStats = {
  totalTuitions: number;
  activeApproved: number;
  totalApplicants: number;
};

export type AdminStats = {
  totalUsers: number;
  totalStudents: number;
  totalTutors: number;
  totalTuitions: number;
  pendingApprovals: number;
  totalApplications: number;
  revenue: number;
};

export type RecentUser = {
  id: string;
  name: string;
  email: string;
  role: DashboardRole;
  plan: "free" | "pro";
  createdAt: unknown;
};

export type TuitionRecord = {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: string;
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
  tutorName: string;
  tutorEmail: string;
  createdAt: unknown;
};

export type ApplicationRecord = {
  id: string;
  tuitionId: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorEmail: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote: string;
  status: "pending" | "accepted" | "rejected";
  appliedAt: unknown;
};

// ============================================
// ROLE HELPERS
// ============================================

export function normalizeDashboardRole(
  value: unknown
): DashboardRole {
  if (value === "admin") return "admin";
  if (value === "tutor") return "tutor";

  return "student";
}

export function dashboardPathForRole(
  role: DashboardRole
): string {
  return `/dashboard/${role}`;
}

// ============================================
// AUTHENTICATED DASHBOARD USER
// ============================================

export const getDashboardUser = cache(
  async (): Promise<DashboardUser | null> => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return null;
    }

    const user = session.user as typeof session.user & {
      role?: unknown;
      plan?: unknown;
    };

    return {
      id: session.user.id,
      name: session.user.name || "MentorLagbe User",
      email: session.user.email,
      image: session.user.image ?? null,
      role: normalizeDashboardRole(user.role),
      plan: user.plan === "pro" ? "pro" : "free",
    };
  }
);

// ============================================
// SERVER-SIDE ROLE PROTECTION
// ============================================

export async function requireDashboardRole(
  role: DashboardRole
): Promise<DashboardUser> {
  const user = await getDashboardUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.role !== role) {
    redirect(dashboardPathForRole(user.role));
  }

  return user;
}

// ============================================
// DATABASE HELPERS
// ============================================

async function safeCount(
  collection: string,
  filter: Record<string, unknown> = {}
): Promise<number> {
  try {
    return await db.collection(collection).countDocuments(filter);
  } catch {
    return 0;
  }
}

async function safeRevenue(): Promise<number> {
  try {
    const rows = await db
      .collection("payments")
      .aggregate([
        { $match: { paymentStatus: "paid" } },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ])
      .toArray();

    const total = rows[0]?.total;

    return typeof total === "number" ? total : 0;
  } catch {
    return 0;
  }
}

// ============================================
// STUDENT DASHBOARD STATS
// ============================================

export async function getStudentStats(
  email: string
): Promise<StudentStats> {
  const [totalApplied, accepted, pending] = await Promise.all([
    safeCount("applications", { studentEmail: email }),
    safeCount("applications", {
      studentEmail: email,
      status: "accepted",
    }),
    safeCount("applications", {
      studentEmail: email,
      status: "pending",
    }),
  ]);

  return {
    totalApplied,
    accepted,
    pending,
  };
}

// ============================================
// TUTOR DASHBOARD STATS
// ============================================

export async function getTutorStats(
  email: string
): Promise<TutorStats> {
  const [totalTuitions, activeApproved, totalApplicants] =
    await Promise.all([
      safeCount("tuitions", { tutorEmail: email }),

      safeCount("tuitions", {
        tutorEmail: email,
        approvalStatus: "approved",
        isActive: true,
      }),

      safeCount("applications", { tutorEmail: email }),
    ]);

  return {
    totalTuitions,
    activeApproved,
    totalApplicants,
  };
}

// ============================================
// ADMIN DASHBOARD STATS
// ============================================

export async function getAdminStats(): Promise<AdminStats> {
  const [
    totalUsers,
    totalStudents,
    totalTutors,
    totalTuitions,
    pendingApprovals,
    totalApplications,
    revenue,
  ] = await Promise.all([
    safeCount("user"),

    safeCount("user", { role: "student" }),

    safeCount("user", { role: "tutor" }),

    safeCount("tuitions"),

    safeCount("tuitions", {
      approvalStatus: "pending",
    }),

    safeCount("applications"),

    safeRevenue(),
  ]);

  return {
    totalUsers,
    totalStudents,
    totalTutors,
    totalTuitions,
    pendingApprovals,
    totalApplications,
    revenue,
  };
}

// ============================================
// DATA CONVERSION HELPERS
// ============================================

function asString(
  value: unknown,
  fallback = ""
): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown): number {
  return typeof value === "number" ? value : 0;
}

// ============================================
// TUITION DATA MAPPER
// ============================================

function mapTuition(
  doc: Record<string, unknown>
): TuitionRecord {
  const status =
    doc.approvalStatus === "approved" ||
    doc.approvalStatus === "rejected"
      ? doc.approvalStatus
      : "pending";

  return {
    id: String(doc._id),
    title: asString(doc.title, "Untitled tuition"),
    subject: asString(doc.subject),
    classLevel: asString(doc.classLevel),
    mode: asString(doc.mode),
    location: asString(doc.location),
    monthlyFee: asNumber(doc.monthlyFee),
    daysPerWeek: asNumber(doc.daysPerWeek),
    approvalStatus: status,
    isActive: doc.isActive !== false,
    tutorName: asString(doc.tutorName),
    tutorEmail: asString(doc.tutorEmail),
    createdAt: doc.createdAt,
  };
}

// ============================================
// APPLICATION DATA MAPPER
// ============================================

function mapApplication(
  doc: Record<string, unknown>
): ApplicationRecord {
  const status =
    doc.status === "accepted" ||
    doc.status === "rejected"
      ? doc.status
      : "pending";

  return {
    id: String(doc._id),
    tuitionId: asString(doc.tuitionId),
    tuitionTitle: asString(doc.tuitionTitle, "Untitled tuition"),
    subject: asString(doc.subject),
    monthlyFee: asNumber(doc.monthlyFee),
    tutorEmail: asString(doc.tutorEmail),
    studentName: asString(doc.studentName),
    studentEmail: asString(doc.studentEmail),
    studentPhone: asString(doc.studentPhone),
    preferredSchedule: asString(doc.preferredSchedule),
    studentNote: asString(doc.studentNote),
    status,
    appliedAt: doc.appliedAt,
  };
}

// ============================================
// FETCH TUITION DATA
// ============================================

async function fetchTuitions(
  filter: Record<string, unknown>,
  limit?: number
): Promise<TuitionRecord[]> {
  try {
    let cursor = db
      .collection("tuitions")
      .find(filter)
      .sort({ createdAt: -1 });

    if (limit) {
      cursor = cursor.limit(limit);
    }

    const docs = await cursor.toArray();

    return docs.map((doc) =>
      mapTuition(doc as Record<string, unknown>)
    );
  } catch {
    return [];
  }
}

// ============================================
// FETCH APPLICATION DATA
// ============================================

async function fetchApplications(
  filter: Record<string, unknown>,
  limit?: number
): Promise<ApplicationRecord[]> {
  try {
    let cursor = db
      .collection("applications")
      .find(filter)
      .sort({ appliedAt: -1 });

    if (limit) {
      cursor = cursor.limit(limit);
    }

    const docs = await cursor.toArray();

    return docs.map((doc) =>
      mapApplication(doc as Record<string, unknown>)
    );
  } catch {
    return [];
  }
}

// ============================================
// ADMIN: USER MANAGEMENT
// ============================================

export async function getRecentUsers(
  limit = 6
): Promise<RecentUser[]> {
  try {
    const docs = await db
      .collection("user")
      .find(
        {},
        {
          projection: {
            name: 1,
            email: 1,
            role: 1,
            plan: 1,
            createdAt: 1,
          },
        }
      )
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return docs.map((doc) => ({
      id: String(doc._id),
      name: asString(doc.name, "Unnamed user"),
      email: asString(doc.email),
      role: normalizeDashboardRole(doc.role),
      plan: doc.plan === "pro" ? "pro" : "free",
      createdAt: doc.createdAt,
    }));
  } catch {
    return [];
  }
}

export async function getAllUsers(): Promise<RecentUser[]> {
  try {
    const docs = await db
      .collection("user")
      .find(
        {},
        {
          projection: {
            name: 1,
            email: 1,
            role: 1,
            plan: 1,
            createdAt: 1,
          },
        }
      )
      .sort({ createdAt: -1 })
      .toArray();

    return docs.map((doc) => ({
      id: String(doc._id),
      name: asString(doc.name, "Unnamed user"),
      email: asString(doc.email),
      role: normalizeDashboardRole(doc.role),
      plan: doc.plan === "pro" ? "pro" : "free",
      createdAt: doc.createdAt,
    }));
  } catch {
    return [];
  }
}

// ============================================
// TUTOR DATA
// ============================================

export function getTutorTuitions(
  email: string
): Promise<TuitionRecord[]> {
  return fetchTuitions({ tutorEmail: email });
}

export function getTutorApplications(
  email: string
): Promise<ApplicationRecord[]> {
  return fetchApplications({ tutorEmail: email });
}

// ============================================
// STUDENT DATA
// ============================================

export function getStudentApplications(
  email: string
): Promise<ApplicationRecord[]> {
  return fetchApplications({ studentEmail: email });
}

// ============================================
// SHARED DATA
// ============================================

export function getRecentTuitions(
  limit = 6
): Promise<TuitionRecord[]> {
  return fetchTuitions({}, limit);
}

export function getAllTuitions(): Promise<TuitionRecord[]> {
  return fetchTuitions({});
}

export function getRecentApplications(
  limit = 6
): Promise<ApplicationRecord[]> {
  return fetchApplications({}, limit);
}

export function getAllApplications(): Promise<ApplicationRecord[]> {
  return fetchApplications({});
}

// ============================================
// DATE FORMATTER
// ============================================

export function formatDashboardDate(
  value: unknown
): string {
  if (!value) return "—";

  const date =
    value instanceof Date
      ? value
      : new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
