import { Model } from "../serialization/types/Act";

/**
 * Model adapter for Anthropic.
 *
 * Supported models:
 * - claude-3-5-sonnet-20241022 (with computer use beta)
 *
 * @remarks If an API key is not provided, each call will cost 1 agent credit.
 *
 * @param name - Anthropic model name @default "claude-3-5-sonnet-20241022"
 * @param apiKey - Your Anthropic API key
 * @returns A Model configuration object
 */
export function anthropic(options?: { name?: string; apiKey?: string }): Model {
    return {
        provider: "anthropic",
        name: options?.name ?? "claude-3-5-sonnet-20241022",
        apiKey: options?.apiKey,
    };
}
