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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-card clay-shadow clay-rounded-xl p-8">
          {/* Icon and Title */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-clay-coral clay-shadow-sm clay-rounded-md flex items-center justify-center mb-4">
              {isUserLimit ? (
                <Clock className="w-8 h-8 text-foreground" />
              ) : (
                <Globe className="w-8 h-8 text-foreground" />
              )}
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isUserLimit ? "Slow down there!" : "Server busy!"}
            </h1>

            <p className="text-lg text-muted-foreground font-medium">
              {isUserLimit
                ? "You're generating pages too quickly. Take a breather!"
                : "Too many people are generating pages right now."}
            </p>
          </div>

          {/* Rate Limit Details */}
          <div className="bg-clay-coral/30 clay-shadow-sm clay-rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {isUserLimit ? "Personal Rate Limit" : "Global Rate Limit"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isUserLimit
                    ? "You can generate 3 pages per hour"
                    : "We allow 100 new pages per day across all users"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-foreground font-semibold">Reset in:</p>
                <p className="text-foreground text-lg font-mono bg-clay-peach clay-shadow-sm clay-rounded-sm px-3 py-1 inline-block">
                  {formatResetTime(resetTime)}
                </p>
              </div>
            </div>
          </div>

          {/* What you can do */}
          <div className="mb-8">
            <h3 className="font-semibold text-foreground mb-4">
              What you can do:
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="w-2.5 h-2.5 bg-clay-mint clay-shadow-sm clay-rounded-sm mt-1.5 mr-3 flex-shrink-0"></span>
                <span className="flex-1">Browse existing pages - no limits on viewing!</span>
              </li>
              <li className="flex items-start">
                <span className="w-2.5 h-2.5 bg-clay-lavender clay-shadow-sm clay-rounded-sm mt-1.5 mr-3 flex-shrink-0"></span>
                <span className="flex-1">
                  {isUserLimit
                    ? "Wait for your rate limit to reset"
                    : "Try again later when traffic is lower"}
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2.5 h-2.5 bg-clay-sky clay-shadow-sm clay-rounded-sm mt-1.5 mr-3 flex-shrink-0"></span>
                <span className="flex-1">Check out our other projects while you wait</span>
              </li>
            </ul>
          </div>

          {/* Call to Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                asChild
                variant="sky"
                className="w-full"
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
                className="w-full"
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
              className="w-full"
            >
              <Link href="/" className="flex items-center justify-center gap-2">
                ← Back to Home
              </Link>
            </Button>
          </div>

          {/* Footer message */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground font-medium">
              Rate limits help us keep the service free and fast for everyone.
              Thanks for understanding!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
