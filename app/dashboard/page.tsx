"use client";

import { useEffect, useRef, useState } from "react";
import { Resizable } from "re-resizable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MonacoEditor, { OnMount } from "@monaco-editor/react";

interface QuestionTemplate {
  language: "python" | "c" | "cpp";
  template: string;
}

interface QuestionData {
  question: string;
  description: string;
  question_template: QuestionTemplate[];
}

export default function Component() {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<
    "python" | "c" | "cpp"
  >("cpp");
  const [code, setCode] = useState("");
  const editorRef = useRef<any>(null);

  // Preprocess the template from the database
  const parseTemplateCode = (template: string) => {
    return template
      .replace(/\\n/g, "\n") // Replace escaped newlines
      .replace(/\\t/g, "\t") // Replace escaped tabs
      .replace(/ {4}/g, "\t"); // Optionally convert 4 spaces to a tab
  };

  // Fetch question data
  useEffect(() => {
    async function fetchQuestion() {
      try {
        const response = await fetch(`/api/fetchQuestion?question_id=1`);
        const data: QuestionData = await response.json();
        setQuestionData(data);

        const initialTemplate =
          data.question_template.find(
            (template) => template.language === selectedLanguage
          )?.template || "";

        const parsedTemplate = parseTemplateCode(initialTemplate);
        setCode(parsedTemplate);

        // Format the editor content
        if (editorRef.current) {
          editorRef.current.setValue(parsedTemplate);
          editorRef.current.getAction("editor.action.formatDocument").run();
        }
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    }

    fetchQuestion();
  }, [selectedLanguage]);

  // Handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value as "python" | "c" | "cpp";
    setSelectedLanguage(language);

    const template =
      questionData?.question_template.find(
        (template) => template.language === language
      )?.template || "";

    const parsedTemplate = parseTemplateCode(template);
    setCode(parsedTemplate);

    // Format the editor content
    if (editorRef.current) {
      editorRef.current.setValue(parsedTemplate);
      editorRef.current.getAction("editor.action.formatDocument").run();
    }
  };

  // Handle editor mount
  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;

    // Format the document after editor loads
    if (editor) {
      editor?.getAction("editor.action.formatDocument")?.run();
    }
  };

  // Handle changes in the editor
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="flex h-[calc(100vh-4rem)]">
        <Resizable
          defaultSize={{ width: "40%", height: "100%" }}
          minWidth="20%"
          maxWidth="80%"
          enable={{ right: true }}
        >
          <Card className="h-full rounded-none border-r border-gray-700 bg-gray-900/50 backdrop-blur text-white">
            <div className="p-4">
              <h1 className="text-xl font-bold mb-4">
                {questionData?.question}
              </h1>
              <div className="space-y-4">
                <div className="prose prose-invert">
                  <p>{questionData?.description}</p>
                </div>
              </div>
            </div>
          </Card>
        </Resizable>

        <div className="flex-1 flex flex-col">
          <div className="border-b border-gray-700 p-2 flex items-center justify-between">
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="c">C</option>
            </select>
          </div>
          <MonacoEditor
            height="calc(100vh - 4rem)"
            language={selectedLanguage}
            value={code}
            onChange={handleEditorChange}
            onMount={handleEditorMount}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              fontFamily: "Fira Code",
              theme: "vs-dark",
              wordWrap: "on",
              automaticLayout: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
