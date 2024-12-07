import { ScrapybaraClient } from "../src";

describe("test", () => {
    it("default", async () => {
        const client = new ScrapybaraClient({
            apiKey: process.env.SCRAPYBARA_API_KEY ?? "",
        });
        const instance = await client.start();
        await instance.browser.start();
        await instance.browser.stop();
        await instance.stop();
    });
});
