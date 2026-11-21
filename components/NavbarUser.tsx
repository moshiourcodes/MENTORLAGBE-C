
"use client";

import { authClient } from "@/lib/auth-client";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

export default function NavbarUser() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-full bg-gray-100 dark:bg-slate-800" />
    );
  }

  const user = session?.user;

  // User is not logged in
  if (!user) {
    return null;
  }

  const name = user.name || "User";
  const image = user.image;

  return (
    <div className="flex items-center gap-2.5 border-l border-gray-100 pl-4 dark:border-[#1E2C42]">
      {/* User Avatar */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#399B98]/20 bg-[#399B98] text-xs font-semibold text-white">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          getInitials(name)
        )}
      </div>

      {/* User Name */}
      <div className="hidden sm:block">
        <p className="max-w-[130px] truncate text-xs font-medium text-[#17202D] dark:text-foreground">
          {name}
        </p>
      </div>
    </div>
  );
}
