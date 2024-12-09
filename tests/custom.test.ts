import assert from "assert";
import { ScrapybaraClient } from "../src";

describe("test", () => {
    it("default", async () => {
        if (!process.env.SCRAPYBARA_API_KEY) {
            throw new Error("SCRAPYBARA_API_KEY is not set");
        }
        const client = new ScrapybaraClient({
            apiKey: process.env.SCRAPYBARA_API_KEY,
        });
        const instance = await client.start();
        assert(instance.id !== undefined);
        const screenshotResponse = await instance.screenshot();
        assert(screenshotResponse.base64Image !== undefined);
        await instance.stop();
    }, 30000);
});
