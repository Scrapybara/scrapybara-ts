import { ScrapybaraClient as FernClient } from "./Client";
import * as Scrapybara from "./api/index";
import { Tool } from "./serialization/types/Tool";
import {
    Message,
    TextPart,
    ToolCallPart,
    ToolResultPart,
    AssistantMessage,
    ToolMessage,
    Step,
    Model,
    ActRequest,
    ApiActResponse,
    convertRequestToApi,
    convertResponseToSdk,
} from "./serialization/types/Act";
import * as core from "./core";
import * as errors from "./errors";
import * as serializers from "./serialization";
import urlJoin from "url-join";
import { ScrapybaraEnvironment } from "./environments";
import { zodToJsonSchema } from "zod-to-json-schema";

export declare namespace ScrapybaraClient {
    type Options = FernClient.Options;
    type RequestOptions = FernClient.RequestOptions;
}

export class ScrapybaraClient {
    private _fern: FernClient;

    constructor(readonly _options: ScrapybaraClient.Options) {
        this._fern = new FernClient(_options);
    }

    public async start(
        request: Scrapybara.DeploymentConfig = {},
        requestOptions?: ScrapybaraClient.RequestOptions
    ): Promise<Instance> {
        const response = await this._fern.start(request, requestOptions);
        return new Instance(response.id, response.launchTime, response.instanceType, response.status, this._fern);
    }

    public async get(instanceId: string, requestOptions?: ScrapybaraClient.RequestOptions): Promise<Instance> {
        const response = await this._fern.get(instanceId, requestOptions);
        return new Instance(response.id, response.launchTime, response.instanceType, response.status, this._fern);
    }

    public async getInstances(requestOptions?: ScrapybaraClient.RequestOptions): Promise<Instance[]> {
        const response = await this._fern.getInstances(requestOptions);
        return response.map(
            (instance) =>
                new Instance(instance.id, instance.launchTime, instance.instanceType, instance.status, this._fern)
        );
    }

    public async getAuthStates(
        requestOptions?: ScrapybaraClient.RequestOptions
    ): Promise<Scrapybara.AuthStateResponse[]> {
        const response = await this._fern.getAuthStates(requestOptions);
        return response;
    }

    public async act({
        model,
        system,
        prompt,
        messages,
        tools,
        onStep,
        temperature,
        maxTokens,
        requestOptions,
    }: {
        model: Model;
        system?: string;
        prompt?: string;
        messages?: Message[];
        tools?: Tool[];
        onStep?: (step: Step) => void;
        temperature?: number;
        maxTokens?: number;
        requestOptions?: ScrapybaraClient.RequestOptions;
    }): Promise<Message[]> {
        const resultMessages: Message[] = [];
        if (messages) {
            resultMessages.push(...messages);
        }

        for await (const step of this.actStream({
            model,
            system,
            prompt,
            messages,
            tools,
            onStep,
            temperature,
            maxTokens,
            requestOptions,
        })) {
            const assistantMsg: AssistantMessage = {
                role: "assistant",
                content: [
                    { type: "text", text: step.text } as TextPart,
                    ...(step.toolCalls || []),
                ],
            };
            resultMessages.push(assistantMsg);

            if (step.toolResults) {
                const toolMsg: ToolMessage = {
                    role: "tool",
                    content: step.toolResults,
                };
                resultMessages.push(toolMsg);
            }
        }

        return resultMessages;
    }

    public async *actStream({
        model,
        system,
        prompt,
        messages,
        tools,
        onStep,
        temperature,
        maxTokens,
        requestOptions,
    }: {
        model: Model;
        system?: string;
        prompt?: string;
        messages?: Message[];
        tools?: Tool[];
        onStep?: (step: Step) => void;
        temperature?: number;
        maxTokens?: number;
        requestOptions?: ScrapybaraClient.RequestOptions;
    }): AsyncGenerator<Step, void, unknown> {
        let currentMessages: Message[] = [];
        if (!messages) {
            if (!prompt) {
                throw new Error("prompt or messages must be provided");
            }
            currentMessages = [
                {
                    role: "user" as const,
                    content: [
                        {
                            type: "text" as const,
                            text: prompt,
                        },
                    ],
                },
            ];
        } else {
            currentMessages = [...messages];
        }

        const currentTools = tools || [];

        while (true) {
            const request: ActRequest = {
                model: {
                    provider: "anthropic",
                    name: model.name,
                    apiKey: model.apiKey,
                },
                system,
                messages: currentMessages,
                tools: currentTools,
                temperature,
                maxTokens,
            };

            const response = await core.fetcher({
                url: urlJoin(
                    (await core.Supplier.get(this._options.environment)) ?? ScrapybaraEnvironment.Production,
                    "v1/act"
                ),
                method: "POST",
                headers: {
                    "X-Fern-Language": "JavaScript",
                    "X-Fern-SDK-Name": "scrapybara",
                    "X-Fern-SDK-Version": "2.1.0",
                    "User-Agent": "scrapybara/2.1.0",
                    "X-Fern-Runtime": core.RUNTIME.type,
                    "X-Fern-Runtime-Version": core.RUNTIME.version,
                    ...(await this._getCustomAuthorizationHeaders()),
                    ...requestOptions?.headers,
                },
                contentType: "application/json",
                body: convertRequestToApi(request),
                requestType: "json",
                timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 600000,
                maxRetries: requestOptions?.maxRetries,
                abortSignal: requestOptions?.abortSignal,
            });

            if (!response.ok) {
                if (response.error.reason === "status-code") {
                    switch (response.error.statusCode) {
                        case 422:
                            throw new Scrapybara.UnprocessableEntityError(
                                serializers.HttpValidationError.parseOrThrow(response.error.body, {
                                    unrecognizedObjectKeys: "passthrough",
                                    allowUnrecognizedUnionMembers: true,
                                    allowUnrecognizedEnumValues: true,
                                    breadcrumbsPrefix: ["response"],
                                })
                            );
                        default:
                            throw new errors.ScrapybaraError({
                                statusCode: response.error.statusCode,
                                body: response.error.body,
                            });
                    }
                }

                switch (response.error.reason) {
                    case "non-json":
                        throw new errors.ScrapybaraError({
                            statusCode: response.error.statusCode,
                            body: response.error.rawBody,
                        });
                    case "timeout":
                        throw new errors.ScrapybaraTimeoutError("Timeout exceeded when calling POST /v1/act.");
                    case "unknown":
                        throw new errors.ScrapybaraError({
                            message: response.error.errorMessage,
                        });
                }
            }

            const apiResponse = response.body as ApiActResponse;
            const actResponse = convertResponseToSdk(apiResponse);
            const assistantMessage: AssistantMessage = {
                role: "assistant",
                content: actResponse.message.content,
            };
            currentMessages.push(assistantMessage);

            // Extract text from assistant message
            const text = actResponse.message.content
                .filter((part): part is TextPart => part.type === "text")
                .map((part) => part.text)
                .join("\n");

            // Extract tool calls
            const toolCalls = actResponse.message.content.filter(
                (part): part is ToolCallPart => part.type === "tool-call"
            );

            // Create initial step
            const step: Step = {
                text,
                toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
                finishReason: actResponse.finishReason,
                usage: actResponse.usage,
            };

            // Check if we should continue the loop
            const hasToolCalls = toolCalls.length > 0;

            if (hasToolCalls) {
                const toolResults: ToolResultPart[] = [];
                for (const part of toolCalls) {
                    const tool = currentTools.find((t) => t.name === part.toolName);
                    if (!tool) continue;

                    try {
                        const result = await tool.execute(part.args);
                        toolResults.push({
                            type: "tool-result",
                            toolCallId: part.toolCallId,
                            toolName: part.toolName,
                            result,
                        });
                    } catch (error: any) {
                        toolResults.push({
                            type: "tool-result",
                            toolCallId: part.toolCallId,
                            toolName: part.toolName,
                            result: error?.message || String(error),
                            isError: true,
                        });
                    }
                }

                step.toolResults = toolResults;
                const toolMessage: ToolMessage = {
                    role: "tool",
                    content: toolResults,
                };
                currentMessages.push(toolMessage);
            }

            if (onStep) {
                onStep(step);
            }
            yield step;

            if (!hasToolCalls) {
                break;
            }
        }
    }

    protected async _getCustomAuthorizationHeaders() {
        const apiKeyValue = (await core.Supplier.get(this._options.apiKey)) ?? process?.env["SCRAPYBARA_API_KEY"];
        return { "x-api-key": apiKeyValue };
    }
}

export class Instance {
    public readonly id: string;
    public readonly launchTime: Date;
    public readonly instanceType: string;
    public readonly status: string;
    public readonly browser: Browser;
    public readonly code: Code;
    public readonly notebook: Notebook;
    public readonly file: File;
    public readonly env: Env;

    constructor(id: string, launchTime: Date, instanceType: string, status: string, private readonly fern: FernClient) {
        this.id = id;
        this.launchTime = launchTime;
        this.instanceType = instanceType;
        this.status = status;
        this.browser = new Browser(this.id, this.fern);
        this.file = new File(this.id, this.fern);
        this.env = new Env(this.id, this.fern);
        this.notebook = new Notebook(this.id, this.fern);
        this.code = new Code(this.id, this.fern);
    }

    public async screenshot(
        requestOptions?: FernClient.RequestOptions
    ): Promise<Scrapybara.InstanceScreenshotResponse> {
        return await this.fern.instance.screenshot(this.id, requestOptions);
    }

    public async getStreamUrl(
        requestOptions?: FernClient.RequestOptions
    ): Promise<Scrapybara.InstanceGetStreamUrlResponse> {
        return await this.fern.instance.getStreamUrl(this.id, requestOptions);
    }

    public async computer(
        request: Scrapybara.ComputerRequest,
        requestOptions?: FernClient.RequestOptions
    ): Promise<unknown> {
        return await this.fern.instance.computer(this.id, request, requestOptions);
    }

    public async bash(
        request: Scrapybara.BashRequest = {},
        requestOptions?: FernClient.RequestOptions
    ): Promise<unknown> {
        return await this.fern.instance.bash(this.id, request, requestOptions);
    }

    public async edit(request: Scrapybara.EditRequest, requestOptions?: FernClient.RequestOptions): Promise<unknown> {
        return await this.fern.instance.edit(this.id, request, requestOptions);
    }

    public async stop(requestOptions?: FernClient.RequestOptions): Promise<Scrapybara.StopInstanceResponse> {
        return await this.fern.instance.stop(this.id, requestOptions);
    }

    public async pause(requestOptions?: FernClient.RequestOptions): Promise<Scrapybara.StopInstanceResponse> {
        return await this.fern.instance.pause(this.id, requestOptions);
    }

    public async resume(
        request: Scrapybara.InstanceResumeRequest = {},
        requestOptions?: FernClient.RequestOptions
    ): Promise<Scrapybara.GetInstanceResponse> {
        return await this.fern.instance.resume(this.id, request, requestOptions);
    }
}

export class Browser {
    constructor(private readonly instanceId: string, private readonly fern: FernClient) {}

    public async start(requestOptions?: FernClient.RequestOptions): Promise<Scrapybara.StartBrowserResponse> {
        return await this.fern.browser.start(this.instanceId, requestOptions);
    }

    public async getCdpUrl(requestOptions?: FernClient.RequestOptions): Promise<Scrapybara.BrowserGetCdpUrlResponse> {
        return await this.fern.browser.getCdpUrl(this.instanceId, requestOptions);
    }

    public async saveAuth(
        request: Scrapybara.BrowserSaveAuthRequest,
        requestOptions?: FernClient.RequestOptions
    ): Promise<Scrapybara.SaveBrowserAuthResponse> {
        return await this.fern.browser.saveAuth(this.instanceId, request, requestOptions);
    }

    public async authenticate(
        request: Scrapybara.BrowserAuthenticateRequest,
        requestOptions?: FernClient.RequestOptions
    ): Promise<Scrapybara.BrowserAuthenticateResponse> {
        return await this.fern.browser.authenticate(this.instanceId, request, requestOptions);
    }

    public async stop(requestOptions?: FernClient.RequestOptions): Promise<Scrapybara.StopBrowserResponse> {
        return await this.fern.browser.stop(this.instanceId, requestOptions);
    }
}

export class Code {
    constructor(private readonly instanceId: string, private readonly fern: FernClient) {}

    public async execute(request: Scrapybara.CodeExecuteRequest, requestOptions?: FernClient.RequestOptions) {
        return await this.fern.code.execute(this.instanceId, request, requestOptions);
    }
}

export class Notebook {
    constructor(private readonly instanceId: string, private readonly fern: FernClient) {}

    public async listKernels(requestOptions?: FernClient.RequestOptions) {
        return await this.fern.notebook.listKernels(this.instanceId, requestOptions);
    }

    public async create(request: Scrapybara.CreateNotebookRequest, requestOptions?: FernClient.RequestOptions) {
        return await this.fern.notebook.create(this.instanceId, request, requestOptions);
    }

    public async get(notebookId: string, requestOptions?: FernClient.RequestOptions) {
        return await this.fern.notebook.get(this.instanceId, notebookId, requestOptions);
    }

    public async delete(notebookId: string, requestOptions?: FernClient.RequestOptions) {
        return await this.fern.notebook.delete(this.instanceId, notebookId, requestOptions);
    }

    public async addCell(
        notebookId: string,
        request: Scrapybara.AddCellRequest,
        requestOptions?: FernClient.RequestOptions
    ) {
        return await this.fern.notebook.addCell(this.instanceId, notebookId, request, requestOptions);
    }

    public async executeCell(
        notebookId: string,
        cellId: string,
        request: Scrapybara.ExecuteCellRequest,
        requestOptions?: FernClient.RequestOptions
    ) {
        return await this.fern.notebook.executeCell(this.instanceId, notebookId, cellId, request, requestOptions);
    }

    public async execute(
        notebookId: string,
        request: Scrapybara.ExecuteCellRequest,
        requestOptions?: FernClient.RequestOptions
    ) {
        return await this.fern.notebook.execute(this.instanceId, notebookId, request, requestOptions);
    }
}

export class File {
    constructor(private readonly instanceId: string, private readonly fern: FernClient) {}

    public async read(request: Scrapybara.FileReadRequest, requestOptions?: FernClient.RequestOptions) {
        return await this.fern.file.read(this.instanceId, request, requestOptions);
    }

    public async write(request: Scrapybara.FileWriteRequest, requestOptions?: FernClient.RequestOptions) {
        return await this.fern.file.write(this.instanceId, request, requestOptions);
    }

    public async upload(request: Scrapybara.FileUploadRequest, requestOptions?: FernClient.RequestOptions) {
        return await this.fern.file.upload(this.instanceId, request, requestOptions);
    }

    public async download(request: Scrapybara.FileDownloadRequest, requestOptions?: FernClient.RequestOptions) {
        return await this.fern.file.download(this.instanceId, request, requestOptions);
    }
}

export class Env {
    constructor(private readonly instanceId: string, private readonly fern: FernClient) {}

    public async set(request: Scrapybara.EnvSetRequest, requestOptions?: FernClient.RequestOptions) {
        return await this.fern.env.set(this.instanceId, request, requestOptions);
    }

    public async get(requestOptions?: FernClient.RequestOptions) {
        return await this.fern.env.get(this.instanceId, requestOptions);
    }

    public async delete(request: Scrapybara.EnvDeleteRequest, requestOptions?: FernClient.RequestOptions) {
        return await this.fern.env.delete(this.instanceId, request, requestOptions);
    }
}
