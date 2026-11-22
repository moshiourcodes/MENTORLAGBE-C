

// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

// const databaseUrl = process.env.BETTER_AUTH_DB_URI;

// if (!databaseUrl) {
//   throw new Error(
//     "BETTER_AUTH_DB_URI is missing from environment variables."
//   );
// }

// const client = new MongoClient(databaseUrl);
// export const db = client.db("mentorlagbe");

// export const auth = betterAuth({
//   database: mongodbAdapter(db, { client }),

//   emailAndPassword: {
//     enabled: true,
//   },

//   user: {
//     additionalFields: {
//       role: {
//         type: ["student", "tutor"],
//         required: false,
//         defaultValue: "student",
//         input: true,
//       },

//       // Server-managed list of available roles.
//       roles: {
//         type: "string",
//         required: false,
//         defaultValue: "student",
//         input: false,
//       },

//       phone: {
//         type: "string",
//         required: false,
//         input: true,
//       },

//       bio: {
//         type: "string",
//         required: false,
//         input: true,
//       },

//       plan: {
//         type: "string",
//         required: false,
//         defaultValue: "free",
//         input: false,
//       },
//     },
//   },

//   // Initialize roles using the role selected at signup.
//   databaseHooks: {
//     user: {
//       create: {
//         before: async (user) => {
//           const initialRole =
//             user.role === "tutor" ? "tutor" : "student";

//           return {
//             data: {
//               ...user,
//               role: initialRole,
//               roles: initialRole,
//             },
//           };
//         },
//       },
//     },
//   },

//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     },
//   },
// });








import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const databaseUrl = process.env.BETTER_AUTH_DB_URI;

if (!databaseUrl) {
  throw new Error(
    "BETTER_AUTH_DB_URI is missing from environment variables."
  );
}

const client = new MongoClient(databaseUrl);

export const db = client.db("mentorlagbe");

// Public sign-up may never create an admin account. Admin is granted only
// through trusted server-side/admin tooling.
const allowedRoles = ["student", "tutor"] as const;

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

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
          const requestedRole = user.role;

          const selectedRole =
            typeof requestedRole === "string" &&
            allowedRoles.includes(
              requestedRole as (typeof allowedRoles)[number]
            )
              ? requestedRole
              : "student";

          return {
            data: {
              ...user,
              role: selectedRole,
              roles: selectedRole,
              plan: "free",
            },
          };
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
});





