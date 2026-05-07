import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadReference, loadData, loadSkill, listReferences, listDataFiles } from "./skill-loader.js";

export function registerResources(server: McpServer): void {
  server.resource(
    "skill://malaysian-tax/skill",
    "malaysian-tax://skill.md",
    {
      description: "Main skill file — preflight gates, command router, compute procedure, absolute bans, validation checks",
      mimeType: "text/markdown",
    },
    async () => ({
      contents: [
        {
          uri: "malaysian-tax://skill.md",
          mimeType: "text/markdown",
          text: loadSkill(),
        },
      ],
    })
  );

  const references = listReferences();
  for (const ref of references) {
    const name = ref.replace(".md", "");
    server.resource(
      `skill://malaysian-tax/reference/${name}`,
      `malaysian-tax://reference/${ref}`,
      {
        description: `Domain reference: ${name.replace(/-/g, " ")}`,
        mimeType: "text/markdown",
      },
      async () => ({
        contents: [
          {
            uri: `malaysian-tax://reference/${ref}`,
            mimeType: "text/markdown",
            text: loadReference(ref),
          },
        ],
      })
    );
  }

  const dataFiles = listDataFiles();
  for (const file of dataFiles) {
    const name = file.replace(".json", "");
    server.resource(
      `skill://malaysian-tax/data/${name}`,
      `malaysian-tax://data/${file}`,
      {
        description: `Structured data: ${name.replace(/-/g, " ")}`,
        mimeType: "application/json",
      },
      async () => ({
        contents: [
          {
            uri: `malaysian-tax://data/${file}`,
            mimeType: "application/json",
            text: JSON.stringify(loadData(file), null, 2),
          },
        ],
      })
    );
  }
}
