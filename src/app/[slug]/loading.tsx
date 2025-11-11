export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-300">
      <div className="text-center space-y-8 p-8 max-w-2xl">
        {/* Animated geometric loader */}
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 border-8 border-black bg-white shadow-brutal-lg animate-spin"></div>
          <div className="absolute w-16 h-16 bg-pink-400 border-4 border-black"></div>
        </div>

        {/* Loading card */}
        <div className="bg-white border-4 border-black shadow-brutal-lg p-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-black tracking-tight">
            Generating your page now...
          </h1>
          <p className="text-lg font-bold text-black max-w-md mx-auto">
            Our AI is crafting a custom webpage just for you. This usually takes
            a few seconds.
          </p>
        </div>

        {/* Progress blocks - more geometric than dots */}
        <div className="flex space-x-3 justify-center">
          <div className="w-4 h-4 bg-black border-2 border-black animate-bounce"></div>
          <div
            className="w-4 h-4 bg-black border-2 border-black animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-4 h-4 bg-black border-2 border-black animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        {/* Powered by notice */}
        <div className="mt-8 bg-black border-4 border-black shadow-brutal px-6 py-3 inline-block">
          <p className="text-sm font-bold text-yellow-300 uppercase">
            Powered by{" "}
            <a href="https://dothistask.ai" className="underline hover:text-pink-400 transition-colors">
              dothistask.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
