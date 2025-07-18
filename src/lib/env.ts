import { z } from "zod";

const envSchema = z.object({
  // AWS S3 Configuration
  AWS_ACCESS_KEY_ID: z.string().min(1, "AWS_ACCESS_KEY_ID is required"),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, "AWS_SECRET_ACCESS_KEY is required"),
  AWS_REGION: z.string().min(1, "AWS_REGION is required"),
  AWS_S3_BUCKET_NAME: z.string().min(1, "AWS_S3_BUCKET_NAME is required"),

  // Anthropic Claude Configuration
  ANTHROPIC_API_KEY: z.string().min(1, "ANTHROPIC_API_KEY is required"),

  // Next.js Environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

// Validate environment variables
const parseEnv = () => {
  // Skip validation during build time if we're not in a runtime environment
  if (typeof window === "undefined" && !process.env.ANTHROPIC_API_KEY) {
    console.warn("Environment variables not available during build time");
    return {} as z.infer<typeof envSchema>;
  }

  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((err) => err.path.join("."))
        .join(", ");
      throw new Error(
        `Missing or invalid environment variables: ${missingVars}`
      );
    }
    throw error;
  }
};

export const env = parseEnv();
