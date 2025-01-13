import { ScrapybaraClient } from "../src";
import { anthropic } from "../src/anthropic";
import { computerTool, bashTool, editTool, browserTool } from "../src/tools";
import { SYSTEM_PROMPT } from "../src/prompts";
import assert from "assert";

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

        const instances = await client.getInstances();
        assert(instances.length > 0);

        const screenshotResponse = await instance.screenshot();
        assert(screenshotResponse.base64Image !== undefined);

        await instance.browser.start();
        const cdpUrl = await instance.browser.getCdpUrl();
        assert(cdpUrl.cdpUrl !== undefined);

        const messages = await client.act({
            model: anthropic(),
            system: SYSTEM_PROMPT,
            prompt: "Go to the YC website and fetch the HTML",
            tools: [computerTool(instance), bashTool(instance), editTool(instance), browserTool(instance)],
            onStep: (step) => console.log(`${JSON.stringify(step)}\n`),
        });
        assert(messages.length > 0);

        await instance.browser.stop();
        await instance.stop();
    }, 60000);
});
