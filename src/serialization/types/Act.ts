import { Tool } from "./Tool";

// Message part types
export type TextPart = {
    type: "text";
    text: string;
};

export type ImagePart = {
    type: "image";
    image: string; // Base64 encoded image or URL
    mimeType?: string;
};

export type ToolCallPart = {
    type: "tool-call";
    toolCallId: string;
    toolName: string;
    args: Record<string, any>;
};

export type ToolResultPart = {
    type: "tool-result";
    toolCallId: string;
    toolName: string;
    result: any;
    isError?: boolean;
};

export type UserMessage = {
    role: "user";
    content: (TextPart | ImagePart)[];
};

export type AssistantMessage = {
    role: "assistant";
    content: (TextPart | ToolCallPart)[];
};

export type ToolMessage = {
    role: "tool";
    content: ToolResultPart[];
};

export type Message = UserMessage | AssistantMessage | ToolMessage;

// Request/Response models
export type Model = {
    provider: "anthropic";
    name: string;
    apiKey?: string;
};

export type ActRequest = {
    model: Model;
    system?: string;
    messages?: Message[];
    tools?: Tool[];
    temperature?: number;
    maxTokens?: number;
};

export type TokenUsage = {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
};

export type FinishReason = "stop" | "length" | "content-filter" | "tool-calls" | "error" | "other" | "unknown";

export type ActResponse = {
    message: AssistantMessage;
    finishReason: FinishReason;
    usage?: TokenUsage;
};

// Step definition
export type Step = {
    text: string;
    toolCalls?: ToolCallPart[];
    toolResults?: ToolResultPart[];
    finishReason?: FinishReason;
    usage?: TokenUsage;
};
