import { ScrapybaraClient } from "../src";

describe("test", () => {
    it("default", async () => {
        const client = new ScrapybaraClient({
            apiKey: process.env.SCRAPYBARA_API_KEY ?? "scrapy-8bb02c63-1339-4aeb-bae2-b6beea0485cb",
        });
        const instance = await client.start();
        await instance.browser.start();
        await instance.browser.stop();
        await instance.code.execute({
            code: "print('Hello, world!')",
        });
        await instance.stop();
    }, 30000);
});
