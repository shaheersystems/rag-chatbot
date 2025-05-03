"use client";

import { generateSynonyms } from "@/actions/actions";
import { tryCatch } from "@/lib/try-catch";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  /**
   * Generates synonyms for the word "happy" using the Ollama AI model and displays
   * the result in the page.
   */
  const handle = async () => {
    setLoading(true);
    setText("");
    const { data: text, error } = await tryCatch(generateSynonyms("happy"));
    if (error) {
      console.error("Error generating synonyms:", error);
      setLoading(false);
      return;
    }
    console.log(text);
    setText(text);
    setLoading(false);
  };
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Synonyms Generator</h1>
      <p className="text-gray-200">
        This is a simple synonyms generator that uses the Ollama AI model to
        generate synonyms for a given word.
      </p>
      {loading ? (
        <div className="flex items-center space-x-2">Loading...</div>
      ) : (
        text && (
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-bold">Generated Synonyms</h2>
            <p className="text-gray-200">{text}</p>
          </div>
        )
      )}
      <button className="cursor-pointer" onClick={handle}>
        Start
      </button>
    </div>
  );
}
