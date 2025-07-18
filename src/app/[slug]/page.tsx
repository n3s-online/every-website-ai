import { generateWebpageHtml } from "@/lib/ai";
import { fetchHtmlFromS3, uploadHtmlToS3 } from "@/lib/s3";
import { notFound } from "next/navigation";

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
      // Generate new HTML using AI
      console.log(`Generating new webpage for slug: ${slug}`);
      htmlContent = await generateWebpageHtml(slug);

      // Upload to S3 for caching
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
    notFound();
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
