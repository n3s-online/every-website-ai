"use client";

import { Button } from "@/components/ui/button";

export default function InappropriateContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-400 p-8">
      <div className="text-center space-y-8 max-w-2xl w-full">
        {/* Warning icon */}
        <div className="w-24 h-24 mx-auto bg-yellow-300 border-4 border-black shadow-brutal-lg flex items-center justify-center">
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

        {/* Warning message card */}
        <div className="bg-white border-4 border-black shadow-brutal-lg p-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-black tracking-tight">
            Content Not Available
          </h1>
          <p className="text-lg font-bold text-black">
            This request cannot be processed as it may contain inappropriate
            content or violates our content policy.
          </p>
        </div>

        {/* Guidelines card */}
        <div className="bg-white border-4 border-black shadow-brutal p-6 text-left">
          <h3 className="font-black uppercase text-black mb-4 text-lg">
            Please try requests for:
          </h3>
          <ul className="text-base font-bold text-black space-y-2">
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-black border-2 border-black flex-shrink-0"></span>
              Business websites
            </li>
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-black border-2 border-black flex-shrink-0"></span>
              Portfolio pages
            </li>
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-black border-2 border-black flex-shrink-0"></span>
              Landing pages
            </li>
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-black border-2 border-black flex-shrink-0"></span>
              Educational content
            </li>
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-black border-2 border-black flex-shrink-0"></span>
              Creative projects
            </li>
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-black border-2 border-black flex-shrink-0"></span>
              Tools and utilities
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => (window.location.href = "/")}
              className="px-8"
            >
              Go Home
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="px-8"
            >
              Go Back
            </Button>
          </div>

          {/* Contact info card */}
          <div className="bg-white border-4 border-black shadow-brutal p-6">
            <p className="text-sm font-black uppercase text-black mb-4">
              Questions about our content policy?
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
