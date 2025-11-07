import { useQuery } from "@tanstack/react-query";

export interface StatsData {
  pagesGeneratedToday: number;
  dailyLimit: number;
  remainingPages: number;
  resetTime: number | null;
}

async function fetchStats(): Promise<StatsData> {
  const response = await fetch("/api/stats");

  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }

  return response.json();
}

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 25000, // Consider data stale after 25 seconds
    retry: 2,
  });
}
