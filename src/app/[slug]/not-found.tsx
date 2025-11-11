"use client";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">
      <div className="text-center space-y-6 max-w-md bg-card clay-shadow clay-rounded-lg p-8">
        {/* 404 icon - clay lavender for info */}
        <div className="w-16 h-16 mx-auto bg-clay-lavender clay-shadow-sm clay-rounded-md flex items-center justify-center">
          <svg
            className="w-8 h-8 text-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

        {/* Error message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or the slug
            contains invalid characters.
          </p>
          <p className="text-sm text-muted-foreground bg-clay-sky/30 px-3 py-2 clay-rounded-sm clay-shadow-sm inline-block">
            Try using only letters, numbers, hyphens, and underscores.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => (window.location.href = "/")}
              className="px-6"
            >
              Go Home
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="px-6"
            >
              Go Back
            </Button>
          </div>

          {/* Contact info */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">Need help? Reach out:</p>
            <a
              href="https://twitter.com/n3sonline"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors bg-clay-sky/50 px-4 py-2 clay-rounded-sm clay-shadow-sm hover:clay-shadow"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Tweet @n3sonline
            </a>
          </div>
        </div>

        {/* Powered by notice */}
        <div className="mt-8 text-xs text-muted-foreground">
          Powered by{" "}
          <a href="https://dothistask.ai" className="underline hover:text-foreground transition-colors">
            dothistask.ai
          </a>
        </div>
      </div>
    </div>
  );
}
