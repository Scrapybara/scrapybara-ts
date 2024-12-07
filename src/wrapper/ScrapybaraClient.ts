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

    constructor(id: string, launchTime: Date, instanceType: string, status: string, private readonly fern: FernClient) {
        this.id = id;
        this.launchTime = launchTime;
        this.instanceType = instanceType;
        this.status = status;
        this.browser = new Browser(this.id, this.fern);
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
