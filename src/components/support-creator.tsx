import { X, Heart, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportCreator() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-purple-600" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Love Every Website AI?
          </h2>
          
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            This tool is completely free to use! If you&apos;re finding it helpful, 
            consider supporting the creator by following on X (Twitter).
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">Free to Use</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">∞</div>
              <div className="text-sm text-gray-600">Unlimited Pages*</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">AI</div>
              <div className="text-sm text-gray-600">Powered</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <Button
              asChild
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg font-semibold"
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
            
            <p className="text-sm text-gray-500">
              Get updates on new features and other cool projects!
            </p>
          </div>

          {/* Secondary CTA */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              Want to support in other ways?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
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
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
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
          <div className="mt-6 text-xs text-gray-500">
            <p>* Subject to fair usage limits to keep the service free for everyone</p>
          </div>
        </div>
      </div>
    </section>
  );
}
