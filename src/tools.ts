import { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";

import type { Config } from "./config.js";
import { requestKimi } from "./kimi-client.js";

export function createServer(config: Config) {
	const server = new McpServer({
		name: "kimi-search-mcp",
		version: "1.0.1"
	});

	server.registerTool(
		"kimi_search_basic",
		{
			description: "Search webpages with Kimi Search Basic.",
			inputSchema: z.object({
				text_query: z.string().min(1),
				limit: z.number().int().min(1).max(20).default(5),
				timeout_seconds: z.number().int().min(1).max(60).default(30),
				include_content: z.boolean().default(false)
			})
		},
		async (args) => {
			try {
				const data = await requestKimi(
					config.apiKey,
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
			description: "Search with Kimi Search Pro, returning text chunks and relevance scores.",
			inputSchema: z.object({
				text_query: z.string().min(1),
				limit: z.number().int().min(1).max(20).default(5),
				timeout_seconds: z.number().int().min(1).max(60).default(30),
				sites: z.array(z.string()).max(5).optional(),
				time_window: z.object({
					start: z.string().optional(),
					end: z.string().optional()
				}).optional()
			})
		},
		async (args) => {
			try {
				const data = await requestKimi(
					config.apiKey,
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
				description: "Fetch a webpage as Markdown. This is an independent paid API call.",
				inputSchema: z.object({
					url: z.string()
				})
			},
			async (args) => {
				try {
					const data = await requestKimi(
						config.apiKey,
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