
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import Footer from "@/components/Footer";
import TuitionDetails from "./TuitionDetails";

interface Tuition {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "online" | "offline";
  location?: string;
  bannerImage: string;
  tutorName: string;
  tutorEmail?: string;
  tutorId?: string;
  monthlyFee: number;
  daysPerWeek: number;
  description?: string;
  approvalStatus: string;
  isActive: boolean;
  createdAt?: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Tuition Details | MentorLagbe",
  description:
    "Explore tuition opportunities and find the right mentor on MentorLagbe.",
};

export default async function TuitionDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  let tuition: Tuition | undefined;

  // Fetch tuition data
  try {
    const response = await fetch(`${apiUrl}/api/tuitions`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Tuition API failed with status: ${response.status}`
      );
    }

    const data = await response.json();

    const tuitionList: Tuition[] = Array.isArray(data.tuitions)
      ? data.tuitions
      : [];

    tuition = tuitionList.find(
      (item) => String(item._id) === id
    );
  } catch (error) {
    console.error("Tuition API Error:", error);

    throw new Error(
      "Unable to load tuition details. Please check your API server."
    );
  }

  // Handle missing or unavailable tuition outside try/catch
  if (
    !tuition ||
    tuition.approvalStatus !== "approved" ||
    tuition.isActive !== true
  ) {
    notFound();
  }

  // Get logged-in user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Get role from authenticated session
  const sessionUser = session?.user as
    | { role?: string; plan?: string }
    | undefined;

  const userRole = sessionUser?.role ?? null;
  const userPlan = sessionUser?.plan === "pro" ? "pro" : "free";

  // Render page outside try/catch
  return (
    <>
      <TuitionDetails
        tuition={tuition}
        userRole={userRole}
        isLoggedIn={Boolean(session?.user)}
        userPlan={userPlan}
      />

      <Footer />
    </>
  );
}
