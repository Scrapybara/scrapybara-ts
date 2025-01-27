import { z } from "zod";
import { Tool } from "../api/types/Tool";
import { BaseInstance, UbuntuInstance, BrowserInstance } from "../ScrapybaraClient";
import { chromium } from "playwright";

/**
 * Create a custom tool that can be used by the act agent.
 */
export function tool<T = any, R = any>({ name, description, parameters, execute }: Tool<T, R>): Tool<T, R> {
    return {
        name,
        description,
        parameters,
        execute,
    };
}

/**
 * Return an image result that is interpretable by the model.
 */
export function imageResult(base64: string): string {
    return JSON.stringify({
        output: "",
        error: "",
        base64_image: base64,
        system: null,
    });
}

/**
 * A computer interaction tool that allows the agent to control mouse and keyboard.
 * Available for Ubuntu, Browser, and Windows instances.
 */
export function computerTool(instance: BaseInstance) {
    return tool({
        name: "computer",
        description: "Control mouse and keyboard for computer interaction",
        parameters: z.object({
            action: z
                .enum([
                    "key",
                    "type",
                    "mouse_move",
                    "left_click",
                    "left_click_drag",
                    "right_click",
                    "middle_click",
                    "double_click",
                    "screenshot",
                    "cursor_position",
                    "scroll",
                    "wait",
                ])
                .describe("The computer action to execute"),
            coordinate: z.tuple([z.number(), z.number()]).optional().describe("Coordinates for mouse actions"),
            text: z.string().optional().describe("Text for keyboard actions"),
        }),
        execute: async (params) => {
            return instance.computer({ ...params });
        },
    });
}

/**
 * A filesystem editor tool that allows the agent to view, create, and edit files.
 * Available for Ubuntu instances only.
 */
export function editTool(instance: UbuntuInstance) {
    return tool({
        name: "str_replace_editor",
        description: "View, create, and edit files in the filesystem",
        parameters: z.object({
            command: z
                .enum(["view", "create", "str_replace", "insert", "undo_edit"])
                .describe("The edit command to execute"),
            path: z.string().describe("Path to the file to edit"),
            fileText: z.string().optional().describe("File content for create command"),
            viewRange: z.tuple([z.number(), z.number()]).optional().describe("Line range for view command"),
            oldStr: z.string().optional().describe("String to replace for replace command"),
            newStr: z.string().optional().describe("New string for replace command"),
            insertLine: z.number().optional().describe("Line number for insert command"),
        }),
        execute: async (params) => {
            return instance.edit({ ...params });
        },
    });
}

/**
 * A shell execution tool that allows the agent to run bash commands.
 * Available for Ubuntu instances only.
 */
export function bashTool(instance: UbuntuInstance) {
    return tool({
        name: "bash",
        description: "Execute bash commands in the shell",
        parameters: z.object({
            command: z.string().describe("The bash command to execute"),
            restart: z.boolean().optional().default(false).describe("Whether to restart the shell"),
        }),
        execute: async (params) => {
            return instance.bash({ ...params });
        },
    });
}

/**
 * A browser interaction tool that allows the agent to interact with a browser.
 * Available for Ubuntu and Browser instances.
 */
export function browserTool(instance: UbuntuInstance | BrowserInstance) {
    return tool({
        name: "browser",
        description: "Interact with a browser for web scraping and automation",
        parameters: z.object({
            command: z
                .enum(["go_to", "get_html", "evaluate", "click", "type", "screenshot", "get_text", "get_attribute"])
                .describe(
                    "The browser command to execute. Required parameters per command:\n- go_to: requires 'url'\n- evaluate: requires 'code'\n- click: requires 'selector'\n- type: requires 'selector' and 'text'\n- get_text: requires 'selector'\n- get_attribute: requires 'selector' and 'attribute'\n- get_html: no additional parameters\n- screenshot: no additional parameters",
                ),
            url: z.string().optional().describe("URL for go_to command (required for go_to)"),
            selector: z
                .string()
                .optional()
                .describe("CSS selector for element operations (required for click, type, get_text, get_attribute)"),
            code: z.string().optional().describe("JavaScript code for evaluate command (required for evaluate)"),
            text: z.string().optional().describe("Text to type for type command (required for type)"),
            timeout: z.number().optional().default(30000).describe("Timeout in milliseconds for operations"),
            attribute: z
                .string()
                .optional()
                .describe("Attribute name for get_attribute command (required for get_attribute)"),
        }),
        execute: async (params) => {
            const { command, url, selector, code, text, timeout = 30000, attribute } = params;

            // Get CDP URL based on instance type
            const cdpUrl =
                instance instanceof UbuntuInstance ? await instance.browser.getCdpUrl() : await instance.getCdpUrl();

            if (!cdpUrl.cdpUrl) {
                throw new Error("CDP URL is not available, start the browser first");
            }

            const browser = await chromium.connectOverCDP(cdpUrl.cdpUrl);
            try {
                const context = browser.contexts()[0];
                const page = context.pages().length ? context.pages()[0] : await context.newPage();

                try {
                    switch (command) {
                        case "go_to":
                            if (!url) throw new Error("URL is required for go_to command");
                            await page.goto(url, { timeout });
                            return true;

                        case "get_html":
                            try {
                                return await page.evaluate("document.documentElement.outerHTML");
                            } catch {
                                // If page is navigating, just return what we can get
                                return await page.evaluate("document.documentElement.innerHTML");
                            }

                        case "evaluate":
                            if (!code) throw new Error("Code is required for evaluate command");
                            return await page.evaluate(code);

                        case "click":
                            if (!selector) throw new Error("Selector is required for click command");
                            await page.click(selector, { timeout });
                            return true;

                        case "type":
                            if (!selector) throw new Error("Selector is required for type command");
                            if (!text) throw new Error("Text is required for type command");
                            await page.type(selector, text, { timeout });
                            return true;

                        case "screenshot":
                            const screenshot = await page.screenshot({ type: "png" });
                            return imageResult(screenshot.toString("base64"));

                        case "get_text":
                            if (!selector) throw new Error("Selector is required for get_text command");
                            const textElement = await page.waitForSelector(selector, { timeout });
                            if (!textElement) throw new Error(`Element not found: ${selector}`);
                            return await textElement.textContent();

                        case "get_attribute":
                            if (!selector) throw new Error("Selector is required for get_attribute command");
                            if (!attribute) throw new Error("Attribute is required for get_attribute command");
                            const element = await page.waitForSelector(selector, { timeout });
                            if (!element) throw new Error(`Element not found: ${selector}`);
                            return await element.getAttribute(attribute);

                        default:
                            throw new Error(`Unknown command: ${command}`);
                    }
                } catch (error: any) {
                    throw new Error(`Browser command failed: ${error?.message || String(error)}`);
                }
            } finally {
                await browser.close();
            }
        },
    });
}
