"use server";
import { ollama } from "@/config/ollama";
import { generateText } from "ai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export const generateSynonyms = async (prompt: string) => {
  // Check if the user is authenticated
  const session = await auth.api.getSession({ headers: await headers() });
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
  });

  return text;
};
