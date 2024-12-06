import { ScrapybaraClient as FernClient } from "../Client";
import * as Scrapybara from "../api/index";

export declare namespace ScrapybaraClient {

    type Options = FernClient.Options
}

export class ScrapybaraClient {

    private _fern: FernClient

    constructor(readonly _options: ScrapybaraClient.Options) {
        this._fern = new FernClient(_options);
    }

    public start(): Instance {
        return new Instance("", this._fern);
    }
}

export class Instance {

    constructor(private readonly instanceId: string, private readonly fern: FernClient) {
    }

    public async screenshot(requestOptions?: FernClient.RequestOptions): Promise<Scrapybara.InstanceScreenshotResponse> {
        return await this.fern.instance.screenshot(this.instanceId, requestOptions);
    }

}