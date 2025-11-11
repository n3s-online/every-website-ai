"use client";

import { Button } from "@/components/ui/button";

export default function InappropriateContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">
      <div className="text-center space-y-6 max-w-md bg-card clay-shadow clay-rounded-lg p-8">
        {/* Warning icon - clay coral for warning */}
        <div className="w-16 h-16 mx-auto bg-clay-coral clay-shadow-sm clay-rounded-md flex items-center justify-center">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Warning message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Content Not Available
          </h1>
          <p className="text-muted-foreground">
            This request cannot be processed as it may contain inappropriate
            content or violates our content policy.
          </p>
        </div>

        {/* Guidelines */}
        <div className="bg-clay-sky/30 clay-shadow-sm clay-rounded-md p-4 text-left">
          <h3 className="font-semibold text-foreground mb-2">
            Please try requests for:
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Business websites</li>
            <li>• Portfolio pages</li>
            <li>• Landing pages</li>
            <li>• Educational content</li>
            <li>• Creative projects</li>
            <li>• Tools and utilities</li>
          </ul>
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
            <p className="text-sm text-muted-foreground mb-3">
              Questions about our content policy?
            </p>
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
