import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const databaseUrl = process.env.BETTER_AUTH_DB_URI

if (!databaseUrl) {
  throw new Error("BETTER_AUTH_DB_URI is missing from environment variables.")
}

const client = new MongoClient(databaseUrl)

export const db = client.db("mentorlagbe")

// Public sign-up accepts all three platform roles, as explicitly requested by
// the project owner. The value is still validated against this allowlist on
// the server before it is written to the user document.
const allowedRoles = ["student", "tutor", "admin"] as const

// JWTs are only a bridge for the separate Express API. Better Auth sessions
// remain the primary authentication system.
const jwtIssuer =
 
  process.env.BETTER_AUTH_URL ||
  "http://localhost:3000"
const jwtAudience = "mentorlagbe-express"

export const auth = betterAuth({
  // Explicit base URL ensures OAuth callbacks are generated from the
  // configured app origin rather than an inferred request host.
  baseURL: process.env.BETTER_AUTH_URL,

  database: mongodbAdapter(db, { client }),

  plugins: [
    jwt({
      jwt: {
        issuer: jwtIssuer,
        audience: jwtAudience,
        expirationTime: "15m",
        // Keep the bridge token minimal — never include secrets or raw user
        // documents. The subject remains the Better Auth user id.
        definePayload: ({ user }) => ({
          email: user.email,
          name: user.name,
          role: typeof user.role === "string" ? user.role : "student",
          plan: user.plan === "pro" ? "pro" : "free",
        }),
      },
    }),
  ],

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      // Server-owned. Clients cannot set or change this after creation.
      role: {
        type: "string",
        required: false,
        defaultValue: "student",
        input: false,
        returned: true,
      },

      // Public signup submits this temporary field; the create hook validates
      // it and writes the trusted `role` field. It is never used to change an
      // existing account.
      signupRole: {
        type: "string",
        required: false,
        input: true,
        returned: false,
      },

      // New OAuth users must choose Student or Tutor before using dashboards.
      // Existing users without this field are treated as already configured.
      roleSelected: {
        type: "boolean",
        required: false,
        defaultValue: true,
        input: false,
        returned: true,
      },

      roles: {
        type: "string",
        required: false,
        defaultValue: "student",
        input: false,
      },

      phone: {
        type: "string",
        required: false,
        input: true,
      },

      bio: {
        type: "string",
        required: false,
        input: true,
      },

      plan: {
        type: "string",
        required: false,
        defaultValue: "free",
        input: false,
      },
    },
  },

  // Preserve the selected role when creating a new user.
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const { signupRole, ...storedUser } = user as typeof user & {
            signupRole?: unknown
          }
          void signupRole

          const requestedRole =
            typeof signupRole === "string"
              ? signupRole
              : typeof user.role === "string"
                ? user.role
                : undefined

          const hasEmailSignupRole = typeof requestedRole === "string"

          const selectedRole =
            hasEmailSignupRole &&
            allowedRoles.includes(
              requestedRole as (typeof allowedRoles)[number]
            )
              ? (requestedRole as (typeof allowedRoles)[number])
              : "student"

          return {
            data: {
              ...storedUser,
              role: selectedRole,
              roles: selectedRole,
              plan: "free",
              roleSelected: hasEmailSignupRole,
            },
          }
        },
      },
    },
  },

  // Google must always be registered, otherwise signIn.social() returns
  // PROVIDER_NOT_FOUND. Credentials stay server-only and are never logged.
  socialProviders: {
    google: {
      // Accept the legacy misspelled variables still present in local .env
      // files. Correct GOOGLE_* names take precedence when both are set.
      clientId: (process.env.GOOGLE_CLIENT_ID ??
        process.env.GOGGLE_CLIENT_ID) as string,
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET ??
        process.env.GOGGLE_CLIENT_SECRET) as string,
      scope: ["email", "profile"],
      prompt: "select_account" as const,
    },
  },
})
