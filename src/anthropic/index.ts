import { Model } from "../api/types/Act";

/**
 * Model adapter for Anthropic.
 *
 * Supported models:
 * - claude-3-7-sonnet-20250219 (1x agent credit if no apiKey)
 * - claude-3-7-sonnet-20250219-thinking (1x agent credit if no apiKey)
 * - claude-3-5-sonnet-20241022 (1x agent credit if no apiKey)
 *
 * @param name - Anthropic model name @default "claude-3-7-sonnet-20250219"
 * @param apiKey - Your Anthropic API key
 * @returns A Model configuration object
 */
export function anthropic(options?: { name?: string; apiKey?: string }): Model {
    return {
        provider: "anthropic",
        name: options?.name ?? "claude-3-7-sonnet-20250219",
        apiKey: options?.apiKey,
    };
}
