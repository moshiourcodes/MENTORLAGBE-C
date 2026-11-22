import { headers } from "next/headers"

import { auth } from "@/lib/auth"

export const EXPRESS_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

/**
 * Returns a short-lived JWT for the current Better Auth session, or null for
 * anonymous visitors. The token is signed by Better Auth's JWT plugin and can
 * be verified by Express through /api/auth/jwks.
 */
export async function getExpressJwt(): Promise<string | null> {
  const requestHeaders = await headers()

  const session = await auth.api.getSession({
    headers: requestHeaders,
  })

  if (!session?.user) {
    return null
  }

  const result = await auth.api.getToken({
    headers: requestHeaders,
  })

  return result?.token ?? null
}

/** Server-side Express fetch that adds a Bearer token when signed in. */
export async function fetchExpress(path: string, init: RequestInit = {}) {
  const requestHeaders = new Headers(init.headers)
  const token = await getExpressJwt()

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`)
  }

  return fetch(`${EXPRESS_API_URL}${path}`, {
    ...init,
    headers: requestHeaders,
    cache: "no-store",
  })
}
