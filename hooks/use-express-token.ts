"use client"

import { useCallback, useRef } from "react"

import { authClient } from "@/lib/auth-client"

type CachedToken = {
  token: string
  expiresAt: number
}

/** Short-lived in-memory cache for client-side Express requests. */
export function useExpressToken() {
  const cacheRef = useRef<CachedToken | null>(null)

  const getToken = useCallback(async () => {
    const cached = cacheRef.current

    if (cached && cached.expiresAt > Date.now() + 30_000) {
      return cached.token
    }

    const { data, error } = await authClient.token()

    if (error || !data?.token) {
      throw new Error(
        error?.message || "Unable to retrieve an authentication token."
      )
    }

    // Conservative lifetime: the plugin default is 15 minutes.
    cacheRef.current = {
      token: data.token,
      expiresAt: Date.now() + 14 * 60 * 1000,
    }

    return data.token
  }, [])

  return { getToken }
}
