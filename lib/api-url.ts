/**
 * Single source of truth for the Express API origin.
 *
 * Local development keeps a convenient default. Production must provide
 * NEXT_PUBLIC_API_BASE_URL explicitly so we never send browser/server traffic
 * to localhost:5000 from a deployed app.
 */
export function getExpressApiUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_BASE_URL

  if (configured) {
    return configured.replace(/\/$/, "")
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:5000"
  }

  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not configured. Set it to the deployed Express API origin."
  )
}
