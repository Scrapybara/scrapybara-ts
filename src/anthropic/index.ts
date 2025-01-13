import { Model } from "../serialization/types/Act";

export function anthropic(name: string = "claude-3-5-sonnet-20241022", apiKey?: string): Model {
    return {
        provider: "anthropic",
        name,
        apiKey,
    };
}
