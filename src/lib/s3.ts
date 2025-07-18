import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { env } from "./env";

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
 */
export async function uploadHtmlToS3(
  slug: string,
  htmlContent: string
): Promise<string> {
  const key = `websites/${slug}.html`;

  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: htmlContent,
    ContentType: "text/html",
    CacheControl: "max-age=3600", // Cache for 1 hour
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
 */
export async function fetchHtmlFromS3(slug: string): Promise<string | null> {
  const key = `websites/${slug}.html`;

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
