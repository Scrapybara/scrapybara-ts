import { zodToJsonSchema } from "zod-to-json-schema";
import { Tool } from "./Tool";

// SDK types (camel case)
export type TextPart = {
    type: "text";
    text: string;
};

export type ImagePart = {
    type: "image";
    image: string;
    mimeType?: string;
};

export type ToolCallPart = {
    type: "tool-call";
    id?: string;
    toolCallId: string;
    toolName: string;
    safetyChecks?: any[];
    args: Record<string, any>;
};

export type ToolResultPart = {
    type: "tool-result";
    toolCallId: string;
    toolName: string;
    result: any;
    isError?: boolean;
};

export type ReasoningPart = {
    type: "reasoning";
    id?: string;
    reasoning: string;
    signature?: string;
    instructions?: string;
};

export type UserMessage = {
    role: "user";
    content: (TextPart | ImagePart)[];
};

export type AssistantMessage = {
    role: "assistant";
    responseId?: string;
    content: (TextPart | ToolCallPart | ReasoningPart)[];
};

export type ToolMessage = {
    role: "tool";
    content: ToolResultPart[];
};

export type Message = UserMessage | AssistantMessage | ToolMessage;

export type Model = {
    provider: "anthropic" | "openai" | "herd";
    name: string;
    apiKey?: string;
};

export type TokenUsage = {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
};

export type FinishReason = "stop" | "length" | "content-filter" | "tool-calls" | "error" | "other" | "unknown";

export type Step = {
    text: string;
    responseId?: string;
    reasoningParts?: ReasoningPart[];
    toolCalls?: ToolCallPart[];
    toolResults?: ToolResultPart[];
    finishReason?: FinishReason;
    usage?: TokenUsage;
};

export type SingleActRequest = {
    model: Model;
    system?: string;
    messages?: Message[];
    tools?: Tool[];
    temperature?: number;
    maxTokens?: number;
};

export type SingleActResponse = {
    message: AssistantMessage;
    finishReason: FinishReason;
    usage?: TokenUsage;
};

// API types (snake case)
type ApiTextPart = {
    type: "text";
    text: string;
};

type ApiImagePart = {
    type: "image";
    image: string;
    mime_type?: string;
};

type ApiToolCallPart = {
    type: "tool-call";
    id?: string;
    tool_call_id: string;
    tool_name: string;
    safety_checks?: any[];
    args: Record<string, any>;
};

type ApiToolResultPart = {
    type: "tool-result";
    tool_call_id: string;
    tool_name: string;
    result: any;
    is_error?: boolean;
};

type ApiReasoningPart = {
    type: "reasoning";
    id?: string;
    reasoning: string;
    signature?: string;
    instructions?: string;
};

type ApiUserMessage = {
    role: "user";
    content: (ApiTextPart | ApiImagePart)[];
};

type ApiAssistantMessage = {
    role: "assistant";
    response_id?: string;
    content: (ApiTextPart | ApiToolCallPart | ApiReasoningPart)[];
};

type ApiToolMessage = {
    role: "tool";
    content: ApiToolResultPart[];
};

type ApiMessage = ApiUserMessage | ApiAssistantMessage | ApiToolMessage;

type ApiModel = {
    provider: "anthropic" | "openai" | "herd";
    name: string;
    api_key?: string;
};

type ApiTokenUsage = {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
};

type ApiTool = Omit<Tool, "parameters"> & {
    parameters: Record<string, any>;
};

export type ApiSingleActRequest = {
    model: ApiModel;
    system?: string;
    messages?: ApiMessage[];
    tools?: ApiTool[];
    temperature?: number;
    max_tokens?: number;
};

export type ApiSingleActResponse = {
    message: ApiAssistantMessage;
    finish_reason: FinishReason;
    usage?: ApiTokenUsage;
};

export type ActResponse<T = void> = {
    messages: Message[];
    steps: Step[];
    text?: string;
    output?: T;
    usage?: TokenUsage;
};

export function convertRequestToApi(request: SingleActRequest): ApiSingleActRequest {
    const tools = request.tools?.map((tool) => ({
        ...tool,
        parameters: zodToJsonSchema(tool.parameters),
    }));

    const convertToolCallPart = (part: ToolCallPart): ApiToolCallPart => ({
        type: "tool-call",
        id: part.id,
        tool_call_id: part.toolCallId,
        tool_name: part.toolName,
        safety_checks: part.safetyChecks,
        args: part.args,
    });

    const convertToolResultPart = (part: ToolResultPart): ApiToolResultPart => ({
        type: "tool-result",
        tool_call_id: part.toolCallId,
        tool_name: part.toolName,
        result: part.result,
        is_error: part.isError,
    });

    const convertTextPart = (part: TextPart): ApiTextPart => ({
        type: "text",
        text: part.text,
    });

    const convertImagePart = (part: ImagePart): ApiImagePart => ({
        type: "image",
        image: part.image,
        mime_type: part.mimeType,
    });

    const convertReasoningPart = (part: ReasoningPart): ApiReasoningPart => ({
        type: "reasoning",
        id: part.id,
        reasoning: part.reasoning,
        signature: part.signature,
        instructions: part.instructions,
    });

    const convertMessage = (message: Message): ApiMessage => {
        switch (message.role) {
            case "user":
                return {
                    role: "user",
                    content: message.content.map((part) =>
                        part.type === "text" ? convertTextPart(part) : convertImagePart(part),
                    ),
                };
            case "assistant":
                return {
                    role: "assistant",
                    response_id: message.responseId,
                    content: message.content.map((part) => {
                        if (part.type === "text") return convertTextPart(part);
                        if (part.type === "tool-call") return convertToolCallPart(part);
                        return convertReasoningPart(part);
                    }),
                };
            case "tool":
                return {
                    role: "tool",
                    content: message.content.map(convertToolResultPart),
                };
        }
    };

    return {
        model: {
            ...request.model,
            api_key: request.model.apiKey,
        },
        system: request.system,
        messages: request.messages?.map(convertMessage),
        tools,
        temperature: request.temperature,
        max_tokens: request.maxTokens,
    };
}

export function convertResponseToSdk(response: ApiSingleActResponse): SingleActResponse {
    const convertToolCallPart = (part: ApiToolCallPart): ToolCallPart => ({
        type: "tool-call",
        id: part.id,
        toolCallId: part.tool_call_id,
        toolName: part.tool_name,
        safetyChecks: part.safety_checks,
        args: part.args,
    });

    const convertTextPart = (part: ApiTextPart): TextPart => ({
        type: "text",
        text: part.text,
    });

    const convertReasoningPart = (part: ApiReasoningPart): ReasoningPart => ({
        type: "reasoning",
        id: part.id,
        reasoning: part.reasoning,
        signature: part.signature,
        instructions: part.instructions,
    });

    const convertContent = (content: (ApiTextPart | ApiToolCallPart | ApiReasoningPart)[]): (TextPart | ToolCallPart | ReasoningPart)[] => {
        return content.map((part) => {
            if (part.type === "text") {
                return convertTextPart(part);
            } else if (part.type === "tool-call") {
                return convertToolCallPart(part);
            } else {
                return convertReasoningPart(part);
            }
        });
    };

    return {
        message: {
            role: "assistant",
            responseId: response.message.response_id,
            content: convertContent(response.message.content),
        },
        finishReason: response.finish_reason,
        usage: response.usage
            ? {
                  promptTokens: response.usage.prompt_tokens,
                  completionTokens: response.usage.completion_tokens,
                  totalTokens: response.usage.total_tokens,
              }
            : undefined,
    };
}
