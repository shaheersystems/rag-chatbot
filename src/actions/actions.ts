"use server";
import { ollama } from "@/config/ollama";
import { generateText } from "ai";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { usage } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const generateSynonyms = async (prompt: string) => {
  // Check if the user is authenticated
  const session = await auth.api.getSession({ headers: new Headers() });
  if (!session?.user) {
    throw new Error("User is not authenticated");
  }
  const { text } = await generateText({
    model: ollama("gemma3:1b"),
    prompt:
      "You are a helpful assistant, that helps user expand their vocabulary. Suggest synonyms for the word: " +
      prompt +
      " and provide a short definition for each synonym.",
    temperature: 0.5,
    onStepFinish: async () => {
      await db
        .update(usage)
        .set({ apiCalls: sql`${usage.apiCalls} + 1` })
        .where(eq(usage.userId, session.user.id))
        .execute();
    },
  });

  return text;
};
