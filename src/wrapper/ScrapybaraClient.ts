import { ScrapybaraClient as FernClient } from "../Client";
import * as Scrapybara from "../api/index";

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
}

export class Instance {
    public readonly id: string;
    public readonly launchTime: Date;
    public readonly instanceType: string;
    public readonly status: string;
    public readonly browser: Browser;
    public readonly file: File;
    public readonly env: Env;
    public readonly notebook: Notebook;
    public readonly code: Code;

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
}

export class Browser {
    constructor(private readonly instanceId: string, private readonly fern: FernClient) {}

    public async start(requestOptions?: FernClient.RequestOptions): Promise<Scrapybara.StartBrowserResponse> {
        return await this.fern.browser.start(this.instanceId, requestOptions);
    }

    public async getCdpUrl(requestOptions?: FernClient.RequestOptions): Promise<Scrapybara.BrowserGetCdpUrlResponse> {
        return await this.fern.browser.getCdpUrl(this.instanceId, requestOptions);
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

export class Code {
    constructor(private readonly instanceId: string, private readonly fern: FernClient) {}

    public async execute(request: Scrapybara.CodeExecuteRequest, requestOptions?: FernClient.RequestOptions) {
        return await this.fern.code.execute(this.instanceId, request, requestOptions);
    }
}
