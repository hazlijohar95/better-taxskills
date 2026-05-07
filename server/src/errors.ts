import { logger } from "./logger.js";

export class ContentNotFoundError extends Error {
  constructor(public readonly path: string) {
    super(`Content not found: ${path}`);
    this.name = "ContentNotFoundError";
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

import type { ToolResult } from "./tools/types.js";

export function toolError(message: string): ToolResult {
  return {
    content: [{ type: "text", text: message }],
    isError: true,
  };
}

type ToolHandler = (args: Record<string, unknown>) => Promise<ToolResult>;

export function wrapToolHandler(name: string, handler: ToolHandler): ToolHandler {
  return async (args) => {
    try {
      return await handler(args);
    } catch (err) {
      if (err instanceof ContentNotFoundError) {
        logger.error("content_not_found", { tool: name, path: err.path });
        return toolError(`Reference file not found: ${err.path}. This is a server configuration issue.`);
      }
      if (err instanceof ValidationError) {
        logger.warn("validation_error", { tool: name, message: err.message });
        return toolError(err.message);
      }
      const message = err instanceof Error ? err.message : String(err);
      logger.error("tool_error", { tool: name, error: message });
      return toolError(`Internal error in tool "${name}". Check server logs for details.`);
    }
  };
}
