"use client";

import { useState } from "react";
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

export default function Component() {
  const [code, setCode] = useState(`class Solution {
    public:
        vector<int> twoSum(vector<int>& nums, int target) {
            // Your code here
        }
};`);

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
              <h1 className="text-xl font-bold mb-4">1. Two Sum</h1>
              <div className="space-y-4">
                <div className="prose prose-invert">
                  <p>
                    Given an array of integers nums and an integer target,
                    return indices of the two numbers such that they add up to
                    target.
                  </p>
                  <p>
                    You may assume that each input would have exactly one
                    solution, and you may not use the same element twice.
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Example 1:</h3>
                  <pre className="text-sm">
                    Input: nums = [2,7,11,15], target = 9{"\n"}
                    Output: [0,1]{"\n"}
                    Explanation: Because nums[0] + nums[1] == 9, we return [0,
                    1].
                  </pre>
                </div>
              </div>
            </div>
          </Card>
        </Resizable>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-gray-700 p-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <select className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm">
                <option>C++</option>
                <option>Python</option>
                <option>Java</option>
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
        </div>
      </div>
    </div>
  );
}
