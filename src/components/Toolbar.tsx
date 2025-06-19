import styles from "./Toolbar.module.css";
import * as Y from "yjs";

const LANGUAGES = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "Markdown", value: "markdown" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "SQL", value: "sql" },
];

type Props = {
  yUndoManager: Y.UndoManager;
  language: string;
  onLanguageChange: (lang: string) => void;
};

export function Toolbar({ yUndoManager, language, onLanguageChange }: Props) {
  return (
    <div className={styles.toolbar}>
      <select
        className={styles.languageSelect}
        value={language}
        onChange={e => onLanguageChange(e.target.value)}
        aria-label="Select language"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.value} value={lang.value}>{lang.label}</option>
        ))}
      </select>
      <button
        className={styles.button}
        onClick={() => yUndoManager.undo()}
        aria-label="undo"
      >
        <UndoIcon />
      </button>
      <button
        className={styles.button}
        onClick={() => yUndoManager.redo()}
        aria-label="redo"
      >
        <RedoIcon />
      </button>
    </div>
  );
}

export function UndoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6h6a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H8.91"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M5.5 3.5 3 6l2.5 2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function RedoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6H6a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h1.09"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M10.5 3.5 13 6l-2.5 2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
