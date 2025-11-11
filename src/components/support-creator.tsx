import { X, Heart, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportCreator() {
  return (
    <section className="py-12 sm:py-16 bg-pink-400 border-y-4 border-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-white border-4 border-black shadow-brutal-lg p-8 sm:p-10 lg:p-12">
          {/* Icon */}
          <div className="mx-auto w-20 h-20 bg-yellow-300 border-4 border-black shadow-brutal flex items-center justify-center mb-8">
            <Heart className="w-10 h-10 text-black fill-black stroke-[3]" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-black mb-6 tracking-tight">
            Love Every Website AI?
          </h2>

          <p className="text-lg sm:text-xl font-bold text-black mb-8 max-w-2xl mx-auto">
            This tool is completely free to use! If you&apos;re finding it helpful,
            consider supporting the creator by following on X (Twitter).
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
            <div className="bg-blue-400 border-4 border-black shadow-brutal p-6">
              <div className="text-3xl font-black text-white mb-2">100%</div>
              <div className="text-sm font-bold text-white uppercase">Free to Use</div>
            </div>
            <div className="bg-green-400 border-4 border-black shadow-brutal p-6">
              <div className="text-3xl font-black text-white mb-2">∞</div>
              <div className="text-sm font-bold text-white uppercase">Unlimited Pages*</div>
            </div>
            <div className="bg-pink-400 border-4 border-black shadow-brutal p-6">
              <div className="text-3xl font-black text-white mb-2">AI</div>
              <div className="text-sm font-bold text-white uppercase">Powered</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <Button
              asChild
              size="lg"
              className="bg-black text-white border-black hover:bg-gray-900 px-10 py-4 text-xl"
            >
              <a
                href="https://x.com/N3SOnline"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3"
              >
                <X className="w-6 h-6 stroke-[3]" />
                Follow @N3SOnline
              </a>
            </Button>

            <p className="text-sm font-bold text-black uppercase">
              Get updates on new features and other cool projects!
            </p>
          </div>

          {/* Secondary CTA */}
          <div className="mt-10 pt-8 border-t-4 border-black">
            <p className="text-base font-black text-black mb-6 uppercase">
              Want to support in other ways?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  <Coffee className="w-5 h-5 stroke-[3]" />
                  Check out DoThisTask.ai
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
              >
                <a
                  href="https://x.com/N3SOnline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5 stroke-[3]" />
                  Share this tool
                </a>
              </Button>
            </div>
          </div>

          {/* Fine print */}
          <div className="mt-8 text-xs font-bold text-black">
            <p>* SUBJECT TO FAIR USAGE LIMITS TO KEEP THE SERVICE FREE FOR EVERYONE</p>
          </div>
        </div>
      </div>
    </section>
  );
}
