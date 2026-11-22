"use client";

import { LoaderCircle } from "lucide-react";

import { GoogleLinkButton } from "@/components/GoogleLinkButton";
import { authClient } from "@/lib/auth-client";
import {
  ProfileForm,
  type ProfileUser,
} from "@/components/profile/ProfileForm";

const dashboardPaths: Record<string, string> = {
  student: "/dashboard/student",
  tutor: "/dashboard/tutor",
  admin: "/dashboard/admin",
};

export default function DashboardProfilePage() {
  const { data: session, isPending, refetch } = authClient.useSession();

  const user = session?.user;

  const profileUser = user as
    | (NonNullable<typeof user> & {
        role?: string;
        plan?: string;
        phone?: string;
        bio?: string;
      })
    | undefined;

  if (isPending || !profileUser) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <LoaderCircle size={18} className="animate-spin text-[#399B98] dark:text-[#5FD3C9]" />
          Loading profile...
        </div>
      </div>
    );
  }

  const role = profileUser.role || "student";
  const cancelHref = dashboardPaths[role] ?? "/dashboard";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Update Profile
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
          Keep your name, contact details, and bio current so students and
          guardians can reach you.
        </p>
      </div>

      <GoogleLinkButton />

      <ProfileForm
        profileUser={profileUser as ProfileUser}
        refetch={refetch}
        cancelHref={cancelHref}
      />
    </div>
  );
}
