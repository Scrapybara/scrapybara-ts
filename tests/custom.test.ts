import { ScrapybaraClient } from "../src";
import { anthropic } from "../src/anthropic";
import { computerTool, bashTool, editTool, browserTool } from "../src/tools";
import { UBUNTU_SYSTEM_PROMPT, BROWSER_SYSTEM_PROMPT, WINDOWS_SYSTEM_PROMPT } from "../src/prompts";
import { z } from "zod";
import assert from "assert";

const YCStats = z.object({
    number_of_startups: z.number(),
    combined_valuation: z.number(),
});

describe("test", () => {
    const client = new ScrapybaraClient({
        apiKey: process.env.SCRAPYBARA_API_KEY,
        environment: "https://scrapybara-api-alpha-47247185186.us-central1.run.app",
    });

    beforeAll(() => {
        if (!process.env.SCRAPYBARA_API_KEY) {
            throw new Error("SCRAPYBARA_API_KEY is not set");
        }
    });

    it("ubuntu test", async () => {
        const ubuntuInstance = await client.startUbuntu();
        console.log((await ubuntuInstance.getStreamUrl()).streamUrl);
        assert(ubuntuInstance.id !== undefined);

        const instances = await client.getInstances();
        assert(instances.length > 0);

        const screenshotResponse = await ubuntuInstance.screenshot();
        assert(screenshotResponse.base64Image !== undefined);

        await ubuntuInstance.browser.start();
        const cdpUrl = await ubuntuInstance.browser.getCdpUrl();
        assert(cdpUrl.cdpUrl !== undefined);

        const response = await client.act({
            model: anthropic(),
            system: UBUNTU_SYSTEM_PROMPT,
            prompt: "Go to the YC website and get the number of funded startups and combined valuation",
            tools: [
                computerTool(ubuntuInstance),
                bashTool(ubuntuInstance),
                editTool(ubuntuInstance),
                browserTool(ubuntuInstance),
            ],
            schema: YCStats,
            onStep: (step) => console.log(step.text, step.toolCalls),
        });
        console.log(response);

        assert(response.output !== undefined);
        assert(response.output.number_of_startups !== undefined);
        assert(response.output.combined_valuation !== undefined);

        await ubuntuInstance.browser.stop();
        await ubuntuInstance.stop();
    }, 600000);

    it("browser test", async () => {
        const browserInstance = await client.startBrowser();
        console.log((await browserInstance.getStreamUrl()).streamUrl);
        assert(browserInstance.id !== undefined);

        const screenshotResponse = await browserInstance.screenshot();
        assert(screenshotResponse.base64Image !== undefined);

        const cdpUrl = await browserInstance.getCdpUrl();
        assert(cdpUrl.cdpUrl !== undefined);

        const response = await client.act({
            model: anthropic(),
            system: BROWSER_SYSTEM_PROMPT,
            prompt: "Go to the YC website and get the number of funded startups and combined valuation",
            tools: [computerTool(browserInstance), browserTool(browserInstance)],
            schema: YCStats,
            onStep: (step) => console.log(step.text, step.toolCalls),
        });
        console.log(response);

        assert(response.output !== undefined);
        assert(response.output.number_of_startups !== undefined);
        assert(response.output.combined_valuation !== undefined);

        await browserInstance.stop();
    }, 600000);

    it.skip("windows test", async () => {
        const windowsInstance = await client.startWindows();
        console.log((await windowsInstance.getStreamUrl()).streamUrl);
        assert(windowsInstance.id !== undefined);

        const screenshotResponse = await windowsInstance.screenshot();
        assert(screenshotResponse.base64Image !== undefined);

        const response = await client.act({
            model: anthropic(),
            system: WINDOWS_SYSTEM_PROMPT,
            prompt: "Go to the YC website and get the number of funded startups and combined valuation",
            tools: [computerTool(windowsInstance)],
            schema: YCStats,
            onStep: (step) => console.log(step.text, step.toolCalls),
        });
        console.log(response);

        assert(response.output !== undefined);
        assert(response.output.number_of_startups !== undefined);
        assert(response.output.combined_valuation !== undefined);

        await windowsInstance.stop();
    }, 600000);
});
