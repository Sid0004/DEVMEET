"use client";

import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { markdown } from "@codemirror/lang-markdown";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { sql } from "@codemirror/lang-sql";
import { autocompletion } from "@codemirror/autocomplete";
import { useCallback, useEffect, useState } from "react";
import { getYjsProviderForRoom } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import styles from "./CollaborativeEditor.module.css";
import { Avatars } from "@/components/Avatars";
import { Toolbar } from "@/components/Toolbar";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Button } from "@/components/ui/button";
import { dracula } from "@uiw/codemirror-theme-dracula";

// Collaborative code editor with undo/redo, live cursors, and live avatars
export function CollaborativeEditor() {
  const room = useRoom();
  const provider = getYjsProviderForRoom(room);
  const [element, setElement] = useState<HTMLElement>();
  const [yUndoManager, setYUndoManager] = useState<Y.UndoManager>();
  const [language, setLanguage] = useState<string>("javascript");
  const [output, setOutput] = useState<string>("");

  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me) => me.info);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  // Set up Liveblocks Yjs provider and attach CodeMirror editor
  useEffect(() => {

    if (!element || !room || !userInfo) {
      return;
    }

    // Create Yjs provider and document
    const ydoc = provider.getYDoc();
    const ytext = ydoc.getText("codemirror");
    const undoManager = new Y.UndoManager(ytext);
    setYUndoManager(undoManager);

    // Attach user info to Yjs
    provider.awareness.setLocalStateField("user", {
      name: userInfo.name,
      color: userInfo.color,
      colorLight: userInfo.color + "80", // 6-digit hex code at 50% opacity
    });

    function getLanguageExtension(lang: string) {
      switch (lang) {
        case "python": return python();
        case "java": return java();
        case "markdown": return markdown();
        case "html": return html();
        case "css": return css();
        case "sql": return sql();
        default: return javascript();
      }
    }

    // Set up CodeMirror and extensions
    const state = EditorState.create({
      doc: ytext.toString(),
      extensions: [
        basicSetup,
        getLanguageExtension(language),
        autocompletion(),
        yCollab(ytext, provider.awareness, { undoManager }),
        dracula,
      ],
    });

    // Attach CodeMirror to element
    const view = new EditorView({
      state,
      parent: element,
    });

    return () => {
      view?.destroy();
    };
  }, [element, room, userInfo, provider, language]);

  const handleExecute = () => {
    if (element) {
      const code = element.querySelector(".cm-content")?.textContent || "";
      if (language === "javascript") {
        try {
          // eslint-disable-next-line no-eval
          const result = eval(code);
          setOutput(String(result));
        } catch (err) {
          setOutput("Error: " + err);
        }
      } else {
        setOutput("Execution only supported for JavaScript in this demo.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.editorHeader}>
        <div>
          {yUndoManager ? (
            <Toolbar
              yUndoManager={yUndoManager}
              language={language}
              onLanguageChange={setLanguage}
            />
          ) : null}
        </div>
        <Avatars />
      </div>
      <div className={styles.mainSplit}>
        <div className={styles.leftPane}>
          <div className={styles.splitContainer}>
            <PanelGroup direction="vertical" className={styles.codePane}>
              <Panel minSize={40} defaultSize={60} className="flex flex-col min-h-[180px] border-b border-gray-200 bg-white dark:bg-[#18181b]">
                <div className={styles.editorContainer} ref={ref}></div>
              </Panel>
              <PanelResizeHandle className={styles.resizableHandle} />
              <Panel minSize={20} defaultSize={40} className={styles.outputPane}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-200">Output</span>
                  <Button size="sm" onClick={handleExecute}>
                    Execute
                  </Button>
                </div>
                <pre className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap text-sm bg-white dark:bg-[#23272f] rounded p-2 border min-h-[40px]">
                  {output || <span className="text-gray-400 italic">(Output will appear here)</span>}
                </pre>
              </Panel>
            </PanelGroup>
          </div>
        </div>
        <div className={styles.rightPane}></div>
      </div>
    </div>
  );
}