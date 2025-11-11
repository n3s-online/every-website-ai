export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-8 p-8">
        {/* Clay animated spinner - three puffy dots rotating */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center animate-spin" style={{ animationDuration: "2s" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-clay-peach clay-shadow clay-rounded-md animate-pulse"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center animate-spin" style={{ animationDuration: "2s", animationDelay: "0.33s" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-clay-mint clay-shadow clay-rounded-md animate-pulse"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center animate-spin" style={{ animationDuration: "2s", animationDelay: "0.66s" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-clay-lavender clay-shadow clay-rounded-md animate-pulse"></div>
          </div>
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-clay-sky clay-shadow clay-rounded-md"></div>
          </div>
        </div>

        {/* Loading text in a clay card */}
        <div className="bg-card clay-shadow clay-rounded-lg p-6 max-w-md mx-auto space-y-3">
          <h1 className="text-2xl font-bold text-foreground">
            Generating your page now...
          </h1>
          <p className="text-muted-foreground">
            Our AI is crafting a custom webpage just for you. This usually takes
            a few seconds.
          </p>
        </div>

        {/* Clay progress dots - bouncing with clay style */}
        <div className="flex space-x-3 justify-center">
          <div className="w-4 h-4 bg-clay-peach clay-shadow-sm clay-rounded-sm animate-bounce"></div>
          <div
            className="w-4 h-4 bg-clay-mint clay-shadow-sm clay-rounded-sm animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-4 h-4 bg-clay-lavender clay-shadow-sm clay-rounded-sm animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-4 h-4 bg-clay-coral clay-shadow-sm clay-rounded-sm animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>

        {/* Powered by notice */}
        <div className="mt-8 text-xs text-muted-foreground">
          Powered by{" "}
          <a href="https://dothistask.ai" className="underline hover:text-foreground transition-colors">
            dothistask.ai
          </a>
        </div>
      </div>
    </div>
  );
}
