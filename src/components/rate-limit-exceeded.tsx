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
    <div className="min-h-screen bg-red-400 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto bg-white border-4 border-black shadow-brutal-lg flex items-center justify-center">
          {isUserLimit ? (
            <Clock className="w-14 h-14 text-black stroke-[3]" />
          ) : (
            <Globe className="w-14 h-14 text-black stroke-[3]" />
          )}
        </div>

        {/* Main Card */}
        <div className="bg-white border-4 border-black shadow-brutal-lg p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-black mb-4 tracking-tight">
              {isUserLimit ? "Slow down there!" : "Server busy!"}
            </h1>

            <p className="text-xl font-bold text-black">
              {isUserLimit
                ? "You're generating pages too quickly. Take a breather!"
                : "Too many people are generating pages right now."}
            </p>
          </div>

          {/* Rate Limit Details */}
          <div className="bg-yellow-300 border-4 border-black shadow-brutal p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-black uppercase text-black mb-2 text-lg">
                  {isUserLimit ? "Personal Rate Limit" : "Global Rate Limit"}
                </h3>
                <p className="font-bold text-black text-sm">
                  {isUserLimit
                    ? "You can generate 3 pages per hour"
                    : "We allow 100 new pages per day across all users"}
                </p>
              </div>
              <div className="bg-white border-4 border-black shadow-brutal px-6 py-4 text-center">
                <p className="text-black font-black uppercase text-sm mb-1">Reset in:</p>
                <p className="text-black text-2xl font-black font-mono">
                  {formatResetTime(resetTime)}
                </p>
              </div>
            </div>
          </div>

          {/* What you can do */}
          <div className="mb-8">
            <h3 className="font-black uppercase text-black mb-4 text-lg">
              What you can do:
            </h3>
            <ul className="space-y-3 font-bold text-black">
              <li className="flex items-start">
                <span className="w-3 h-3 bg-black border-2 border-black mt-1.5 mr-3 flex-shrink-0"></span>
                Browse existing pages - no limits on viewing!
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 bg-black border-2 border-black mt-1.5 mr-3 flex-shrink-0"></span>
                {isUserLimit
                  ? "Wait for your rate limit to reset"
                  : "Try again later when traffic is lower"}
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 bg-black border-2 border-black mt-1.5 mr-3 flex-shrink-0"></span>
                Check out our other projects while you wait
              </li>
            </ul>
          </div>

          {/* Call to Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                asChild
                className="w-full"
              >
                <a
                  href="https://dothistask.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-5 h-5 stroke-[3]" />
                  Check out DoThisTaskAI
                </a>
              </Button>

              <Button
                asChild
                variant="secondary"
                className="w-full"
              >
                <a
                  href="https://x.com/N3SOnline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5 stroke-[3]" />
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
          <div className="mt-8 pt-8 border-t-4 border-black text-center">
            <p className="text-sm font-black uppercase text-black">
              Rate limits help us keep the service free and fast for everyone.
              Thanks for understanding!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
