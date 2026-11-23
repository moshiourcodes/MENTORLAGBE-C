

import { createAuthClient } from "better-auth/react"
import {
  inferAdditionalFields,
  jwtClient,
} from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
  // Better Auth lives on the Next.js origin, never on the Express API origin.
  // When unset, Better Auth defaults to the current browser origin.
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || undefined,

  plugins: [inferAdditionalFields<typeof auth>(), jwtClient()],
})

export const { signIn, signUp, signOut, useSession } = authClient
