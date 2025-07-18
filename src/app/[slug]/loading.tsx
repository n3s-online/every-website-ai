export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6 p-8">
        {/* Animated spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-400 rounded-full animate-spin mx-auto"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Generating your page now...
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Our AI is crafting a custom webpage just for you. This usually takes
            a few seconds.
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex space-x-2 justify-center">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
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
