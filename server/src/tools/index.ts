import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { wrapToolHandler } from "../errors.js";
import { logger } from "../logger.js";
import { ToolDefinition } from "./types.js";

import { compute } from "./compute.js";
import { audit } from "./audit.js";
import { strategy } from "./strategy.js";
import { compare } from "./compare.js";
import { rpgt } from "./rpgt.js";
import { individual } from "./individual.js";
import { transferPricing } from "./transfer-pricing.js";
import { international } from "./international.js";
import { group } from "./group.js";
import { incentive } from "./incentive.js";
import { checklist } from "./checklist.js";
import { calendar } from "./calendar.js";
import { yearEnd } from "./year-end.js";
import { takeover } from "./takeover.js";
import { dispute } from "./dispute.js";
import { stampDuty } from "./stamp-duty.js";
import { cp204 } from "./cp204.js";
import { lookupRate } from "./lookup-rate.js";

const ALL_TOOLS: ToolDefinition[] = [
  compute,
  audit,
  strategy,
  compare,
  rpgt,
  individual,
  transferPricing,
  international,
  group,
  incentive,
  checklist,
  calendar,
  yearEnd,
  takeover,
  dispute,
  stampDuty,
  cp204,
  lookupRate,
];

export function registerTools(server: McpServer): void {
  for (const tool of ALL_TOOLS) {
    server.tool(
      tool.name,
      tool.description,
      tool.schema,
      wrapToolHandler(tool.name, tool.handler)
    );
  }
  logger.info("tools_registered", { count: ALL_TOOLS.length });
}
