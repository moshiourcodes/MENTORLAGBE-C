// // "use client"

// // import { useState } from "react"
// // import type { FormEvent } from "react"
// // import Link from "next/link"
// // import { useRouter } from "next/navigation"
// // import { toast } from "sonner"

// // import { authClient } from "@/lib/auth-client"

// // import {
// //   GraduationCap,
// //   Mail,
// //   LockKeyhole,
// //   Eye,
// //   EyeOff,
// //   ArrowRight,
// // } from "lucide-react"

// // export default function SignInPage() {
// //   const router = useRouter()
// //   const [showPassword, setShowPassword] = useState(false)
// //   const [isSubmitting, setIsSubmitting] = useState(false)

// //   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
// //     event.preventDefault()

// //     if (isSubmitting) return

// //     setIsSubmitting(true)

// //     const form = event.currentTarget

// //     try {
// //       const formData = new FormData(form)

// //       const email = String(formData.get("email") || "").trim()
// //       const password = String(formData.get("password") || "")

// //       // Basic validation
// //       if (!email || !password) {
// //         throw new Error("Please fill in all required fields.")
// //       }

// //       // Better Auth Sign In
// //       const { data, error } = await authClient.signIn.email({
// //         email,
// //         password,
// //         rememberMe: true,
// //       })

// //       if (error) {
// //         throw new Error(error.message || "Invalid email or password.")
// //       }

// //       // Successful sign in
// //       console.log("Sign In Successful:", {
// //         email,
// //         authenticated: Boolean(data),
// //       })

// //       form.reset()
// //       setShowPassword(false)

// //       toast.success("Sign in successful!", {
// //         description: "Welcome back to MentorLagbe!",
// //         duration: 3000,
// //       })

// //       const role = (data?.user as { role?: string } | undefined)?.role

// //       const dashboardPath =
// //         role === "admin"
// //           ? "/dashboard/admin"
// //           : role === "tutor"
// //             ? "/dashboard/tutor"
// //             : "/dashboard/student"

// //       router.replace(dashboardPath)
// //       router.refresh()
// //     } catch (error) {
// //       console.error("Sign In Error:", error)

// //       toast.error("Sign in failed!", {
// //         description:
// //           error instanceof Error
// //             ? error.message
// //             : "Please check your credentials and try again.",
// //         duration: 4000,
// //       })
// //     } finally {
// //       setIsSubmitting(false)
// //     }
// //   }

// //   return (
// //     <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#F7FAFA] px-4 py-12 dark:bg-[#0B1220]">
// //       <div className="w-full max-w-115 rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_10px_40px_rgba(0,0,0,0.05)] sm:p-9 dark:border-[#1E2C42] dark:bg-[#111C2E]">
// //         {/* Logo */}
// //         <Link href="/" className="mb-7 flex items-center justify-center gap-2">
// //           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#399B98]">
// //             <GraduationCap size={23} className="text-white" />
// //           </div>

// //           <span className="text-xl font-bold text-[#17202D] dark:text-foreground">
// //             Mentor<span className="text-[#399B98] dark:text-[#5FD3C9]">Lagbe</span>
// //           </span>
// //         </Link>

// //         {/* Heading */}
// //         <div className="mb-7 text-center">
// //           <h1 className="text-2xl font-bold text-[#17202D] dark:text-foreground">Welcome Back!</h1>

// //           <p className="mt-2 text-sm text-[#6B7280] dark:text-slate-300">
// //             Sign in to continue to your MentorLagbe account.
// //           </p>
// //         </div>

// //         {/* Sign In Form */}
// //         <form onSubmit={handleSubmit} className="space-y-5">
// //           {/* Email */}
// //           <div>
// //             <label
// //               htmlFor="email"
// //               className="mb-2 block text-sm font-semibold text-[#374151] dark:text-slate-200"
// //             >
// //               Email Address
// //             </label>

// //             <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10 dark:border-[#1E2C42] dark:bg-[#111C2E]">
// //               <Mail size={18} className="shrink-0 text-[#9CA3AF] dark:text-slate-400" />

// //               <input
// //                 id="email"
// //                 name="email"
// //                 type="email"
// //                 placeholder="example@gmail.com"
// //                 required
// //                 autoComplete="email"
// //                 className="h-full w-full bg-transparent px-3 text-sm font-medium text-[#17202D] outline-none placeholder:font-normal placeholder:text-[#9CA3AF] dark:text-foreground dark:placeholder:text-slate-400"
// //               />
// //             </div>
// //           </div>

// //           {/* Password */}
// //           <div>
// //             <label
// //               htmlFor="password"
// //               className="mb-2 block text-sm font-semibold text-[#374151] dark:text-slate-200"
// //             >
// //               Password
// //             </label>

// //             <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10 dark:border-[#1E2C42] dark:bg-[#111C2E]">
// //               <LockKeyhole size={18} className="shrink-0 text-[#9CA3AF] dark:text-slate-400" />

// //               <input
// //                 id="password"
// //                 name="password"
// //                 type={showPassword ? "text" : "password"}
// //                 placeholder="Enter your password"
// //                 required
// //                 autoComplete="current-password"
// //                 className="h-full w-full bg-transparent px-3 text-sm font-medium text-[#17202D] outline-none placeholder:font-normal placeholder:text-[#9CA3AF] dark:text-foreground dark:placeholder:text-slate-400"
// //               />

// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="shrink-0 text-[#9CA3AF] transition hover:text-[#399B98] dark:text-slate-400 dark:hover:text-[#5FD3C9]"
// //                 aria-label={showPassword ? "Hide password" : "Show password"}
// //               >
// //                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Submit Button */}
// //           <button
// //             type="submit"
// //             disabled={isSubmitting}
// //             className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#399B98] text-sm font-semibold text-white transition hover:bg-[#287F7C] disabled:cursor-not-allowed disabled:opacity-60"
// //           >
// //             {isSubmitting ? (
// //               "Signing In..."
// //             ) : (
// //               <>
// //                 Sign In
// //                 <ArrowRight size={17} />
// //               </>
// //             )}
// //           </button>
// //         </form>

// //         {/* Sign Up Toggle */}
// //         <p className="mt-7 text-center text-sm text-[#6B7280] dark:text-slate-300">
// //           Don&apos;t have an account?{" "}
// //           <Link
// //             href="/sign-up"
// //             className="font-semibold text-[#399B98] hover:underline dark:text-[#5FD3C9]"
// //           >
// //             Sign Up
// //           </Link>
// //         </p>

// //         {/* Back to Home */}
// //         <div className="mt-6 border-t border-gray-100 pt-5 text-center dark:border-[#1E2C42]">
// //           <Link
// //             href="/"
// //             className="text-xs text-[#6B7280] hover:text-[#399B98] dark:text-slate-300 dark:hover:text-[#5FD3C9]"
// //           >
// //             ← Back to Home
// //           </Link>
// //         </div>
// //       </div>
// //     </main>
// //   )
// // }















// "use client";

// import { useState } from "react";
// import type { FormEvent } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// import { authClient } from "@/lib/auth-client";

// import {
//   GraduationCap,
//   Mail,
//   LockKeyhole,
//   Eye,
//   EyeOff,
//   ArrowRight,
// } from "lucide-react";

// type UserRole = "student" | "tutor" | "admin";

// export default function SignInPage() {
//   const router = useRouter();

//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (
//     event: FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();

//     if (isSubmitting) return;

//     setIsSubmitting(true);

//     const form = event.currentTarget;

//     try {
//       const formData = new FormData(form);

//       const email = String(formData.get("email") || "")
//         .trim()
//         .toLowerCase();

//       const password = String(formData.get("password") || "");

//       // Basic validation
//       if (!email || !password) {
//         throw new Error("Please fill in all required fields.");
//       }

//       // Better Auth Sign In
//       const { error } = await authClient.signIn.email({
//         email,
//         password,
//         rememberMe: true,
//       });

//       if (error) {
//         throw new Error(
//           error.message || "Invalid email or password."
//         );
//       }

//       // Get the authenticated user's session
//       const { data: session, error: sessionError } =
//         await authClient.getSession();

//       if (sessionError || !session?.user) {
//         throw new Error(
//           "Unable to retrieve your account information. Please try again."
//         );
//       }

//       // Read the role saved in the authenticated user account
//       const user = session.user as typeof session.user & {
//         role?: unknown;
//       };

//       const role = user.role;

//       const allowedRoles: UserRole[] = [
//         "student",
//         "tutor",
//         "admin",
//       ];

//       if (
//         typeof role !== "string" ||
//         !allowedRoles.includes(role as UserRole)
//       ) {
//         throw new Error(
//           "Your account has an invalid role. Please contact support."
//         );
//       }

//       // Determine dashboard based on the saved role
//       const dashboardPath = `/dashboard/${role}`;

//       // Success notification
//       toast.success("Sign in successful!", {
//         description: "Welcome back to MentorLagbe!",
//         duration: 3000,
//       });

//       setShowPassword(false);

//       // Redirect to the correct dashboard
//       router.replace(dashboardPath);
//       router.refresh();

//     } catch (error) {
//       console.error("Sign In Error:", error);

//       toast.error("Sign in failed!", {
//         description:
//           error instanceof Error
//             ? error.message
//             : "Please check your credentials and try again.",
//         duration: 4000,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#F7FAFA] px-4 py-12 dark:bg-[#0B1220]">
//       <div className="w-full max-w-115 rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_10px_40px_rgba(0,0,0,0.05)] sm:p-9 dark:border-[#1E2C42] dark:bg-[#111C2E]">

//         {/* Logo */}
//         <Link
//           href="/"
//           className="mb-7 flex items-center justify-center gap-2"
//         >
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#399B98]">
//             <GraduationCap
//               size={23}
//               className="text-white"
//             />
//           </div>

//           <span className="text-xl font-bold text-[#17202D] dark:text-foreground">
//             Mentor
//             <span className="text-[#399B98] dark:text-[#5FD3C9]">
//               Lagbe
//             </span>
//           </span>
//         </Link>

//         {/* Heading */}
//         <div className="mb-7 text-center">
//           <h1 className="text-2xl font-bold text-[#17202D] dark:text-foreground">
//             Welcome Back!
//           </h1>

//           <p className="mt-2 text-sm text-[#6B7280] dark:text-slate-300">
//             Sign in to continue to your MentorLagbe account.
//           </p>
//         </div>

//         {/* Sign In Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >
//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="mb-2 block text-sm font-semibold text-[#374151] dark:text-slate-200"
//             >
//               Email Address
//             </label>

//             <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10 dark:border-[#1E2C42] dark:bg-[#111C2E]">
//               <Mail
//                 size={18}
//                 className="shrink-0 text-[#9CA3AF] dark:text-slate-400"
//               />

//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="example@gmail.com"
//                 required
//                 autoComplete="email"
//                 className="h-full w-full bg-transparent px-3 text-sm font-medium text-[#17202D] outline-none placeholder:font-normal placeholder:text-[#9CA3AF] dark:text-foreground dark:placeholder:text-slate-400"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label
//               htmlFor="password"
//               className="mb-2 block text-sm font-semibold text-[#374151] dark:text-slate-200"
//             >
//               Password
//             </label>

//             <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10 dark:border-[#1E2C42] dark:bg-[#111C2E]">
//               <LockKeyhole
//                 size={18}
//                 className="shrink-0 text-[#9CA3AF] dark:text-slate-400"
//               />

//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 required
//                 autoComplete="current-password"
//                 className="h-full w-full bg-transparent px-3 text-sm font-medium text-[#17202D] outline-none placeholder:font-normal placeholder:text-[#9CA3AF] dark:text-foreground dark:placeholder:text-slate-400"
//               />

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPassword(!showPassword)
//                 }
//                 className="shrink-0 text-[#9CA3AF] transition hover:text-[#399B98] dark:text-slate-400 dark:hover:text-[#5FD3C9]"
//                 aria-label={
//                   showPassword
//                     ? "Hide password"
//                     : "Show password"
//                 }
//               >
//                 {showPassword ? (
//                   <EyeOff size={18} />
//                 ) : (
//                   <Eye size={18} />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#399B98] text-sm font-semibold text-white transition hover:bg-[#287F7C] disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {isSubmitting ? (
//               "Signing In..."
//             ) : (
//               <>
//                 Sign In
//                 <ArrowRight size={17} />
//               </>
//             )}
//           </button>
//         </form>

//         {/* Sign Up Toggle */}
//         <p className="mt-7 text-center text-sm text-[#6B7280] dark:text-slate-300">
//           Don&apos;t have an account?{" "}
//           <Link
//             href="/sign-up"
//             className="font-semibold text-[#399B98] hover:underline dark:text-[#5FD3C9]"
//           >
//             Sign Up
//           </Link>
//         </p>

//         {/* Back to Home */}
//         <div className="mt-6 border-t border-gray-100 pt-5 text-center dark:border-[#1E2C42]">
//           <Link
//             href="/"
//             className="text-xs text-[#6B7280] hover:text-[#399B98] dark:text-slate-300 dark:hover:text-[#5FD3C9]"
//           >
//             ← Back to Home
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }



















"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

type UserRole = "student" | "tutor" | "admin";

export default function SignInPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);

      const email = String(formData.get("email") || "")
        .trim()
        .toLowerCase();

      const password = String(formData.get("password") || "");

      if (!email || !password) {
        throw new Error("Please fill in all required fields.");
      }

      // Sign in with Better Auth.
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (error) {
        throw new Error(
          error.message || "Invalid email or password."
        );
      }

      // Retrieve the authenticated session.
      const { data: session, error: sessionError } =
        await authClient.getSession();

      if (sessionError || !session?.user) {
        throw new Error(
          "Unable to retrieve your account information. Please try again."
        );
      }

      // Read the role stored for this user.
      const user = session.user as typeof session.user & {
        role?: unknown;
      };

      const role = user.role;

      const allowedRoles: UserRole[] = [
        "student",
        "tutor",
        "admin",
      ];

      if (
        typeof role !== "string" ||
        !allowedRoles.includes(role as UserRole)
      ) {
        throw new Error(
          "Your account has an invalid role. Please contact support."
        );
      }

      const dashboardPath = `/dashboard/${role}`;

      toast.success("Sign in successful!", {
        description: "Welcome back to MentorLagbe!",
        duration: 3000,
      });

      setShowPassword(false);

      // Redirect according to the saved database role.
      router.replace(dashboardPath);
      router.refresh();

    } catch (error) {
      console.error("Sign In Error:", error);

      toast.error("Sign in failed!", {
        description:
          error instanceof Error
            ? error.message
            : "Please check your credentials and try again.",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#F7FAFA] px-4 py-12 dark:bg-[#0B1220]">
      <div className="w-full max-w-115 rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_10px_40px_rgba(0,0,0,0.05)] sm:p-9 dark:border-[#1E2C42] dark:bg-[#111C2E]">

        {/* Logo */}
        <Link
          href="/"
          className="mb-7 flex items-center justify-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#399B98]">
            <GraduationCap size={23} className="text-white" />
          </div>

          <span className="text-xl font-bold text-[#17202D] dark:text-foreground">
            Mentor
            <span className="text-[#399B98] dark:text-[#5FD3C9]">
              Lagbe
            </span>
          </span>
        </Link>

        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-[#17202D] dark:text-foreground">
            Welcome Back!
          </h1>

          <p className="mt-2 text-sm text-[#6B7280] dark:text-slate-300">
            Sign in to continue to your MentorLagbe account.
          </p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#374151] dark:text-slate-200"
            >
              Email Address
            </label>

            <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10 dark:border-[#1E2C42] dark:bg-[#111C2E]">
              <Mail
                size={18}
                className="shrink-0 text-[#9CA3AF] dark:text-slate-400"
              />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                required
                autoComplete="email"
                className="h-full w-full bg-transparent px-3 text-sm font-medium text-[#17202D] outline-none placeholder:font-normal placeholder:text-[#9CA3AF] dark:text-foreground dark:placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#374151] dark:text-slate-200"
            >
              Password
            </label>

            <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-3 transition focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10 dark:border-[#1E2C42] dark:bg-[#111C2E]">
              <LockKeyhole
                size={18}
                className="shrink-0 text-[#9CA3AF] dark:text-slate-400"
              />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="h-full w-full bg-transparent px-3 text-sm font-medium text-[#17202D] outline-none placeholder:font-normal placeholder:text-[#9CA3AF] dark:text-foreground dark:placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0 text-[#9CA3AF] transition hover:text-[#399B98] dark:text-slate-400 dark:hover:text-[#5FD3C9]"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#399B98] text-sm font-semibold text-white transition hover:bg-[#287F7C] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              "Signing In..."
            ) : (
              <>
                Sign In
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Sign Up Toggle */}
        <p className="mt-7 text-center text-sm text-[#6B7280] dark:text-slate-300">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-[#399B98] hover:underline dark:text-[#5FD3C9]"
          >
            Sign Up
          </Link>
        </p>

        {/* Back to Home */}
        <div className="mt-6 border-t border-gray-100 pt-5 text-center dark:border-[#1E2C42]">
          <Link
            href="/"
            className="text-xs text-[#6B7280] hover:text-[#399B98] dark:text-slate-300 dark:hover:text-[#5FD3C9]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

