"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomepageForm() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    // Clean the input for URL usage
    const cleanInput = input
      .trim()
      .replace(/[^a-zA-Z0-9\s\-_]/g, "")
      .replace(/\s+/g, "-");
    router.push(`/${cleanInput}`);
  };

  const examples = [
    "calculator",
    "password-generator",
    "color-picker",
    "qr-code-generator",
    "unit-converter",
    "timer-stopwatch",
  ];

  return (
    <div className="max-w-2xl w-full space-y-6 sm:space-y-8">
      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label
              htmlFor="webpage-input"
              className="block text-base sm:text-lg font-semibold text-gray-800 mb-3"
            >
              Try it now - enter your prompt:
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
              <span className="pl-3 pr-1 text-gray-500 font-mono text-sm sm:text-base whitespace-nowrap">
                everywebsite.app/
              </span>
              <input
                id="webpage-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.replace(/\s+/g, "-"))}
                placeholder="calculator"
                className="flex-1 pr-4 py-3 text-sm sm:text-lg border-0 outline-none font-mono bg-transparent"
                disabled={isLoading}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-3 text-base sm:text-lg font-semibold"
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? "Generating..." : "Generate Webpage"}
          </Button>
        </form>
      </div>

      {/* Examples */}
      <div className="text-center">
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          Try these example URLs:
        </p>
        <div className="flex flex-wrap gap-2 justify-center px-2">
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => setInput(example)}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors font-mono break-all"
              disabled={isLoading}
            >
              /{example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
