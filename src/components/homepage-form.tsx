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
      <div className="bg-white border-4 border-black shadow-brutal-lg p-6 sm:p-8 lg:p-10">
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div>
            <label
              htmlFor="webpage-input"
              className="block text-lg sm:text-xl font-black uppercase text-black mb-4 tracking-tight"
            >
              Try it now - enter your prompt:
            </label>
            <div className="flex items-center border-4 border-black focus-within:shadow-brutal transition-all bg-white">
              <span className="pl-4 pr-2 text-black font-mono font-bold text-sm sm:text-base whitespace-nowrap">
                everywebsite.app/
              </span>
              <input
                id="webpage-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.replace(/\s+/g, "-"))}
                placeholder="calculator"
                className="flex-1 pr-4 py-4 text-sm sm:text-lg border-0 outline-none font-mono font-bold bg-transparent text-black placeholder:text-gray-400"
                disabled={isLoading}
                autoComplete="off"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-4 text-lg sm:text-xl"
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? "Generating..." : "Generate Webpage"}
          </Button>
        </form>
      </div>

      {/* Examples */}
      <div className="text-center">
        <p className="text-black font-bold mb-4 text-base sm:text-lg uppercase">
          Try these examples:
        </p>
        <div className="flex flex-wrap gap-3 justify-center px-2">
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => setInput(example)}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white border-2 border-black shadow-brutal-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all font-mono font-bold break-all uppercase"
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
