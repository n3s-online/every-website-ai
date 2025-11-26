import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { createHash } from "crypto";
import { env } from "./env";

// S3 key limit is 1024 chars. With "websites/" prefix and ".html" suffix (14 chars),
// we can safely store slugs up to ~900 chars directly. Beyond that, we hash.
const MAX_SLUG_LENGTH_FOR_DIRECT_KEY = 900;

/**
 * Generate a SHA-256 hash of a slug for use as S3 key
 */
function hashSlug(slug: string): string {
  return createHash("sha256").update(slug).digest("hex");
}

/**
 * Get the S3 key for a slug, hashing if necessary
 * Returns { key, isHashed } to indicate if the key is a hash
 */
function getS3Key(slug: string): { key: string; isHashed: boolean } {
  if (slug.length <= MAX_SLUG_LENGTH_FOR_DIRECT_KEY) {
    return { key: `websites/${slug}.html`, isHashed: false };
  }
  const hash = hashSlug(slug);
  return { key: `websites/hashed/${hash}.html`, isHashed: true };
}

// Initialize S3 client
const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Upload HTML content to S3
 * For long slugs (>900 chars), stores a hashed key with original slug in metadata
 */
export async function uploadHtmlToS3(
  slug: string,
  htmlContent: string
): Promise<string> {
  const { key, isHashed } = getS3Key(slug);

  // Determine content type based on content
  const isInappropriate =
    htmlContent.trim() === "INAPPROPRIATE_PROMPT_DETECTED";
  const contentType = isInappropriate ? "text/plain" : "text/html";

  // Build metadata - always store the original slug for recovery
  // S3 metadata values have a 2KB limit, so we truncate if needed (very rare edge case)
  const metadata: Record<string, string> = {
    inappropriate: isInappropriate ? "true" : "false",
    "original-slug": slug.length <= 2000 ? slug : slug.substring(0, 2000),
  };

  if (isHashed) {
    metadata["is-hashed"] = "true";
    // Store full slug length so we know if it was truncated
    metadata["original-slug-length"] = String(slug.length);
  }

  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: htmlContent,
    ContentType: contentType,
    CacheControl: "max-age=3600", // Cache for 1 hour
    Metadata: metadata,
  });

  try {
    await s3Client.send(command);
    return key;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload HTML to S3");
  }
}

/**
 * Fetch HTML content from S3
 * Handles both direct and hashed slug keys
 */
export async function fetchHtmlFromS3(slug: string): Promise<string | null> {
  const { key } = getS3Key(slug);

  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: key,
  });

  try {
    const response = await s3Client.send(command);
    if (response.Body) {
      return await response.Body.transformToString();
    }
    return null;
  } catch (error) {
    // If file doesn't exist, return null instead of throwing
    if ((error as { name?: string })?.name === "NoSuchKey") {
      return null;
    }
    console.error("Error fetching from S3:", error);
    throw new Error("Failed to fetch HTML from S3");
  }
}

/**
 * Check if HTML exists in S3
 */
export async function htmlExistsInS3(slug: string): Promise<boolean> {
  try {
    const html = await fetchHtmlFromS3(slug);
    return html !== null;
  } catch {
    return false;
  }
}

export interface RecentPage {
  slug: string;
  lastModified: Date;
  title: string;
}

/**
 * Get the most recently generated pages from S3
 * Note: Excludes hashed entries (slugs >900 chars) as they're edge cases
 */
export async function getRecentPages(limit: number = 5): Promise<RecentPage[]> {
  const command = new ListObjectsV2Command({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Prefix: "websites/",
    MaxKeys: 50, // Get more than we need to filter out inappropriate content
  });

  try {
    const response = await s3Client.send(command);

    if (!response.Contents) {
      return [];
    }

    // Filter and sort pages
    const pages = response.Contents.filter((object) => {
      // Filter out inappropriate content, hashed entries, and ensure we have valid objects
      return (
        object.Key &&
        object.Key.endsWith(".html") &&
        !object.Key.startsWith("websites/hashed/") && // Exclude hashed long slugs
        object.LastModified &&
        object.Size &&
        object.Size > 100 // Filter out very small files (likely inappropriate content)
      );
    })
      .sort((a, b) => {
        // Sort by last modified date, newest first
        const dateA = a.LastModified?.getTime() || 0;
        const dateB = b.LastModified?.getTime() || 0;
        return dateB - dateA;
      })
      .slice(0, limit)
      .map((object) => {
        const slug = object.Key!.replace("websites/", "").replace(".html", "");
        const title = slug
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());

        return {
          slug,
          lastModified: object.LastModified!,
          title,
        };
      });

    return pages;
  } catch (error) {
    console.error("Error fetching recent pages from S3:", error);
    return [];
  }
}
