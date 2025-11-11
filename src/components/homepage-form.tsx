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
      <div className="bg-card clay-shadow clay-rounded-lg p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label
              htmlFor="webpage-input"
              className="block text-base sm:text-lg font-semibold text-foreground mb-3"
            >
              Try it now - enter your prompt:
            </label>
            <div className="flex items-center clay-inset bg-input clay-rounded-md focus-within:ring-4 focus-within:ring-ring/20 transition-all">
              <span className="pl-4 pr-1 text-muted-foreground font-mono text-sm sm:text-base whitespace-nowrap">
                everywebsite.ai/
              </span>
              <input
                id="webpage-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.replace(/\s+/g, "-"))}
                placeholder="calculator"
                className="flex-1 pr-4 py-3 text-sm sm:text-lg border-0 outline-none font-mono bg-transparent text-foreground placeholder:text-muted-foreground"
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
        <p className="text-muted-foreground mb-4 text-sm sm:text-base font-medium">
          Try these example URLs:
        </p>
        <div className="flex flex-wrap gap-2 justify-center px-2">
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => setInput(example)}
              className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm bg-clay-mint/60 hover:bg-clay-mint clay-shadow-sm hover:clay-shadow hover:scale-[1.02] active:scale-[0.98] clay-rounded-sm transition-all duration-200 font-mono break-all text-foreground font-medium disabled:opacity-50"
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
