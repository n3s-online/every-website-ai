import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="text-center space-y-6 max-w-md">
        {/* 404 icon */}
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-600"
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
          <h1 className="text-2xl font-bold text-gray-800">Page Not Found</h1>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or the slug contains invalid characters.
          </p>
          <p className="text-sm text-gray-500">
            Try using only letters, numbers, hyphens, and underscores.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => window.location.href = "/"} className="px-6">
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
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">
              Need help? Reach out:
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
