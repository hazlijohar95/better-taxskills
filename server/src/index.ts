#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./tools/index.js";
import { registerResources } from "./resources/index.js";
import { registerPrompts } from "./prompts/index.js";
import { warmCache } from "./content/loader.js";
import { logger } from "./logger.js";

const server = new McpServer(
  {
    name: "malaysian-tax",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: { listChanged: false },
      resources: { subscribe: false, listChanged: false },
      prompts: { listChanged: false },
    },
    instructions:
      "Malaysian tax computation MCP server. Provides tools for computing tax (ITA 1967), RPGT (RPGTA 1976), stamp duty (SA 1949), and full practice lifecycle management. All tools require actual financial data — never fabricate figures.",
  }
);

const fileLists = await warmCache();
registerTools(server);
registerResources(server, fileLists);
await registerPrompts(server);

const transport = new StdioServerTransport();
await server.connect(transport);

logger.info("server_started", { transport: "stdio" });

function shutdown() {
  logger.info("server_stopping");
  server.close().then(() => process.exit(0));
  setTimeout(() => process.exit(1), 5000);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
