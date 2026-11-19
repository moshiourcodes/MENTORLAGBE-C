
"use client";

import { useRef, useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import {
  UserRound,
  Mail,
  Phone,
  Camera,
  GraduationCap,
  Crown,
  LoaderCircle,
  Save,
} from "lucide-react";
import Image from "next/image";

type ProfileUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  plan?: string;
  phoneNumber?: string;
  bio?: string;
};

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
        phoneNumber?: string;
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
          <LoaderCircle
            size={20}
            className="animate-spin text-[#399B98]"
          />
          Loading account settings...
        </div>
      </main>
    );
  }

  return (
    <ProfileForm
      profileUser={profileUser as ProfileUser}
      refetch={refetch}
    />
  );
}

function ProfileForm({
  profileUser,
  refetch,
}: {
  profileUser: ProfileUser;
  refetch: () => Promise<unknown>;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form state directly from the user session.
  const [name, setName] = useState(profileUser.name || "");
  const [phoneNumber, setPhoneNumber] = useState(
    profileUser.phoneNumber || ""
  );
  const [bio, setBio] = useState(profileUser.bio || "");
  const [image, setImage] = useState(profileUser.image || "");
  const [isSaving, setIsSaving] = useState(false);

  const role = profileUser.role || "student";
  const plan = profileUser.plan || "free";

  // Generate profile initials.
  const getInitials = (value: string) => {
    return value
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");
  };

  // Select profile avatar.
  const handleAvatarChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 500 * 1024) {
      toast.error("Please select an image smaller than 500 KB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);

        toast.success(
          "Photo selected. Save your changes to apply it."
        );
      }
    };

    reader.onerror = () => {
      toast.error("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
  };

  // Save profile changes.
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSaving) return;

    if (!name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image || "",
        phoneNumber: phoneNumber.trim(),
        bio: bio.trim(),
      });

      if (error) {
        throw new Error(
          error.message || "Unable to update your profile."
        );
      }

      await refetch();

      toast.success("Profile updated successfully!", {
        description: "Your changes have been saved.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Profile Update Error:", error);

      toast.error("Profile update failed!", {
        description:
          error instanceof Error
            ? error.message
            : "Please try again.",
        duration: 4000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F9FA]">
      {/* Account Settings Header */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-14 max-w-350 items-center px-5 sm:px-8">
          <h1 className="text-base font-bold text-[#17202D]">
            Account Settings
          </h1>
        </div>
      </header>

      {/* Main Profile Section */}
      <section className="px-4 py-9 sm:px-6">
        <div className="mx-auto max-w-187.5">

          {/* Page Heading */}
          <div className="mb-6">
            <h2 className="text-[21px] font-bold tracking-tight text-[#17202D]">
              Account Profile
            </h2>

            <p className="mt-1 text-sm text-[#87949A]">
              Update your public bio, profile avatar, and contact details.
            </p>
          </div>

          {/* Profile Card */}
          <div className="rounded-2xl border border-[#E9ECEF] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.025)] sm:p-8">
            <form onSubmit={handleSubmit}>

              {/* Profile Photo */}
              <div className="flex flex-col gap-5 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
                <div className="relative mx-auto sm:mx-0">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#C9E9E5] bg-[#399B98] text-[34px] font-medium text-white shadow-sm">
                    {image ? (
                      <Image
                      width={20}
                      height={20}
                        src={image}
                        alt={name || "Profile"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      getInitials(name || "User")
                    )}
                  </div>

                  {plan.toLowerCase() === "pro" && (
                    <div className="absolute -right-0.5 bottom-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#E8A52B] text-white">
                      <Crown size={15} />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-sm font-bold text-[#17202D]">
                    Profile Photo
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#87949A]">
                    Upload a clear portrait to build trust with students and guardians.
                    <br />
                    Supports PNG, JPG, or WebP. Maximum 500 KB.
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-[#FAFCFC] px-4 text-xs font-medium text-[#52666B] transition hover:border-[#399B98] hover:bg-[#EAF6F5]"
                  >
                    <Camera size={14} className="text-[#399B98]" />
                    Upload New Avatar
                  </button>
                </div>
              </div>

              {/* Account Role and Subscription */}
              <div className="my-7 grid grid-cols-1 gap-5 rounded-xl border border-[#E9EEEE] bg-[#F8FAFB] p-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs text-[#87949A]">
                    Account Role
                  </p>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#CDE8E4] bg-[#EAF6F5] px-3 py-1 text-xs font-semibold capitalize text-[#398985]">
                    <GraduationCap size={14} />
                    {role}
                  </span>
                </div>

                <div>
                  <p className="mb-2 text-xs text-[#87949A]">
                    Subscription Plan
                  </p>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      plan.toLowerCase() === "pro"
                        ? "border border-[#F4DCA8] bg-[#FFF5E2] text-[#B7791F]"
                        : "border border-gray-200 bg-white text-[#64748B]"
                    }`}
                  >
                    <Crown size={13} />
                    {plan.toLowerCase() === "pro"
                      ? "PRO Member"
                      : "Free Plan"}
                  </span>
                </div>
              </div>

              {/* Full Name */}
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="mb-2 block text-[13px] font-semibold text-[#263C43]"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>

                <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-[#FAFBFC] px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10">
                  <UserRound
                    size={16}
                    className="shrink-0 text-[#A0AAAE]"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your full name"
                    className="h-full w-full bg-transparent px-3 text-[13px] text-[#374151] outline-none placeholder:text-[#A0AAAE]"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-[13px] font-semibold text-[#263C43]"
                >
                  Email Address{" "}
                  <span className="text-xs font-normal text-[#A0AAAE]">
                    (Non-editable)
                  </span>
                </label>

                <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-[#F1F4F6] px-3">
                  <Mail
                    size={16}
                    className="shrink-0 text-[#A0AAAE]"
                  />

                  <input
                    id="email"
                    type="email"
                    value={profileUser.email || ""}
                    readOnly
                    className="h-full w-full cursor-not-allowed bg-transparent px-3 text-[13px] text-[#87949A] outline-none"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="mb-5">
                <label
                  htmlFor="phoneNumber"
                  className="mb-2 block text-[13px] font-semibold text-[#263C43]"
                >
                  Phone Number
                </label>

                <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-[#FAFBFC] px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10">
                  <Phone
                    size={16}
                    className="shrink-0 text-[#A0AAAE]"
                  />

                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(event) =>
                      setPhoneNumber(event.target.value)
                    }
                    placeholder="+880-1700-000002"
                    className="h-full w-full bg-transparent px-3 text-[13px] text-[#374151] outline-none placeholder:text-[#A0AAAE]"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="mb-7">
                <label
                  htmlFor="bio"
                  className="mb-2 block text-[13px] font-semibold text-[#263C43]"
                >
                  Bio / Academic Background
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  maxLength={500}
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  placeholder="Write about your academic background, teaching experience, or learning goals..."
                  className="w-full resize-y rounded-lg border border-gray-200 bg-[#FAFBFC] px-3.5 py-3 text-[13px] leading-6 text-[#374151] outline-none transition placeholder:text-[#A0AAAE] focus:border-[#399B98] focus:ring-2 focus:ring-[#399B98]/10"
                />

                <p className="mt-1 text-right text-[10px] text-[#A0AAAE]">
                  {bio.length}/500
                </p>
              </div>

              {/* Save and Cancel */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  disabled={isSaving}
                  className="h-10 rounded-lg border border-gray-200 px-6 text-xs font-semibold text-[#6B7C83] transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#399B98] px-7 text-xs font-semibold text-white shadow-sm transition hover:bg-[#287F7C] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle
                        size={15}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={15} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
