"use client";

import { useEffect, useState } from "react";
import * as Y from "yjs";

type Language = {
  id: number;
  name: string;
};

type Props = {
  yUndoManager: Y.UndoManager;
  language: string;
  onLanguageChange: (lang: string) => void;
};

export function Toolbar({ yUndoManager, language, onLanguageChange }: Props) {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    fetch("/api/languages")
      .then((res) => res.json())
      .then((data: Language[]) => setLanguages(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex items-center gap-2 p-1 bg-gray-100 border-b border-gray-300">
      {/* Language Dropdown */}
      <select
        className="text-sm p-1 rounded border border-gray-300"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.name}>
            {lang.name}
          </option>
        ))}
      </select>

      {/* Undo */}
      <button
        className="p-1 hover:bg-gray-200 rounded"
        onClick={() => yUndoManager.undo()}
        aria-label="undo"
      >
        <UndoIcon />
      </button>

      {/* Redo */}
      <button
        className="p-1 hover:bg-gray-200 rounded"
        onClick={() => yUndoManager.redo()}
        aria-label="redo"
      >
        <RedoIcon />
      </button>
    </div>
  );
}

// Icon components
function UndoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6h6a3 3 0 0 1 3 3 3 3 0 0 1-3 3H8.91"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 3.5 3 6l2.5 2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RedoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3h1.09"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 3.5 13 6l-2.5 2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
