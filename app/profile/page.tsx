"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import {
  ProfileForm,
  type ProfileUser,
} from "@/components/profile/ProfileForm";

export default function ProfilePage() {
  const router = useRouter();

  const {
    data: session,
    isPending,
    refetch,
  } = authClient.useSession();

  const user = session?.user;

  const profileUser = user as
    | (NonNullable<typeof user> & {
        role?: string;
        plan?: string;
        phone?: string;
        bio?: string;
      })
    | undefined;

  // Redirect users who are not signed in.
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending || !session || !profileUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F9FA]">
        <div className="flex items-center gap-2 text-sm text-[#6B7C83]">
          <LoaderCircle size={20} className="animate-spin text-[#399B98]" />
          Loading account settings...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F9FA] dark:bg-background">
      {/* Account Settings Header */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white dark:border-border dark:bg-card">
        <div className="mx-auto flex h-14 max-w-350 items-center px-5 sm:px-8">
          <h1 className="text-base font-bold text-[#17202D] dark:text-foreground">
            Account Settings
          </h1>
        </div>
      </header>

      {/* Main Profile Section */}
      <section className="px-4 py-9 sm:px-6">
        <div className="mx-auto max-w-187.5">
          {/* Page Heading */}
          <div className="mb-6">
            <h2 className="text-[21px] font-bold tracking-tight text-[#17202D] dark:text-foreground">
              Account Profile
            </h2>

            <p className="mt-1 text-sm text-[#87949A] dark:text-muted-foreground">
              Update your public bio, profile avatar, and contact details.
            </p>
          </div>

          <ProfileForm
            profileUser={profileUser as ProfileUser}
            refetch={refetch}
          />
        </div>
      </section>
    </main>
  );
}
