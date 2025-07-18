import { generateWebpageHtml } from "@/lib/ai";
import { fetchHtmlFromS3, uploadHtmlToS3 } from "@/lib/s3";
import { checkRateLimit } from "@/lib/redis";
import { getUserIP } from "@/lib/ip";
import { notFound } from "next/navigation";
import InappropriateContent from "@/components/inappropriate-content";
import RateLimitExceeded from "@/components/rate-limit-exceeded";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;

  // Validate slug (basic sanitization)
  if (!slug || slug.length > 100 || !/^[a-zA-Z0-9\-_\s]+$/.test(slug)) {
    notFound();
  }

  let htmlContent: string;

  try {
    // First, try to fetch existing HTML from S3
    const existingHtml = await fetchHtmlFromS3(slug);

    if (existingHtml) {
      htmlContent = existingHtml;
    } else {
      // Check rate limits before generating new content
      const userIP = await getUserIP();
      const rateLimitResult = await checkRateLimit(userIP);

      if (!rateLimitResult.allowed) {
        // Rate limit exceeded, show appropriate message
        return (
          <RateLimitExceeded
            type={rateLimitResult.reason === "user_limit" ? "user" : "global"}
            resetTime={
              rateLimitResult.reason === "user_limit"
                ? rateLimitResult.userResetTime
                : rateLimitResult.globalResetTime
            }
          />
        );
      }

      // Generate new HTML using AI
      console.log(`Generating new webpage for slug: ${slug} (User: ${userIP})`);
      htmlContent = await generateWebpageHtml(slug);

      // Upload to S3 for caching (including inappropriate content responses)
      try {
        await uploadHtmlToS3(slug, htmlContent);
        console.log(`Successfully cached webpage for slug: ${slug}`);
      } catch (uploadError) {
        console.error("Failed to cache webpage to S3:", uploadError);
        // Continue anyway, we have the HTML content
      }
    }
  } catch (error) {
    console.error("Error processing webpage:", error);
    throw new Error("Failed to generate webpage. Please try again later.");
  }

  // Check if the content is inappropriate
  if (htmlContent.trim() === "INAPPROPRIATE_PROMPT_DETECTED") {
    return <InappropriateContent />;
  }

  // Return the HTML content directly
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  return {
    title: `${slug
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())} | Every Website AI`,
    description: `AI-generated webpage for: ${slug}`,
  };
}
