import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const databaseUrl = process.env.BETTER_AUTH_DB_URI

if (!databaseUrl) {
  throw new Error("BETTER_AUTH_DB_URI is missing from environment variables.")
}

const client = new MongoClient(databaseUrl)
const db = client.db("mentorlagbe")

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: ["student","tutor","admin"],
        required: true,
        input: true,
      },

      plan: {
        type: "string",
        required: true,
        defaultValue: "free",
        input: false,
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
