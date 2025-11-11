import { X, Heart, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportCreator() {
  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-card clay-shadow clay-rounded-xl p-6 sm:p-8 lg:p-10">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-clay-lavender clay-shadow-sm clay-rounded-md flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-foreground" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Love Every Website AI?
          </h2>

          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto font-medium">
            This tool is completely free to use! If you&apos;re finding it helpful,
            consider supporting the creator by following on X (Twitter).
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-clay-peach clay-shadow clay-rounded-lg p-4 transition-all duration-200 hover:clay-shadow-hover hover:-translate-y-0.5">
              <div className="text-2xl font-bold text-foreground mb-1">100%</div>
              <div className="text-sm text-muted-foreground font-medium">Free to Use</div>
            </div>
            <div className="bg-clay-mint clay-shadow clay-rounded-lg p-4 transition-all duration-200 hover:clay-shadow-hover hover:-translate-y-0.5">
              <div className="text-2xl font-bold text-foreground mb-1">∞</div>
              <div className="text-sm text-muted-foreground font-medium">Unlimited Pages*</div>
            </div>
            <div className="bg-clay-sky clay-shadow clay-rounded-lg p-4 transition-all duration-200 hover:clay-shadow-hover hover:-translate-y-0.5">
              <div className="text-2xl font-bold text-foreground mb-1">AI</div>
              <div className="text-sm text-muted-foreground font-medium">Powered</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <Button
              asChild
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background px-8 py-3 text-lg font-semibold clay-shadow hover:clay-shadow-hover"
            >
              <a
                href="https://x.com/N3SOnline"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3"
              >
                <X className="w-5 h-5" />
                Follow @N3SOnline
              </a>
            </Button>

            <p className="text-sm text-muted-foreground font-medium">
              Get updates on new features and other cool projects!
            </p>
          </div>

          {/* Secondary CTA */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4 font-medium">
              Want to support in other ways?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                variant="secondary"
              >
                <a
                  href="https://dothistask.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Coffee className="w-4 h-4" />
                  Check out DoThisTask.ai
                </a>
              </Button>

              <Button
                asChild
                variant="accent"
              >
                <a
                  href="https://x.com/N3SOnline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Share this tool
                </a>
              </Button>
            </div>
          </div>

          {/* Fine print */}
          <div className="mt-6 text-xs text-muted-foreground">
            <p>* Subject to fair usage limits to keep the service free for everyone</p>
          </div>
        </div>
      </div>
    </section>
  );
}
