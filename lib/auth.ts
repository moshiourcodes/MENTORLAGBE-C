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

// Public sign-up may never create an admin account. Admin is granted only
// through trusted server-side/admin tooling.
const allowedRoles = ["student", "tutor"] as const

// JWTs are only a bridge for the separate Express API. Better Auth sessions
// remain the primary authentication system.
const jwtIssuer =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.BETTER_AUTH_URL ||
  "http://localhost:3000"
const jwtAudience = "mentorlagbe-express"

export const auth = betterAuth({
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
      role: {
        type: "string",
        required: false,
        defaultValue: "student",
        input: true,
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
          const requestedRole = user.role

          const selectedRole =
            typeof requestedRole === "string" &&
            allowedRoles.includes(
              requestedRole as (typeof allowedRoles)[number]
            )
              ? requestedRole
              : "student"

          return {
            data: {
              ...user,
              role: selectedRole,
              roles: selectedRole,
              plan: "free",
            },
          }
        },
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
})
