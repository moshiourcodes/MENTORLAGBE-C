// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { usePathname, useRouter } from "next/navigation"
// import { Menu, X, LogOut } from "lucide-react"
// import { toast } from "sonner"

// import { authClient, useSession } from "@/lib/auth-client"
// import Image from "next/image"

// const navLinks = [
//   { name: "Home", href: "/" },
//   { name: "Browse Tuitions", href: "/tuitions" },
//   { name: "Pricing", href: "/pricing" },
//   { name: "About", href: "/about" },
// ]

// function getInitials(name: string) {
//   return name
//     .trim()
//     .split(/\s+/)
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase() || "")
//     .join("")
// }

// export default function Navbar() {
//   const pathname = usePathname()
//   const router = useRouter()

//   const [isOpen, setIsOpen] = useState(false)
//   const [isSigningOut, setIsSigningOut] = useState(false)

//   const { data: session, isPending } = useSession()
//   const user = session?.user

//   const isActive = (href: string) => {
//     if (href === "/") return pathname === "/"
//     return pathname === href || pathname.startsWith(`${href}/`)
//   }

//   const closeMenu = () => setIsOpen(false)

//   const handleSignOut = async () => {
//     if (isSigningOut) return

//     setIsSigningOut(true)

//     try {
//       const { error } = await authClient.signOut()

//       if (error) {
//         throw new Error(error.message || "Unable to sign out.")
//       }

//       closeMenu()

//       toast.success("Signed out successfully!")

//       router.push("/")
//       router.refresh()
//     } catch (error) {
//       toast.error(error instanceof Error ? error.message : "Sign out failed.")
//     } finally {
//       setIsSigningOut(false)
//     }
//   }

//   const renderProfileButton = () => {
//     if (!user) return null

//     const name = user.name || "User"

//     return (
//       <Link
//         href="/profile"
//         onClick={closeMenu}
//         className={`flex items-center gap-2.5 rounded-lg border-l border-gray-100 pl-4 transition hover:opacity-80 ${
//           pathname === "/profile" ? "opacity-100" : ""
//         }`}
//         aria-label="Open account profile"
//       >

//         <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#399B98]/20 bg-[#399B98] text-xs font-semibold text-white">
//           {user.image ? (
//             <Image
//               src={user.image}
//               alt={name}
//               className="h-full w-full object-cover"
//             />
//           ) : (
//             getInitials(name)
//           )}
//         </div>

//         <span className="hidden max-w-[130px] truncate text-xs font-medium text-[#17202D] sm:block">
//           {name}
//         </span>
//       </Link>
//     )
//   }

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
//       <nav className="mx-auto flex h-17 max-w-360 items-center justify-between px-5 sm:px-8 lg:px-12">
//         {/* Logo */}
//         <Link
//           href="/"
//           onClick={closeMenu}
//           className="flex shrink-0 items-center gap-2.5"
//         >
//           <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#399B98] text-xl font-bold text-white shadow-sm">
//             M
//           </div>

//           <span className="text-[19px] font-bold tracking-tight text-[#17202D]">
//             MentorLagbe
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden items-center gap-8 md:flex lg:gap-10">
//           {navLinks.map((link) => {
//             const active = isActive(link.href)

//             return (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className={`relative py-2 text-[13px] font-semibold transition-colors duration-200 ${
//                   active
//                     ? "text-[#399B98]"
//                     : "text-slate-600 hover:text-[#399B98]"
//                 }`}
//               >
//                 {link.name}

//                 {active && (
//                   <span className="absolute -bottom-2.75 left-0 h-0.5 w-full rounded-full bg-[#399B98]" />
//                 )}
//               </Link>
//             )
//           })}
//         </div>

//         {/* Desktop Authentication */}
//         <div className="hidden items-center gap-3 md:flex">
//           {isPending ? (
//             <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
//           ) : user ? (
//             <>
//               {renderProfileButton()}

//               <button
//                 type="button"
//                 onClick={handleSignOut}
//                 disabled={isSigningOut}
//                 className="flex items-center gap-2 rounded-lg border border-[#D5EAE7] px-4 py-2.5 text-[12px] font-semibold text-[#399B98] transition hover:bg-[#EAF6F5] disabled:opacity-60"
//               >
//                 <LogOut size={15} />
//                 {isSigningOut ? "Signing Out..." : "Sign Out"}
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 href="/sign-in"
//                 className="rounded-lg border border-[#CFE8E5] px-5 py-2.5 text-[13px] font-semibold text-[#399B98] transition hover:border-[#399B98] hover:bg-[#EAF6F5]"
//               >
//                 Sign In
//               </Link>

//               <Link
//                 href="/sign-up"
//                 className="rounded-lg bg-[#399B98] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#287F7C] hover:shadow-md"
//               >
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           type="button"
//           onClick={() => setIsOpen(!isOpen)}
//           className="rounded-lg p-2 text-[#17202D] transition-colors hover:bg-[#EAF6F5] md:hidden"
//           aria-label={isOpen ? "Close menu" : "Open menu"}
//           aria-expanded={isOpen}
//         >
//           {isOpen ? <X size={23} /> : <Menu size={23} />}
//         </button>
//       </nav>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <div className="border-t border-gray-100 bg-white px-5 pt-3 pb-5 shadow-lg md:hidden">
//           {/* Mobile Profile */}
//           {!isPending && user && (
//             <Link
//               href="/profile"
//               onClick={closeMenu}
//               className="mb-3 flex items-center gap-3 rounded-xl bg-[#EAF6F5] p-3"
//             >
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#399B98] text-sm font-semibold text-white">
//                 {user.image ? (
//                   <img
//                     src={user.image}
//                     alt={user.name || "User"}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   getInitials(user.name || "User")
//                 )}
//               </div>

//               <div className="min-w-0">
//                 <p className="truncate text-sm font-semibold text-[#17202D]">
//                   {user.name || "User"}
//                 </p>
//                 <p className="text-xs text-[#6B7C83]">Account Profile</p>
//               </div>
//             </Link>
//           )}

//           {/* Mobile Navigation Links */}
//           <div className="flex flex-col">
//             {navLinks.map((link) => {
//               const active = isActive(link.href)

//               return (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   onClick={closeMenu}
//                   className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
//                     active
//                       ? "bg-[#EAF6F5] text-[#399B98]"
//                       : "text-slate-600 hover:bg-gray-50 hover:text-[#399B98]"
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               )
//             })}
//           </div>

//           {/* Mobile Authentication */}
//           <div className="mt-4 flex gap-3 border-t border-gray-100 pt-4">
//             {isPending ? (
//               <div className="h-10 w-full animate-pulse rounded-lg bg-gray-100" />
//             ) : user ? (
//               <button
//                 type="button"
//                 onClick={handleSignOut}
//                 disabled={isSigningOut}
//                 className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#CFE8E5] py-2.5 text-sm font-semibold text-[#399B98] hover:bg-[#EAF6F5] disabled:opacity-60"
//               >
//                 <LogOut size={16} />
//                 {isSigningOut ? "Signing Out..." : "Sign Out"}
//               </button>
//             ) : (
//               <>
//                 <Link
//                   href="/sign-in"
//                   onClick={closeMenu}
//                   className="flex-1 rounded-lg border border-[#CFE8E5] py-2.5 text-center text-sm font-semibold text-[#399B98] hover:bg-[#EAF6F5]"
//                 >
//                   Sign In
//                 </Link>

//                 <Link
//                   href="/sign-up"
//                   onClick={closeMenu}
//                   className="flex-1 rounded-lg bg-[#399B98] py-2.5 text-center text-sm font-semibold text-white hover:bg-[#287F7C]"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }








"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { toast } from "sonner";

import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Tuitions", href: "/tuitions" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => setIsOpen(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message || "Unable to sign out.");
      }

      closeMenu();
      toast.success("Signed out successfully!");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Sign out failed."
      );
    } finally {
      setIsSigningOut(false);
    }
  };

  const renderProfileButton = () => {
    if (!user) return null;

    const name = user.name || "User";

    return (
      <Link
        href="/profile"
        onClick={closeMenu}
        className={`flex items-center gap-2.5 rounded-lg border-l border-gray-100 pl-4 transition hover:opacity-80 ${
          pathname === "/profile" ? "opacity-100" : ""
        }`}
        aria-label="Open account profile"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#399B98]/20 bg-[#399B98] text-xs font-semibold text-white">
          {user.image ? (
            <Image
              src={user.image}
              alt={name}
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          ) : (
            getInitials(name)
          )}
        </div>

        <span className="hidden max-w-32.5 truncate text-xs font-medium text-[#17202D] sm:block">
          {name}
        </span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <nav className="mx-auto flex h-17 max-w-360 items-center justify-between px-5 sm:px-8 lg:px-12">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#399B98] text-xl font-bold text-white shadow-sm">
            M
          </div>

          <span className="text-[19px] font-bold tracking-tight text-[#17202D]">
            MentorLagbe
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative py-2 text-[13px] font-semibold transition-all duration-300 ease-in-out hover:-translate-y-0.5 ${
                  active
                    ? "text-[#399B98]"
                    : "text-slate-600 hover:text-[#399B98]"
                }`}
              >
                {link.name}

                <span
                  className={`absolute -bottom-1 left-0 h-0.5 w-full origin-center rounded-full bg-[#399B98] transition-transform duration-300 ease-in-out ${
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
          ) : user ? (
            <>
              {renderProfileButton()}

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex items-center gap-2 rounded-lg border border-[#D5EAE7] px-4 py-2.5 text-[12px] font-semibold text-[#399B98] transition hover:bg-[#EAF6F5] disabled:opacity-60"
              >
                <LogOut size={15} />
                {isSigningOut ? "Signing Out..." : "Sign Out"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-lg border border-[#CFE8E5] px-5 py-2.5 text-[13px] font-semibold text-[#399B98] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#399B98] hover:bg-[#EAF6F5] hover:shadow-md active:translate-y-0 active:scale-95"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-lg bg-[#399B98] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#287F7C] hover:shadow-[0_6px_18px_rgba(57,155,152,0.25)] active:translate-y-0 active:scale-95"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#17202D] transition-colors hover:bg-[#EAF6F5] md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-5 pb-5 pt-3 shadow-lg md:hidden">

          {/* Mobile Profile */}
          {!isPending && user && (
            <Link
              href="/profile"
              onClick={closeMenu}
              className="mb-3 flex items-center gap-3 rounded-xl bg-[#EAF6F5] p-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#399B98] text-sm font-semibold text-white">
                {user.image ? (
                  <image
                    src={user.image }
                    alt={user.name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(user.name || "User")
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#17202D]">
                  {user.name || "User"}
                </p>
                <p className="text-xs text-[#6B7C83]">
                  Account Profile
                </p>
              </div>
            </Link>
          )}

          {/* Mobile Navigation Links */}
          <div className="flex flex-col">
            {navLinks.map((link, index) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  style={{
                    transitionDelay: `${index * 40}ms`,
                  }}
                  className={`group flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 ease-in-out hover:translate-x-1 ${
                    active
                      ? "bg-[#EAF6F5] text-[#399B98]"
                      : "text-slate-600 hover:bg-gray-50 hover:text-[#399B98]"
                  }`}
                >
                  {link.name}

                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-[#399B98] transition-all duration-300 ${
                      active
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile Authentication */}
          <div className="mt-4 flex gap-3 border-t border-gray-100 pt-4">
            {isPending ? (
              <div className="h-10 w-full animate-pulse rounded-lg bg-gray-100" />
            ) : user ? (
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#CFE8E5] py-2.5 text-sm font-semibold text-[#399B98] hover:bg-[#EAF6F5] disabled:opacity-60"
              >
                <LogOut size={16} />
                {isSigningOut ? "Signing Out..." : "Sign Out"}
              </button>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={closeMenu}
                  className="flex-1 rounded-lg border border-[#CFE8E5] py-2.5 text-center text-sm font-semibold text-[#399B98] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EAF6F5] hover:shadow-md active:scale-95"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  onClick={closeMenu}
                  className="flex-1 rounded-lg bg-[#399B98] py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#287F7C] hover:shadow-[0_6px_18px_rgba(57,155,152,0.25)] active:scale-95"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
