import { readFileSync } from "node:fs";

import { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";

import type { Config } from "./config.js";
import { requestKimi } from "./kimi-client.js";

const { name, version }: { name: string; version: string } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8")
);

export function createServer(config: Config) {
  const server = new McpServer({
    name,
    version
  });

  server.registerTool(
    "kimi_search_basic",
    {
      description: "Run a web search and get a list of structured results with title, snippet, site, and URL.",
      inputSchema: z.object({
        text_query: z.string().min(1).describe("Search query text. Must not be empty."),
        limit: z.number().int().min(1).max(20).default(5).describe("Maximum number of results to return, from 1 to 20. Defaults to 5."),
        timeout_seconds: z.number().int().min(1).max(60).default(30).describe("Search timeout in seconds, from 1 to 60. Defaults to 30 in this MCP server."),
        include_content: z.boolean().default(false).describe("Whether to return full page content in each result's `text` field. Defaults to false.")
      })
    },
    async (args) => {
      try {
        const data = await requestKimi(
          config.apiKey,
          config.baseUrl,
          "/v1/tools/search",
          args
        );

        return {
          structuredContent: data,
          content: [{ type: "text", text: JSON.stringify(data) }]
        };
      } catch (error) {
        return {
          isError: true,
          content: [{
            type: "text",
            text: error instanceof Error ? error.message : String(error)
          }]
        };
      }
    }
  );

  server.registerTool(
    "kimi_search_pro",
    {
      description: "On top of Web Search Basic, this endpoint lets you restrict results to specific sites with `sites` (multiple sites are OR'd, up to 5), constrain the time range with `time_window`, and return structured content chunks (`chunks`) for each result. Ideal for retrieval scenarios that require control over sources and freshness.",
      inputSchema: z.object({
        text_query: z.string().min(1).describe("Search query text. Must not be empty."),
        limit: z.number().int().min(1).max(20).default(5).describe("Maximum number of results to return, from 1 to 20. Defaults to 5."),
        timeout_seconds: z.number().int().min(1).max(60).default(30).describe("Search timeout in seconds, from 1 to 60. Defaults to 30 in this MCP server."),
        sites: z.array(z.string()).max(5).optional().describe("Restrict results to the given sites. Multiple sites are OR'd, up to 5 entries; each entry must be non-empty and must not contain whitespace or parentheses."),
        time_window: z.object({
          start: z.string().optional().describe("Lower bound of the time window, in YYYY / YYYY-MM / YYYY-MM-DD format."),
          end: z.string().optional().describe("Upper bound of the time window, in YYYY / YYYY-MM / YYYY-MM-DD format.")
        }).optional().describe("Time-window constraint on result dates. start and end are each normalized to the first day of their period before comparison; start must not be later than end.")
      })
    },
    async (args) => {
      try {
        const data = await requestKimi(
          config.apiKey,
          config.baseUrl,
          "/v1/tools/search_pro",
          args
        );

        return {
          structuredContent: data,
          content: [{ type: "text", text: JSON.stringify(data) }]
        };
      } catch (error) {
        return {
          isError: true,
          content: [{
            type: "text",
            text: error instanceof Error ? error.message : String(error)
          }]
        };
      }
    }
  );

  if (config.enableWebFetch) {
    server.registerTool(
      "kimi_web_fetch",
      {
        description: "Fetch the content of a URL and get the page title and body text in Markdown. Ideal for content extraction scenarios such as web reading and data curation.",
        inputSchema: z.object({
          url: z.string().describe("URL of the page to fetch. Only http and https are supported.")
        })
      },
      async (args) => {
        try {
          const data = await requestKimi(
            config.apiKey,
            config.baseUrl,
            "/v1/tools/fetch",
            args
          );

          return {
            structuredContent: data,
            content: [{ type: "text", text: JSON.stringify(data) }]
          };
        } catch (error) {
          return {
            isError: true,
            content: [{
              type: "text",
              text: error instanceof Error ? error.message : String(error)
            }]
          };
        }
      }
    );
  }

  return server;
}
