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
            command: z.string().describe("The bash command to execute"),
            restart: z.boolean().optional().default(false).describe("Whether to restart the shell"),
            getBackgroundProcesses: z.boolean().optional().describe("Retrieve information (pid, status, command) about background processes"),
            killPid: z.number().optional().describe("Process ID to kill"),
        }),
        execute: async (params) => {
            return instance.bash({
                command: params.command,
                restart: params.restart,
                getBackgroundProcesses: params.getBackgroundProcesses,
                killPid: params.killPid,
            });
        },
    });
}

/**
 * A filesystem tool that allows the agent to perform various file operations.
 * Available for Ubuntu instances only.
 */
export function filesystemTool(instance: UbuntuInstance) {
    return tool({
        name: "filesystem",
        description: "Perform various filesystem operations like reading, writing, and managing files and directories",
        parameters: z.object({
            command: z.string().describe("The filesystem command to execute. Determines which other parameters are required or optional. Supported commands: read, write, append, delete, exists, list, mkdir, rmdir, move, copy, view, create, replace, insert, delete_lines, undo, grep."),
            path: z.string().optional().describe("Path to the file or directory. Required for commands: read, write, append, delete, exists, list, mkdir, rmdir, view, create, replace, insert, delete_lines, undo, grep."),
            content: z.string().optional().describe("Content to write, append, or create in a file. Required for commands: write, append, create."),
            mode: z.string().optional().describe("Mode for file operations ('text' or 'binary'). Optional for commands: read, write, append, create. Defaults to 'text' if not specified."),
            encoding: z.string().optional().describe("Encoding for text operations (e.g., 'utf-8'). Optional for commands: read, write, append, create. Defaults to 'utf-8' if not specified."),
            viewRange: z.array(z.number()).optional().describe("Range of lines to view as [start, end]. Optional for command: view. Not applicable if viewing a directory."),
            recursive: z.boolean().optional().describe("Whether to perform the operation recursively. Optional for command: delete (defaults to False); required to be True for grep when searching directories."),
            src: z.string().optional().describe("Source path for move and copy operations. Required for commands: move, copy."),
            dst: z.string().optional().describe("Destination path for move and copy operations. Required for commands: move, copy."),
            oldStr: z.string().optional().describe("String to be replaced in the file. Required for command: replace."),
            newStr: z.string().optional().describe("Replacement string. Required for command: replace."),
            line: z.number().optional().describe("Line number where text should be inserted (1-based index). Required for command: insert."),
            text: z.string().optional().describe("Text to insert at the specified line. Required for command: insert."),
            lines: z.array(z.number()).optional().describe("List of line numbers to delete (1-based indices). Required for command: delete_lines."),
            allOccurrences: z.boolean().optional().describe("Whether to replace all occurrences of old_str. Optional for command: replace. Defaults to False, replacing only the first occurrence."),
            pattern: z.string().optional().describe("Regex pattern to search for in files. Required for command: grep."),
            caseSensitive: z.boolean().optional().describe("Whether the grep search is case-sensitive. Optional for command: grep. Defaults to True."),
            lineNumbers: z.boolean().optional().describe("Whether to include line numbers in grep output. Optional for command: grep. Defaults to True."),
        }),
        execute: async (params) => {
            return instance.filesystem({
                command: params.command,
                path: params.path,
                content: params.content,
                mode: params.mode,
                encoding: params.encoding,
                viewRange: params.viewRange,
                recursive: params.recursive,
                src: params.src,
                dst: params.dst,
                oldStr: params.oldStr,
                newStr: params.newStr,
                line: params.line,
                text: params.text,
                lines: params.lines,
                allOccurrences: params.allOccurrences,
                pattern: params.pattern,
                caseSensitive: params.caseSensitive,
                lineNumbers: params.lineNumbers,
            });
        },
    });
}
