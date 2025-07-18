import { Button } from "@/components/ui/button";
import { Clock, Globe, X, ExternalLink } from "lucide-react";
import Link from "next/link";

interface RateLimitExceededProps {
  type: "user" | "global";
  resetTime?: number;
}

export default function RateLimitExceeded({
  type,
  resetTime,
}: RateLimitExceededProps) {
  const formatResetTime = (timestamp?: number) => {
    if (!timestamp) return "soon";

    const now = Math.floor(Date.now() / 1000);
    const diff = timestamp - now;

    if (diff <= 0) return "now";

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const isUserLimit = type === "user";

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
          {/* Icon and Title */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              {isUserLimit ? (
                <Clock className="w-8 h-8 text-red-600" />
              ) : (
                <Globe className="w-8 h-8 text-red-600" />
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isUserLimit ? "Slow down there!" : "Server busy!"}
            </h1>

            <p className="text-lg text-gray-600">
              {isUserLimit
                ? "You're generating pages too quickly. Take a breather!"
                : "Too many people are generating pages right now."}
            </p>
          </div>

          {/* Rate Limit Details */}
          <div className="bg-red-50 rounded-lg p-6 mb-8 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-red-800 mb-1">
                  {isUserLimit ? "Personal Rate Limit" : "Global Rate Limit"}
                </h3>
                <p className="text-red-700 text-sm">
                  {isUserLimit
                    ? "You can generate 3 pages per hour"
                    : "We allow 100 new pages per day across all users"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-red-800 font-semibold">Reset in:</p>
                <p className="text-red-600 text-lg font-mono">
                  {formatResetTime(resetTime)}
                </p>
              </div>
            </div>
          </div>

          {/* What you can do */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-800 mb-4">
              What you can do:
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Browse existing pages - no limits on viewing!
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {isUserLimit
                  ? "Wait for your rate limit to reset"
                  : "Try again later when traffic is lower"}
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Check out our other projects while you wait
              </li>
            </ul>
          </div>

          {/* Call to Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                asChild
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <a
                  href="https://dothistask.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Check out DoThisTaskAI
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <a
                  href="https://x.com/N3SOnline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Follow on X
                </a>
              </Button>
            </div>

            <Button
              asChild
              variant="ghost"
              className="w-full text-gray-600 hover:text-gray-800"
            >
              <Link href="/" className="flex items-center justify-center gap-2">
                ← Back to Home
              </Link>
            </Button>
          </div>

          {/* Footer message */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Rate limits help us keep the service free and fast for everyone.
              Thanks for understanding! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
