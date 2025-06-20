"use client";

import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { autocompletion } from "@codemirror/autocomplete";
import { useCallback, useEffect, useState } from "react";
import { getYjsProviderForRoom } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import styles from "./CollaborativeEditor.module.css";
import { Toolbar } from "@/components/Toolbar";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Button } from "@/components/ui/button";
import { dracula } from "@uiw/codemirror-theme-dracula";
import RunButtonWithOutput from "./RunButtonWithOutput";

export function CollaborativeEditor() {
  const room = useRoom();
  const provider = getYjsProviderForRoom(room);
  const [element, setElement] = useState<HTMLElement>();
  const [yUndoManager, setYUndoManager] = useState<Y.UndoManager>();
  const [output, setOutput] = useState<string>("");
  const [showOutput, setShowOutput] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [code, setCode] = useState<string>("");

  // Language selection
  const [selectedLanguage, setSelectedLanguage] = useState<string>("javascript");
  const [languages, setLanguages] = useState<Record<string, number>>({}); // { language: id }

  const userInfo = useSelf((me) => me.info);

  // Fetch language list once
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch("/api/languages");
        if (resp.ok) {
          const data = await resp.json();
          const languageMap = data.reduce((map: Record<string, number>, lang: any) => {
            // normalize the key to lowercase
            const key = lang.name.split(" ")[0].toLowerCase();
            map[key] = lang.id;
            return map;
          }, {});
          setLanguages(languageMap);
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    })();
  }, []);

  const languageId = languages[selectedLanguage]; // default to JS if not loaded

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element || !room || !userInfo) return;

    const ydoc = provider.getYDoc();
    const ytext = ydoc.getText("codemirror");
    const undoManager = new Y.UndoManager(ytext);
    setYUndoManager(undoManager);

    provider.awareness.setLocalStateField("user", {
      name: userInfo.name,
      color: userInfo.color,
      colorLight: userInfo.color + "80",
    });

    const state = EditorState.create({
      doc: ytext.toString(),
      extensions: [
        basicSetup,
        javascript(),
        autocompletion(),
        yCollab(ytext, provider.awareness, { undoManager }),
        dracula,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setCode(update.state.doc.toString());
          }
        }),
      ],
    });

    const view = new EditorView({ state, parent: element });
    return () => view.destroy();
  }, [element, room, userInfo, provider]);

  const handleExecute = async () => {
    const codeContent = element?.querySelector(".cm-content")?.textContent || "";
    setOutput("Running...");
    try {
      const resp = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: codeContent, languageId }),
      });

      const data = await resp.json();
      if (data.error) {
        setOutput(`Error: ${data.error}${data.details ? `\n${data.details}` : ""}`);
      } else {
        setOutput(data.output || "No output");
      }
    } catch (err) {
      setOutput(`Error: ${err}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.editorHeader}>
        <div>
          {yUndoManager && (
            <Toolbar yUndoManager={yUndoManager} language={selectedLanguage} onLanguageChange={setSelectedLanguage} />
          )}
        </div>
      </div>

      <div className={styles.mainSplit}>
        <div className={styles.leftPane}>
          <div className={styles.splitContainer}>
            <PanelGroup direction="vertical" className={styles.codePane}>
              <Panel
                minSize={40}
                defaultSize={60}
                className="flex flex-col min-h-[180px] border-b border-gray-200 bg-white dark:bg-[#18181b]"
              >
                <div className={styles.editorContainer} ref={ref}></div>
              </Panel>

              <PanelResizeHandle className={styles.resizableHandle} />

              <Panel minSize={20} defaultSize={40} className={styles.outputPane}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    {showOutput ? "Output" : "Input"}
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => setShowOutput((prev) => !prev)}>
                      Toggle {showOutput ? "Input" : "Output"}
                    </Button>
                    <Button size="sm" onClick={handleExecute}>Run Code</Button>
                  </div>
                </div>

                {showOutput ? (
                  <pre className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap text-sm bg-white dark:bg-[#23272f] rounded p-2 border min-h-[40px] overflow-auto">
                    {output || <span className="text-gray-400 italic">(Output will appear here)</span>}
                  </pre>
                ) : (
                  <textarea
                    className="text-gray-800 dark:text-gray-100 text-sm bg-white dark:bg-[#23272f] rounded p-2 border min-h-[100px] w-full resize-none"
                    placeholder="Type input data or parameters here…"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={6}
                  />
                )}
              </Panel>
            </PanelGroup>
          </div>
        </div>
      </div>

      {/* RunButtonWithOutput with dynamic languageId */}
      <RunButtonWithOutput getCode={() => code} languageId={languageId} />
    </div>
  );
}