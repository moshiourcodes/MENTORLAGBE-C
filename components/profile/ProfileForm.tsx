"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import {
  Camera,
  Crown,
  GraduationCap,
  LoaderCircle,
  Mail,
  Phone,
  Save,
  UserRound,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export type ProfileUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  plan?: string;
  phone?: string;
  bio?: string;
};

export function ProfileForm({
  profileUser,
  refetch,
  cancelHref = "/",
}: {
  profileUser: ProfileUser;
  refetch: () => Promise<unknown>;
  cancelHref?: string;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form state directly from the user session.
  const [name, setName] = useState(profileUser.name || "");
  const [phone, setPhone] = useState(profileUser.phone || "");
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
  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
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

        toast.success("Photo selected. Save your changes to apply it.");
      }
    };

    reader.onerror = () => {
      toast.error("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
  };

  // Save profile changes.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
        phone: phone.trim(),
        bio: bio.trim(),
      });

      if (error) {
        throw new Error(error.message || "Unable to update your profile.");
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
          error instanceof Error ? error.message : "Please try again.",
        duration: 4000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#E9ECEF] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.025)] sm:p-8 dark:border-border dark:bg-card">
      <form onSubmit={handleSubmit}>
        {/* Profile Photo */}
        <div className="flex flex-col gap-5 border-b border-gray-100 pb-6 sm:flex-row sm:items-center dark:border-border">
          <div className="relative mx-auto sm:mx-0">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#C9E9E5] bg-[#399B98] text-[34px] font-medium text-white shadow-sm dark:border-[#399B98]/30">
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
            <h3 className="text-sm font-bold text-[#17202D] dark:text-foreground">
              Profile Photo
            </h3>

            <p className="mt-1 text-xs leading-5 text-[#87949A] dark:text-muted-foreground">
              Upload a clear portrait to build trust with students and
              guardians.
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
              className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-[#FAFCFC] px-4 text-xs font-medium text-[#52666B] transition hover:border-[#399B98] hover:bg-[#EAF6F5] dark:border-border dark:bg-muted/40 dark:text-foreground dark:hover:bg-[#399B98]/15"
            >
              <Camera size={14} className="text-[#399B98] dark:text-[#5FD3C9]" />
              Upload New Avatar
            </button>
          </div>
        </div>

        {/* Account Role and Subscription */}
        <div className="my-7 grid grid-cols-1 gap-5 rounded-xl border border-[#E9EEEE] bg-[#F8FAFB] p-4 sm:grid-cols-2 dark:border-border dark:bg-muted/30">
          <div>
            <p className="mb-2 text-xs text-[#87949A] dark:text-muted-foreground">
              Account Role
            </p>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#CDE8E4] bg-[#EAF6F5] px-3 py-1 text-xs font-semibold capitalize text-[#398985] dark:border-[#399B98]/30 dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
              <GraduationCap size={14} />
              {role}
            </span>
          </div>

          <div>
            <p className="mb-2 text-xs text-[#87949A] dark:text-muted-foreground">
              Subscription Plan
            </p>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                plan.toLowerCase() === "pro"
                  ? "border border-[#F4DCA8] bg-[#FFF5E2] text-[#B7791F] dark:border-[#C98A2B]/40 dark:bg-[#C98A2B]/15 dark:text-[#F0C57E]"
                  : "border border-gray-200 bg-white text-[#64748B] dark:border-border dark:bg-muted/40 dark:text-muted-foreground"
              }`}
            >
              <Crown size={13} />
              {plan.toLowerCase() === "pro" ? "PRO Member" : "Free Plan"}
            </span>
          </div>
        </div>

        {/* Full Name */}
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-2 block text-[13px] font-semibold text-[#263C43] dark:text-foreground"
          >
            Full Name <span className="text-red-500">*</span>
          </label>

          <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-[#FAFBFC] px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10 dark:border-border dark:bg-muted/40">
            <UserRound size={16} className="shrink-0 text-[#A0AAAE] dark:text-slate-400" />

            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
              className="h-full w-full bg-transparent px-3 text-[13px] text-[#374151] outline-none placeholder:text-[#A0AAAE] dark:text-foreground dark:placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-[13px] font-semibold text-[#263C43] dark:text-foreground"
          >
            Email Address{" "}
            <span className="text-xs font-normal text-[#A0AAAE] dark:text-slate-400">
              (Non-editable)
            </span>
          </label>

          <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-[#F1F4F6] px-3 dark:border-border dark:bg-muted/40">
            <Mail size={16} className="shrink-0 text-[#A0AAAE] dark:text-slate-400" />

            <input
              id="email"
              type="email"
              value={profileUser.email || ""}
              readOnly
              className="h-full w-full cursor-not-allowed bg-transparent px-3 text-[13px] text-[#87949A] outline-none dark:text-slate-400"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="mb-2 block text-[13px] font-semibold text-[#263C43] dark:text-foreground"
          >
            Phone Number
          </label>

          <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-[#FAFBFC] px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10 dark:border-border dark:bg-muted/40">
            <Phone size={16} className="shrink-0 text-[#A0AAAE] dark:text-slate-400" />

            <input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+880-1700-000002"
              className="h-full w-full bg-transparent px-3 text-[13px] text-[#374151] outline-none placeholder:text-[#A0AAAE] dark:text-foreground dark:placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="mb-7">
          <label
            htmlFor="bio"
            className="mb-2 block text-[13px] font-semibold text-[#263C43] dark:text-foreground"
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
            className="w-full resize-y rounded-lg border border-gray-200 bg-[#FAFBFC] px-3.5 py-3 text-[13px] leading-6 text-[#374151] outline-none transition placeholder:text-[#A0AAAE] focus:border-[#399B98] focus:ring-2 focus:ring-[#399B98]/10 dark:border-border dark:bg-muted/40 dark:text-foreground dark:placeholder:text-slate-400"
          />

          <p className="mt-1 text-right text-[10px] text-[#A0AAAE] dark:text-slate-400">
            {bio.length}/500
          </p>
        </div>

        {/* Save and Cancel */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end dark:border-border">
          <button
            type="button"
            onClick={() => router.push(cancelHref)}
            disabled={isSaving}
            className="h-10 rounded-lg border border-gray-200 px-6 text-xs font-semibold text-[#6B7C83] transition hover:bg-gray-50 disabled:opacity-50 dark:border-border dark:text-muted-foreground dark:hover:bg-muted/40"
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
                <LoaderCircle size={15} className="animate-spin" />
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
  );
}
