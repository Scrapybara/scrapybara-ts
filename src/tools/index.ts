import { z } from "zod";
import { Tool } from "../api/types/Tool";
import { BaseInstance, UbuntuInstance } from "../ScrapybaraClient";

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
                    "move_mouse",
                    "click_mouse",
                    "drag_mouse",
                    "scroll",
                    "press_key",
                    "type_text",
                    "wait",
                    "take_screenshot",
                    "get_cursor_position",
                ])
                .describe("The computer action to execute"),
            button: z.enum(["left", "right", "middle", "back", "forward"]).optional().describe("The button to click"),
            click_type: z.enum(["down", "up", "click"]).optional().describe("The type of click to perform"),
            coordinates: z.array(z.number()).optional().describe("The coordinates to move to"),
            delta_x: z.number().optional().describe("The x delta to move"),
            delta_y: z.number().optional().describe("The y delta to move"),
            num_clicks: z.number().optional().describe("The number of clicks to perform"),
            hold_keys: z.array(z.string()).optional().describe("The keys to hold"),
            path: z.array(z.array(z.number())).optional().describe("The path to move to"),
            keys: z.array(z.string()).optional().describe("The keys to press"),
            text: z.string().optional().describe("The text to type"),
            duration: z.number().optional().describe("The duration to wait"),
        }),
        execute: async (params) => {
            if (params.action === "move_mouse") {
                if (!params.coordinates) {
                    throw new Error("coordinates is required for move_mouse action");
                }
                return instance.computer({
                    action: params.action,
                    coordinates: params.coordinates,
                    holdKeys: params.hold_keys,
                });
            } else if (params.action === "click_mouse") {
                if (!params.button) {
                    throw new Error("button is required for click_mouse action");
                }
                return instance.computer({
                    action: params.action,
                    button: params.button,
                    clickType: params.click_type,
                    coordinates: params.coordinates,
                    numClicks: params.num_clicks,
                    holdKeys: params.hold_keys,
                });
            } else if (params.action === "drag_mouse") {
                if (!params.path) {
                    throw new Error("path is required for drag_mouse action");
                }
                return instance.computer({
                    action: params.action,
                    path: params.path,
                    holdKeys: params.hold_keys,
                });
            } else if (params.action === "scroll") {
                return instance.computer({
                    action: params.action,
                    coordinates: params.coordinates,
                    deltaX: params.delta_x,
                    deltaY: params.delta_y,
                    holdKeys: params.hold_keys,
                });
            } else if (params.action === "press_key") {
                if (!params.keys) {
                    throw new Error("keys is required for press_key action");
                }
                return instance.computer({
                    action: params.action,
                    keys: params.keys,
                    duration: params.duration,
                });
            } else if (params.action === "type_text") {
                if (!params.text) {
                    throw new Error("text is required for type_text action");
                }
                return instance.computer({
                    action: params.action,
                    text: params.text,
                    holdKeys: params.hold_keys,
                });
            } else if (params.action === "wait") {
                if (params.duration === undefined) {
                    throw new Error("duration is required for wait action");
                }
                return instance.computer({
                    action: params.action,
                    duration: params.duration,
                });
            } else if (params.action === "take_screenshot") {
                return instance.computer({ action: params.action });
            } else if (params.action === "get_cursor_position") {
                return instance.computer({ action: params.action });
            } else {
                throw new Error(`Unknown action: ${params.action}`);
            }
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
            file_text: z.string().optional().describe("File content for create command"),
            view_range: z.array(z.number()).optional().describe("Line range for view command"),
            old_str: z.string().optional().describe("String to replace for replace command"),
            new_str: z.string().optional().describe("New string for replace command"),
            insert_line: z.number().optional().describe("Line number for insert command"),
        }),
        execute: async (params) => {
            return instance.edit({
                command: params.command,
                path: params.path,
                fileText: params.file_text,
                viewRange: params.view_range,
                oldStr: params.old_str,
                newStr: params.new_str,
                insertLine: params.insert_line,
            });
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
            command: z.string().optional().describe("The bash command to execute"),
            session: z.number().optional().describe("Session ID to use for command execution"),
            restart: z.boolean().optional().default(false).describe("Whether to restart the shell"),
            listSessions: z.boolean().optional().default(false).describe("Whether to list available sessions"),
            checkSession: z.number().optional().describe("Session ID to check if it exists"),
            timeout: z.number().optional().describe("Timeout for command execution"),
        }),
        execute: async (params) => {
            return instance.bash({
                command: params.command,
                session: params.session,
                restart: params.restart,
                listSessions: params.listSessions,
                checkSession: params.checkSession,
                timeout: params.timeout,
            });
        },
    });
}