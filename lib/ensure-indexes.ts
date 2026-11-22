import { db } from "@/lib/auth";

let indexesPromise: Promise<void> | null = null;

/**
 * Domain indexes for real query paths and duplicate prevention.
 * Called from server mutation entrypoints; the work happens once per process.
 * Failures are swallowed on purpose so an existing duplicate document cannot
 * take down a route — Better Auth/domain queries keep working.
 */
export function ensureDomainIndexes(): Promise<void> {
  if (!indexesPromise) {
    indexesPromise = (async () => {
      const definitions: Array<{
        collection: string;
        keys: Record<string, 1 | -1>;
        options?: { unique?: boolean; name?: string };
      }> = [
        {
          collection: "applications",
          keys: { studentId: 1, tuitionId: 1 },
          options: { unique: true, name: "uniq_student_tuition_application" },
        },
        {
          collection: "applications",
          keys: { studentEmail: 1, tuitionId: 1 },
          options: { unique: true, name: "uniq_studentemail_tuition_application" },
        },
        {
          collection: "bookmarks",
          keys: { studentId: 1, tuitionId: 1 },
          options: { unique: true, name: "uniq_student_tuition_bookmark" },
        },
        {
          collection: "payments",
          keys: { stripeSessionId: 1 },
          options: { unique: true, name: "uniq_stripe_session_payment" },
        },
      ];

      await Promise.all(
        definitions.map(async ({ collection, keys, options }) => {
          try {
            await db.collection(collection).createIndex(keys, options);
          } catch {
            // Index creation is best-effort (e.g. legacy duplicates).
          }
        })
      );
    })();
  }

  return indexesPromise;
}
