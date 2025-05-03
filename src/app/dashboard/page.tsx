"use client";
import { authClient } from "@/lib/auth-client";
import { generateSynonyms } from "@/actions/actions";
import { useState } from "react";
import { tryCatch } from "@/lib/try-catch";
const Dashboard = () => {
    const { data } = authClient.useSession();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
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
        <div>
            <h2>Hi, {data?.user.name}</h2>
            <button className="px-4 py-2 rounded-md bg-white text-black cursor-pointer" onClick={handle}>Generate Synonyms</button>
            {loading ? (
                <div>Loading...</div>
            ) : (
                text && (
                    <div>
                        <h3>Generated Synonyms</h3>
                        <p>{text}</p>
                    </div>
                )
            )}

            <button className="px-4 py-2 rounded-md bg-white text-black cursor-pointer" onClick={() => authClient.signOut()}>Logout</button>
        </div>
    );
}


export default Dashboard;