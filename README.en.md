# Kimi Search MCP

[中文](README.md)

An unofficial local MCP server for Kimi web search, using an Open Platform API key. Supports stdio only.

## Requirements

- Node.js 22 or later
- npm
- A Moonshot Open Platform API key

## Quick Start

Starting with npx is recommended. You do not need to download the source code or compile it yourself.

The following example uses Kimi Code Desktop. Merge the configuration into the user-level `~/.kimi-code/mcp.json` and replace the API key placeholder.

```json
{
  "mcpServers": {
    "kimi-search": {
      "command": "npx",
      "args": ["-y", "kimi-search-mcp@1.0.0"],
      "env": {
        "MOONSHOT_API_KEY": "YOUR_MOONSHOT_API_KEY",
        "KIMI_ENABLE_WEB_FETCH": "false"
      },
      "toolTimeoutMs": 80000
    }
  }
}
```

After saving, create a new session for the configuration to take effect. The first launch requires an internet connection to download the package.

## Installation

### Global npm Installation

```shell
npm install -g kimi-search-mcp@1.0.0
```

After installation, merge the configuration below into the client's MCP configuration and replace the API key placeholder:

```json
{
  "mcpServers": {
    "kimi-search": {
      "command": "kimi-search-mcp",
      "args": [],
      "env": {
        "MOONSHOT_API_KEY": "YOUR_MOONSHOT_API_KEY",
        "KIMI_ENABLE_WEB_FETCH": "false"
      },
      "toolTimeoutMs": 80000
    }
  }
}
```

### Build From Source

Download the source code and run the following commands in the project root:

```shell
npm ci
npm run build
```

Build output is generated in `dist`. Merge the configuration below into the client's MCP configuration and replace the API key placeholder. The following example is for Windows; replace the paths with the actual absolute paths:

```json
{
  "mcpServers": {
    "kimi-search": {
      "command": "C:/path/to/node.exe",
      "args": ["C:/path/to/kimi-search-mcp/dist/index.js"],
      "env": {
        "MOONSHOT_API_KEY": "YOUR_MOONSHOT_API_KEY",
        "KIMI_ENABLE_WEB_FETCH": "false"
      },
      "toolTimeoutMs": 80000
    }
  }
}
```

## Tools

| MCP Tool | Corresponding API |
| --- | --- |
| `kimi_search_basic` | [Web Search Basic](https://platform.kimi.com/docs/api/tools-search) |
| `kimi_search_pro` | [Web Search Pro](https://platform.kimi.com/docs/api/tools-search-pro) |
| `kimi_web_fetch` | [Web Fetch](https://platform.kimi.com/docs/api/tools-fetch), disabled by default |

See the official [Web Search Best Practices](https://platform.kimi.com/docs/guide/best-practices-for-web-search) for interface differences, parameters, and usage recommendations.

## Environment Variables

| Variable | Rule |
| --- | --- |
| `MOONSHOT_API_KEY` | Required; use an Open Platform API key |
| `KIMI_ENABLE_WEB_FETCH` | Controls whether the `kimi_web_fetch` tool is enabled; disabled by default |

Since many agent applications already provide free web-fetch (web_fetch) functionality, the paid `kimi_web_fetch` tool is disabled by default and does not appear in the client's tool list. Set `KIMI_ENABLE_WEB_FETCH` to `"true"` to enable it if needed.

Restart the MCP server after changing environment variables. In Kimi Code Desktop, create a new session to load the updated configuration.

## Billing

Calls use your Open Platform account credits. For current prices and billing rules, see the official [Web Search and Web Fetch Pricing](https://platform.kimi.com/docs/pricing/websearch).

## License

MIT. Copyright (c) 2026 Caelix.
