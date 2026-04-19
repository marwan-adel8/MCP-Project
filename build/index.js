import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
// Create server instance
const server = new McpServer({
    name: "first-mcp",
    version: "1.0.0",
});
server.registerTool("add-numbers", {
    description: "Add two numbers",
    inputSchema: z.object({
        a: z.number().describe("The first number to add"),
        b: z.number().describe("The second number to add"),
    }),
}, async ({ a, b }) => {
    return {
        content: [
            {
                type: "text",
                text: `The sum of ${a} and ${b} is ${a + b}`,
            },
        ],
    };
});
server.registerTool("get_repos_of_user", {
    description: "Get the repositories of a user",
    inputSchema: z.object({
        username: z.string().describe("The username of the user"),
    }),
}, async ({ username }) => {
    const res = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            "User-Agent": "First-MCP",
        }
    });
    if (!res.ok)
        throw new Error(`Failed to fetch repositories for user ${username}`);
    const repos = await res.json();
    const repoNames = repos.map((repo, index) => `${index + 1}. ${repo.name}`).join("\n\n");
    return {
        content: [
            {
                type: "text",
                text: `github repositories of ${username}: (${repos.length} repos :)\n\n${repoNames}`,
            },
        ],
    };
});
server.registerResource("tips_for_studying", "tips:/all", {
    description: "Get all tips for studying",
    mimeType: "text/plain",
}, async (uri) => {
    const uriString = uri.toString();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const tips = await fs.readFile(path.resolve(__dirname, "../src/data/study_tips.docs"), "utf8");
    return {
        contents: [
            {
                uri: uriString,
                mimeType: "text/plain",
                text: tips,
            },
        ],
    };
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
