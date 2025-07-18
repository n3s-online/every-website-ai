import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { env } from "./env";

// Initialize Anthropic with API key
const anthropic = createAnthropic({
  apiKey: env.ANTHROPIC_API_KEY,
});

/**
 * Enhanced system prompt for generating complete webpages
 */
const SYSTEM_PROMPT = `You are an expert web developer and designer. Your task is to generate a complete, modern, and visually appealing HTML webpage based on the given purpose/description.

REQUIREMENTS:
1. Generate a complete HTML5 document with proper DOCTYPE, head, and body sections
2. Include responsive design using modern CSS (flexbox/grid)
3. Use semantic HTML elements (header, main, section, article, footer, etc.)
4. Include proper meta tags for SEO and viewport
5. Add attractive styling with CSS (embedded in <style> tags in the head)
6. Use modern color schemes and typography
7. Make it mobile-responsive
8. Include interactive elements where appropriate (buttons, forms, etc.)
9. Add proper accessibility attributes (alt text, ARIA labels, etc.)
10. Use modern CSS features like CSS Grid, Flexbox, custom properties (CSS variables)

STYLE GUIDELINES:
- Use a modern, clean design aesthetic
- Implement a cohesive color palette
- Use proper typography hierarchy
- Add subtle animations/transitions for better UX
- Ensure good contrast ratios for accessibility
- Use modern CSS techniques (no inline styles except for the main <style> tag)

OUTPUT FORMAT:
- Return ONLY the complete HTML document
- No markdown code blocks or explanations
- Start with <!DOCTYPE html> and end with </html>
- Ensure the HTML is valid and well-formatted

The webpage should be production-ready and look professional.`;

/**
 * Generate HTML content using Claude Sonnet 4
 */
export async function generateWebpageHtml(slug: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      system: SYSTEM_PROMPT,
      prompt: `Generate a complete HTML webpage that solves this purpose: "${slug}"
      
      Make sure the webpage is:
      - Fully functional and complete
      - Visually appealing and modern
      - Responsive across all devices
      - Accessible and SEO-friendly
      - Professional and production-ready
      
      The slug "${slug}" should guide the content, design, and functionality of the webpage.`,
      maxTokens: 4000,
      temperature: 0.7,
    });

    return text;
  } catch (error) {
    console.error("Error generating webpage with Claude:", error);
    throw new Error("Failed to generate webpage content");
  }
}
