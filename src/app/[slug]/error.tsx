"use client";

import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-400 p-8">
      <div className="text-center space-y-8 max-w-2xl w-full">
        {/* Error icon */}
        <div className="w-24 h-24 mx-auto bg-white border-4 border-black shadow-brutal-lg flex items-center justify-center">
          <svg
            className="w-14 h-14 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={3}
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Error message card */}
        <div className="bg-white border-4 border-black shadow-brutal-lg p-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-black tracking-tight">
            Oops! Something went wrong
          </h1>
          <p className="text-lg font-bold text-black">
            We couldn&apos;t generate your webpage right now. This might be a
            temporary issue.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} className="px-8">
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="px-8"
            >
              Go Home
            </Button>
          </div>

          {/* Contact info card */}
          <div className="bg-white border-4 border-black shadow-brutal p-6">
            <p className="text-sm font-black uppercase text-black mb-4">
              Still having issues? Come back later or reach out:
            </p>
            <a
              href="https://twitter.com/n3sonline"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 border-4 border-black shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all font-bold uppercase"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Tweet @n3sonline
            </a>
          </div>
        </div>

        {/* Powered by notice */}
        <div className="bg-black border-4 border-black shadow-brutal px-6 py-3 inline-block">
          <p className="text-sm font-bold text-yellow-300 uppercase">
            Powered by{" "}
            <a href="https://dothistask.ai" className="underline hover:text-pink-400 transition-colors">
              dothistask.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
