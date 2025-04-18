import { ScrapybaraClient } from "../src";
import {
    anthropic,
    UBUNTU_SYSTEM_PROMPT as ANTHROPIC_UBUNTU_SYSTEM_PROMPT,
    BROWSER_SYSTEM_PROMPT as ANTHROPIC_BROWSER_SYSTEM_PROMPT,
    WINDOWS_SYSTEM_PROMPT as ANTHROPIC_WINDOWS_SYSTEM_PROMPT
} from "../src/anthropic";
import {
    openai,
    UBUNTU_SYSTEM_PROMPT as OPENAI_UBUNTU_SYSTEM_PROMPT,
    BROWSER_SYSTEM_PROMPT as OPENAI_BROWSER_SYSTEM_PROMPT,
    WINDOWS_SYSTEM_PROMPT as OPENAI_WINDOWS_SYSTEM_PROMPT
} from "../src/openai";
import { computerTool, bashTool, editTool } from "../src/tools";
import { z } from "zod";
import assert from "assert";

const ExampleSite = z.object({
    title: z.string(),
    has_links: z.boolean(),
});

describe("test", () => {
    const client = new ScrapybaraClient({
        apiKey: process.env.SCRAPYBARA_API_KEY,
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
            system: ANTHROPIC_UBUNTU_SYSTEM_PROMPT,
            prompt: "Go to example.com and get the page title and whether it has any links",
            tools: [computerTool(ubuntuInstance), bashTool(ubuntuInstance), editTool(ubuntuInstance)],
            schema: ExampleSite,
            onStep: (step) => console.log(step.text, step.toolCalls),
        });
        console.log(response.output);

        assert(response.output !== undefined);
        assert(response.output.title !== undefined);
        assert(typeof response.output.has_links === 'boolean');

        await ubuntuInstance.browser.stop();
        await ubuntuInstance.stop();
    }, 600000);

    it.skip("ubuntu test with thinking", async () => {
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
            model: anthropic({ name: "claude-3-7-sonnet-20250219-thinking" }),
            system: ANTHROPIC_UBUNTU_SYSTEM_PROMPT,
            prompt: "Go to example.com and get the page title and whether it has any links",
            tools: [computerTool(ubuntuInstance), bashTool(ubuntuInstance), editTool(ubuntuInstance)],
            schema: ExampleSite,
            onStep: (step) => console.log(step.text, step.toolCalls, step.reasoningParts),
        });
        console.log(response.output);

        assert(response.output !== undefined);
        assert(response.output.title !== undefined);
        assert(typeof response.output.has_links === 'boolean');

        await ubuntuInstance.browser.stop();
        await ubuntuInstance.stop();
    }, 600000);

    it("browser test", async () => {
        const browserInstance = await client.startBrowser();
        console.log((await browserInstance.getStreamUrl()).streamUrl);
        assert(browserInstance.id !== undefined);

        const instances = await client.getInstances();
        assert(instances.length > 0);

        const screenshotResponse = await browserInstance.screenshot();
        assert(screenshotResponse.base64Image !== undefined);

        const cdpUrl = await browserInstance.getCdpUrl();
        assert(cdpUrl.cdpUrl !== undefined);

        const response = await client.act({
            model: anthropic(),
            system: ANTHROPIC_BROWSER_SYSTEM_PROMPT,
            prompt: "Go to example.com and get the page title and whether it has any links",
            tools: [computerTool(browserInstance)],
            schema: ExampleSite,
            onStep: (step) => console.log(step.text, step.toolCalls),
        });
        console.log(response.output);

        assert(response.output !== undefined);
        assert(response.output.title !== undefined);
        assert(typeof response.output.has_links === 'boolean');

        await browserInstance.stop();
    }, 600000);

    it.skip("browser test with thinking", async () => {
        const browserInstance = await client.startBrowser();
        console.log((await browserInstance.getStreamUrl()).streamUrl);
        assert(browserInstance.id !== undefined);

        const instances = await client.getInstances();
        assert(instances.length > 0);

        const screenshotResponse = await browserInstance.screenshot();
        assert(screenshotResponse.base64Image !== undefined);

        const cdpUrl = await browserInstance.getCdpUrl();
        assert(cdpUrl.cdpUrl !== undefined);

        const response = await client.act({
            model: anthropic({ name: "claude-3-7-sonnet-20250219-thinking" }),
            system: ANTHROPIC_BROWSER_SYSTEM_PROMPT,
            prompt: "Go to example.com and get the page title and whether it has any links",
            tools: [computerTool(browserInstance)],
            schema: ExampleSite,
            onStep: (step) => console.log(step.text, step.toolCalls, step.reasoningParts),
        });
        console.log(response.output);

        assert(response.output !== undefined);
        assert(response.output.title !== undefined);
        assert(typeof response.output.has_links === 'boolean');

        await browserInstance.stop();
    }, 600000);

    it.skip("windows test", async () => {
        const windowsInstance = await client.startWindows();
        console.log((await windowsInstance.getStreamUrl()).streamUrl);
        assert(windowsInstance.id !== undefined);

        const instances = await client.getInstances();
        assert(instances.length > 0);

        const screenshotResponse = await windowsInstance.screenshot();
        assert(screenshotResponse.base64Image !== undefined);

        const response = await client.act({
            model: anthropic(),
            system: ANTHROPIC_WINDOWS_SYSTEM_PROMPT,
            prompt: "Go to example.com and get the page title and whether it has any links",
            tools: [computerTool(windowsInstance)],
            schema: ExampleSite,
            onStep: (step) => console.log(step.text, step.toolCalls),
        });
        console.log(response.output);

        assert(response.output !== undefined);
        assert(response.output.title !== undefined);
        assert(typeof response.output.has_links === 'boolean');

        await windowsInstance.stop();
    }, 600000);

    it("ubuntu test with openai", async () => {
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
            model: openai(),
            system: OPENAI_UBUNTU_SYSTEM_PROMPT,
            prompt: "Go to example.com and get the page title and whether it has any links",
            tools: [computerTool(ubuntuInstance), bashTool(ubuntuInstance), editTool(ubuntuInstance)],
            schema: ExampleSite,
            onStep: (step) => console.log(step.text, step.toolCalls),
        });
        console.log(response.output);

        assert(response.output !== undefined);
        assert(response.output.title !== undefined);
        assert(typeof response.output.has_links === 'boolean');

        await ubuntuInstance.browser.stop();
        await ubuntuInstance.stop();
    }, 600000);

    it("browser test with openai", async () => {
        const browserInstance = await client.startBrowser();
        console.log((await browserInstance.getStreamUrl()).streamUrl);
        assert(browserInstance.id !== undefined);

        const instances = await client.getInstances();
        assert(instances.length > 0);

        const screenshotResponse = await browserInstance.screenshot();
        assert(screenshotResponse.base64Image !== undefined);

        const cdpUrl = await browserInstance.getCdpUrl();
        assert(cdpUrl.cdpUrl !== undefined);

        const response = await client.act({
            model: openai(),
            system: OPENAI_BROWSER_SYSTEM_PROMPT,
            prompt: "Go to example.com and get the page title and whether it has any links",
            tools: [computerTool(browserInstance)],
            schema: ExampleSite,
            onStep: (step) => console.log(step.text, step.toolCalls),
        });
        console.log(response.output);

        assert(response.output !== undefined);
        assert(response.output.title !== undefined);
        assert(typeof response.output.has_links === 'boolean');

        await browserInstance.stop();
    }, 600000);

    it.skip("windows test with openai", async () => {
        const windowsInstance = await client.startWindows();
        console.log((await windowsInstance.getStreamUrl()).streamUrl);
        assert(windowsInstance.id !== undefined);

        const instances = await client.getInstances();
        assert(instances.length > 0);

        const screenshotResponse = await windowsInstance.screenshot();
        assert(screenshotResponse.base64Image !== undefined);

        const response = await client.act({
            model: openai(),
            system: OPENAI_WINDOWS_SYSTEM_PROMPT,
            prompt: "Go to example.com and get the page title and whether it has any links",
            tools: [computerTool(windowsInstance)],
            schema: ExampleSite,
            onStep: (step) => console.log(step.text, step.toolCalls),
        });
        console.log(response.output);

        assert(response.output !== undefined);
        assert(response.output.title !== undefined);
        assert(typeof response.output.has_links === 'boolean');

        await windowsInstance.stop();
    }, 600000);

    it("test file upload and download", async () => {
        // Start an Ubuntu instance
        const instance = await client.startUbuntu();
        
        // Create a temporary file with test content
        const fs = require('fs');
        const path = require('path');
        const testFilePath = path.join(__dirname, 'test-upload.txt');
        fs.writeFileSync(testFilePath, 'Test content for upload');
        
        // Upload the file to the instance
        const uploadPath = 'uploaded-file.txt';
        const uploadStream = fs.createReadStream(testFilePath);
        await instance.upload(uploadStream, { path: uploadPath });
        
        // Verify file was uploaded by checking contents with bash
        const bashResult = await instance.bash({ command: `cat ${uploadPath}` });
        assert(bashResult.output?.includes('Test content for upload'));
        
        // Test download endpoint
        // await instance.download({ path: uploadPath });
        
        // Clean up
        fs.unlinkSync(testFilePath);
        await instance.stop();
    }, 60000);
});
