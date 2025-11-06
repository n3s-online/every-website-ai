import { getRecentPages } from "@/lib/s3";
import HomepageForm from "@/components/homepage-form";
import RecentPages from "@/components/recent-pages";
import SupportCreator from "@/components/support-creator";

// Revalidate every 10 minutes (600 seconds)
export const revalidate = 600;

export default async function Home() {
  // Fetch recent pages from S3
  const recentPages = await getRecentPages(12);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="pt-6 sm:pt-8 pb-4 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Every Website AI
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Generate any webpage instantly with AI. Just change the URL to
            describe what you want.
          </p>
          <div className="mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-xl mx-auto">
            <p className="text-blue-800 font-mono text-sm sm:text-base lg:text-lg break-all">
              everywebsite.app/
              <span className="bg-blue-200 px-1 sm:px-2 py-1 rounded">
                your-prompt-here
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <HomepageForm />
      </main>

      {/* Recent Pages */}
      <RecentPages pages={recentPages} />

      {/* How it works */}
      <section className="py-12 sm:py-16 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">
                Change the URL
              </h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">
                Add your prompt to the URL: everywebsite.app/your-idea
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">
                AI Generates
              </h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">
                Our AI instantly creates a complete, responsive webpage
              </p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">
                That&apos;s it!
              </h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">
                Your custom webpage is ready to use and share
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Creator */}
      <SupportCreator />

      {/* Footer */}
      <footer className="py-6 sm:py-8 text-center text-gray-500 text-xs sm:text-sm px-4">
        <p className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
          <span>
            Powered by{" "}
            <a
              href="https://dothistask.ai"
              className="underline hover:text-gray-700"
            >
              dothistask.ai
            </a>
          </span>
          <span className="hidden sm:inline">{" • "}</span>
          <a
            href="https://twitter.com/n3sonline"
            className="underline hover:text-gray-700"
          >
            @n3sonline
          </a>
        </p>
      </footer>
    </div>
  );
}
