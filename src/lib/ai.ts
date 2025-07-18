import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { env } from "./env";

// Initialize Anthropic with API key
const anthropic = createAnthropic({
  apiKey: env.ANTHROPIC_API_KEY,
});

const MAX_TOKENS = 4000;

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
7. Make it desktop and mobile-responsive
8. Include interactive elements where appropriate (buttons, forms, etc.)
9. Add proper accessibility attributes (alt text, ARIA labels, etc.)
10. Use modern CSS features like CSS Grid, Flexbox, custom properties (CSS variables)
11. You must include a subtle advert to https://dothistask.ai (logo is https://www.dothistask.ai/icon.png)
  - The copy for this advert must be specific to the use-case for this page + the purpose of dothistask.ai (help knowledge workers find AI solutions for their jobs)
  - The advert must link to https://dothistask.ai
12. You have no backend and cannot implement any features that require a backend (database, APIs, AI, etc.) You need to generate the webpage with this in mind
13. Do not include a footer, copyright, etc.. Just a functional webpage
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
- Limit the output to ${MAX_TOKENS} tokens

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
      
      The purpose "${slug}" should guide the content, design, and functionality of the webpage.`,
      maxTokens: MAX_TOKENS,
      temperature: 0.7,
    });

    return text;
  } catch (error) {
    console.error("Error generating webpage with Claude:", error);
    throw new Error("Failed to generate webpage content");
  }
}
