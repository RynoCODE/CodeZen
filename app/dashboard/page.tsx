"use client";

import { useEffect, useRef, useState } from "react";
import { Resizable } from "re-resizable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Upload,
  Clock,
  Settings,
  Menu,
  Maximize2,
  RefreshCw,
} from "lucide-react";

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
  const editorRef = useRef<any>(null); // Ref for Monaco Editor

  // Fetch question data from the backend
  useEffect(() => {
    async function fetchQuestion() {
      try {
        const response = await fetch(`/api/fetchQuestion?question_id=1`);
        const data: QuestionData = await response.json();
        setQuestionData(data);

        // Find and set the initial template for the selected language
        const initialTemplate =
          data.question_template.find(
            (template) => template.language === selectedLanguage
          )?.template || "";

        // Format the initial template using prettier indentation
        setCode(formatCode(initialTemplate, selectedLanguage));
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    }

    fetchQuestion();
  }, [selectedLanguage]);

  // Function to format code manually
  const formatCode = (code: string, language: string) => {
    if (!code) return "";

    // Simple indentation rules (you can enhance this or use Prettier for more complex logic)
    const indent = (code: string) =>
      code
        .split("\n")
        .map((line) => line.trimStart())
        .join("\n");

    if (language === "python") {
      // Python-specific formatting logic
      return indent(code);
    }
    if (language === "cpp" || language === "c") {
      // C/C++ formatting
      return indent(code);
    }
    return code;
  };

  // Handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value as "python" | "c" | "cpp";
    setSelectedLanguage(language);

    // Get template for the selected language
    const template =
      questionData?.question_template.find(
        (template) => template.language === language
      )?.template || "";

    // Set and format the code for the selected language
    setCode(formatCode(template, language));

    // Automatically format the editor content
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument").run();
    } 
  };

  // Handle editor mount
  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;

    // Automatically format the document on editor mount
    editor.getAction("editor.action.formatDocument").run();
    setTimeout(() => {
      editor.getAction("editor.action.formatDocument").run();
    }, 100);
  };

  // Handle changes in the editor
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Top Navigation */}
      <div className="border-b border-gray-700 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-sm font-medium">Problem List</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Play className="h-4 w-4 mr-2" />
            Run
          </Button>
          <Button variant="ghost" size="sm" className="text-green-500">
            <Upload className="h-4 w-4 mr-2" />
            Submit
          </Button>
          <Button variant="ghost" size="icon">
            <Clock className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel */}
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

        {/* Right Panel */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-gray-700 p-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
              >
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="c">C</option>
              </select>
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Auto
              </Button>
            </div>
            <Button variant="ghost" size="icon">
              <Maximize2 className="h-4 w-4" />
            </Button>
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
