"use client";

import { useStats } from "@/hooks/use-stats";

export default function DailyPagesCounter() {
  const { data: stats, isLoading, isError } = useStats();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    );
  }

  if (isError || !stats) {
    return null;
  }

  const percentage = (stats.pagesGeneratedToday / stats.dailyLimit) * 100;
  const isNearLimit = percentage >= 80;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-600">
          Daily Pages Generated
        </h3>
        {isNearLimit && (
          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
            Near Limit
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-bold text-gray-900">
          {stats.pagesGeneratedToday}
        </span>
        <span className="text-sm text-gray-500">
          / {stats.dailyLimit}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            isNearLimit
              ? "bg-amber-500"
              : "bg-gradient-to-r from-blue-500 to-indigo-500"
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>

      <p className="text-xs text-gray-500">
        {stats.remainingPages} pages remaining today
      </p>
    </div>
  );
}
