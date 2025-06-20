// components/RunButtonWithOutput.tsx
"use client";

import { useState } from "react";

interface Props {
  getCode: () => string;
  languageId: number; 
}

export default function RunButtonWithOutput({ getCode, languageId }: Props) {
  const [output, setOutput] = useState<string>("");

  const runCode = async () => {
    setOutput("Running...");
    try {
      const resp = await fetch("/api/execute", {
        method: "POST",
        body: JSON.stringify({ code: getCode(), languageId }),
      });

      const data = await resp.json();
      setOutput(data.output || "No output");
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={runCode}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
      >
        Run
      </button>
      <pre className="bg-black text-white mt-2 p-2 min-h-[100px] whitespace-pre-wrap">
        {output}
      </pre>
    </div>
  );
}
