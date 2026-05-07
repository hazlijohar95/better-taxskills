#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./tools.js";
import { registerResources } from "./resources.js";
import { registerPrompts } from "./prompts.js";

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

registerTools(server);
registerResources(server);
registerPrompts(server);

const transport = new StdioServerTransport();
await server.connect(transport);
