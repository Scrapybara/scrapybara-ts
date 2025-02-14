import { Model } from "../api/types/Act";

/**
 * Model adapter for Herd (Scrapybara-hosted LLMs).
 *
 * @param name - Herd model name
 * @returns A Model configuration object
 */
export function herd(options: { name: string }): Model {
    return {
        provider: "herd",
        name: options.name,
    };
}
