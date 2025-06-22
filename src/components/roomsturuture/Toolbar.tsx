"use client";

import { useEffect, useState } from "react";
import * as Y from "yjs";
import { Undo, Redo } from "lucide-react";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/languages");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch languages: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setLanguages(data);
      } catch (err: any) {
        console.error("Error fetching languages:", err);
        setError(err.message || "Failed to load languages");
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div className="flex items-center gap-2 p-2 bg-card border-b">
      {/* Language Dropdown */}
      <select
        className="text-sm p-1.5 rounded-md border bg-background text-foreground focus:ring-2 focus:ring-primary"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        aria-label="Select language"
        disabled={loading}
      >
        {loading ? (
          <option>Loading languages...</option>
        ) : error ? (
          <option>Error loading languages</option>
        ) : (
          languages.map((lang) => (
            <option key={lang.id} value={lang.name}>
              {lang.name}
            </option>
          ))
        )}
      </select>

      {/* Undo */}
      <button
        className="p-1.5 hover:bg-accent rounded-md"
        onClick={() => yUndoManager.undo()}
        aria-label="undo"
      >
        <Undo size={16} />
      </button>

      {/* Redo */}
      <button
        className="p-1.5 hover:bg-accent rounded-md"
        onClick={() => yUndoManager.redo()}
        aria-label="redo"
      >
        <Redo size={16} />
      </button>
    </div>
  );
}
