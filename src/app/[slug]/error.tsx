"use client";

import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-8">
      <div className="text-center space-y-6 max-w-md">
        {/* Error icon */}
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Error message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600">
            We couldn't generate your webpage right now. This might be a temporary issue.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={reset} className="px-6">
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = "/"}
              className="px-6"
            >
              Go Home
            </Button>
          </div>

          {/* Contact info */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">
              Still having issues? Come back later or reach out:
            </p>
            <a
              href="https://twitter.com/n3sonline"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Tweet @n3sonline
            </a>
          </div>
        </div>

        {/* Powered by notice */}
        <div className="mt-8 text-xs text-gray-500">
          Powered by{" "}
          <a href="https://dothistask.ai" className="underline">
            dothistask.ai
          </a>
        </div>
      </div>
    </div>
  );
}
