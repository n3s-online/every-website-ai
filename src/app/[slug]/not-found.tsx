"use client";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400 p-8">
      <div className="text-center space-y-8 max-w-2xl w-full">
        {/* 404 number display */}
        <div className="bg-white border-4 border-black shadow-brutal-xl p-8">
          <h1 className="text-8xl sm:text-9xl font-black text-black tracking-tighter">404</h1>
        </div>

        {/* Error message card */}
        <div className="bg-white border-4 border-black shadow-brutal-lg p-8 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-black tracking-tight">
            Page Not Found
          </h2>
          <p className="text-lg font-bold text-black">
            The page you&apos;re looking for doesn&apos;t exist or the slug
            contains invalid characters.
          </p>
          <div className="bg-yellow-300 border-4 border-black shadow-brutal p-4 mt-4">
            <p className="text-sm font-black uppercase text-black">
              Try using only letters, numbers, hyphens, and underscores.
            </p>
          </div>
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
              Need help? Reach out:
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
