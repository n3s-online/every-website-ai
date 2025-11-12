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
    <div className="min-h-screen bg-yellow-300">
      {/* Header */}
      <header className="pt-8 sm:pt-12 pb-6 text-center border-b-4 border-black bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-black mb-6 tracking-tight">
            Every Website AI
          </h1>
          <p className="text-lg sm:text-xl font-bold text-black max-w-2xl mx-auto px-2 mb-8">
            Generate any webpage instantly with AI. Just change the URL to
            describe what you want.
          </p>
          <div className="mt-6 p-4 sm:p-6 bg-pink-400 border-4 border-black shadow-brutal max-w-xl mx-auto">
            <p className="text-white font-mono font-bold text-sm sm:text-base lg:text-lg break-all">
              everywebsite.app/
              <span className="bg-white text-black px-2 sm:px-3 py-1 border-2 border-black">
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
      <section className="py-12 sm:py-16 bg-white border-y-4 border-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-center text-black mb-12 sm:mb-16 tracking-tight">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center bg-blue-400 border-4 border-black shadow-brutal p-6">
              <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-black text-2xl">1</span>
              </div>
              <h3 className="font-black uppercase text-white mb-3 text-lg sm:text-xl tracking-tight">
                Change the URL
              </h3>
              <p className="text-white font-bold text-sm sm:text-base px-2">
                Add your prompt to the URL: everywebsite.app/your-idea
              </p>
            </div>
            <div className="text-center bg-pink-400 border-4 border-black shadow-brutal p-6">
              <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-black text-2xl">2</span>
              </div>
              <h3 className="font-black uppercase text-white mb-3 text-lg sm:text-xl tracking-tight">
                AI Generates
              </h3>
              <p className="text-white font-bold text-sm sm:text-base px-2">
                Our AI instantly creates a complete, responsive webpage
              </p>
            </div>
            <div className="text-center bg-green-400 border-4 border-black shadow-brutal p-6 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-black text-2xl">3</span>
              </div>
              <h3 className="font-black uppercase text-white mb-3 text-lg sm:text-xl tracking-tight">
                That&apos;s it!
              </h3>
              <p className="text-white font-bold text-sm sm:text-base px-2">
                Your custom webpage is ready to use and share
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Creator */}
      <SupportCreator />

      {/* Footer */}
      <footer className="py-8 sm:py-10 text-center bg-black text-white border-t-4 border-black px-4">
        <p className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 font-bold text-sm sm:text-base">
          <span>
            Powered by{" "}
            <a
              href="https://dothistask.ai"
              className="text-yellow-300 underline decoration-2 underline-offset-4 hover:text-yellow-400"
            >
              dothistask.ai
            </a>
          </span>
          <span className="hidden sm:inline text-yellow-300 mx-2">{"•"}</span>
          <a
            href="https://twitter.com/n3sonline"
            className="text-pink-400 underline decoration-2 underline-offset-4 hover:text-pink-500"
          >
            @n3sonline
          </a>
          <span className="hidden sm:inline text-yellow-300 mx-2">{"•"}</span>
          <span>
            built by{" "}
            <a
              href="https://willness.dev"
              className="text-blue-400 underline decoration-2 underline-offset-4 hover:text-blue-500"
            >
              willness.dev
            </a>
          </span>
        </p>
      </footer>
    </div>
  );
}
