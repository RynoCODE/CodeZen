"use client";

import { useEffect, useState } from "react";
import { Resizable } from "re-resizable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

  useEffect(() => {
    async function fetchQuestion() {
      const response = await fetch(`/api/fetchQuestion?question_id=1`);
      const data: QuestionData = await response.json();
      console.log(data);

      setQuestionData(data);

      // Ensure question_template exists before calling find()
      const initialTemplate =
        data.question_template?.find(
          (template) => template.language === selectedLanguage
        )?.template || "";

      setCode(initialTemplate);
    }

    fetchQuestion();
  }, [selectedLanguage]); // Ensure selectedLanguage is a dependency if it can change

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value as "python" | "c" | "cpp";
    setSelectedLanguage(language);

    const template =
      questionData?.question_template.find(
        (template) => template.language === language
      )?.template || "";
    setCode(template);
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
          <div className="flex-1 relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="absolute inset-0 bg-gray-900/50 backdrop-blur font-mono p-4 text-sm text-gray-100 w-full h-full resize-none focus:outline-none"
              spellCheck="false"
            />
          </div>
          <Resizable>
            <div className="flex-1 relative h-56 p-5">
              <h1 className="text-xl text-white prose prose-invert font-serif">
                compiler
              </h1>
              <h1 className="text-xl text-white prose prose-invert font-serif">
                Working on it...
              </h1>
            </div>
          </Resizable>
        </div>
      </div>
    </div>
  );
}
