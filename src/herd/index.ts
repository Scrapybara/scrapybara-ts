import { Model } from "../api/types/Act";

/**
 * Model adapter for Herd (Scrapybara-hosted LLMs).
 *
 * Supported models:
 * - ui-tars-72b (0.5x agent credit)
 *
 * @param name - Herd model name @default "ui-tars-72b"
 * @returns A Model configuration object
 */
export function herd(options?: { name?: string }): Model {
    return {
        provider: "herd",
        name: options?.name ?? "ui-tars-72b",
    };
}
