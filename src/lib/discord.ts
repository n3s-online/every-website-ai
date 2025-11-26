import { env } from "./env";

// Discord embed field values have a 1024 char limit
const MAX_SLUG_DISPLAY_LENGTH = 100;

/**
 * Truncate a slug for display in Discord embeds
 */
function truncateSlug(slug: string): string {
  if (slug.length <= MAX_SLUG_DISPLAY_LENGTH) {
    return slug;
  }
  return `${slug.substring(0, MAX_SLUG_DISPLAY_LENGTH)}...`;
}

export interface DiscordEmbed {
  title?: string;
  description?: string;
  color?: number;
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
  footer?: {
    text: string;
    icon_url?: string;
  };
  timestamp?: string;
  url?: string;
}

export interface DiscordMessage {
  content?: string;
  embeds?: DiscordEmbed[];
  username?: string;
  avatar_url?: string;
}

export class DiscordWebhook {
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = env.DISCORD_WEBHOOK_URL;
  }

  /**
   * Send a simple text message to Discord
   */
  async sendMessage(content: string): Promise<boolean> {
    return this.sendWebhook({ content });
  }

  /**
   * Send an embed message to Discord
   */
  async sendEmbed(embed: DiscordEmbed): Promise<boolean> {
    return this.sendWebhook({ embeds: [embed] });
  }

  /**
   * Send a custom Discord message with full control
   */
  async sendCustomMessage(message: DiscordMessage): Promise<boolean> {
    return this.sendWebhook(message);
  }

  /**
   * Send a notification when a page is generated
   */
  async notifyPageGenerated(slug: string, userIP: string): Promise<boolean> {
    const displaySlug = truncateSlug(slug);
    const embed: DiscordEmbed = {
      title: "🚀 New Page Generated",
      description: `A new webpage has been generated!${slug.length > MAX_SLUG_DISPLAY_LENGTH ? ` (slug: ${slug.length} chars)` : ""}`,
      color: 0x00ff00, // Green
      fields: [
        {
          name: "📄 Page",
          value: `\`${displaySlug}\``,
          inline: true,
        },
        {
          name: "🌐 URL",
          value: `[everywebsite.app/${displaySlug}](https://everywebsite.app/${encodeURIComponent(slug)})`,
          inline: true,
        },
        {
          name: "📍 IP",
          value: `\`${userIP}\``,
          inline: true,
        },
      ],
      footer: {
        text: "Every Website AI",
      },
      timestamp: new Date().toISOString(),
    };

    return this.sendEmbed(embed);
  }

  /**
   * Send a notification when a page is loaded from cache
   */
  async notifyPageLoaded(slug: string, userIP: string): Promise<boolean> {
    const displaySlug = truncateSlug(slug);
    const embed: DiscordEmbed = {
      title: "📖 Page Loaded",
      description: `An existing webpage was loaded from cache.${slug.length > MAX_SLUG_DISPLAY_LENGTH ? ` (slug: ${slug.length} chars)` : ""}`,
      color: 0x0099ff, // Blue
      fields: [
        {
          name: "📄 Page",
          value: `\`${displaySlug}\``,
          inline: true,
        },
        {
          name: "🌐 URL",
          value: `[everywebsite.app/${displaySlug}](https://everywebsite.app/${encodeURIComponent(slug)})`,
          inline: true,
        },
        {
          name: "📍 IP",
          value: `\`${userIP}\``,
          inline: true,
        },
      ],
      footer: {
        text: "Every Website AI",
      },
      timestamp: new Date().toISOString(),
    };

    return this.sendEmbed(embed);
  }

  /**
   * Send a notification when an error occurs
   */
  async notifyError(
    slug: string,
    userIP: string,
    error: string
  ): Promise<boolean> {
    const displaySlug = truncateSlug(slug);
    const embed: DiscordEmbed = {
      title: "❌ Error Occurred",
      description: `An error occurred while processing a request.${slug.length > MAX_SLUG_DISPLAY_LENGTH ? ` (slug: ${slug.length} chars)` : ""}`,
      color: 0xff0000, // Red
      fields: [
        {
          name: "📄 Page",
          value: `\`${displaySlug}\``,
          inline: true,
        },
        {
          name: "📍 IP",
          value: `\`${userIP}\``,
          inline: true,
        },
        {
          name: "🐛 Error",
          value: `\`\`\`${error.substring(0, 1000)}\`\`\``,
          inline: false,
        },
      ],
      footer: {
        text: "Every Website AI",
      },
      timestamp: new Date().toISOString(),
    };

    return this.sendEmbed(embed);
  }

  /**
   * Internal method to send webhook request
   */
  private async sendWebhook(message: DiscordMessage): Promise<boolean> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        console.error(
          `Discord webhook failed: ${response.status} ${response.statusText}`
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error("Discord webhook error:", error);
      return false;
    }
  }
}

// Export a singleton instance
export const discord = new DiscordWebhook();
