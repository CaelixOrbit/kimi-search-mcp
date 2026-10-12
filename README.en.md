# Kimi Search MCP

[中文](README.md)

An unofficial local MCP server for Kimi web search, using an Open Platform API key. Supports the China and international platforms. Supports stdio only.

## Requirements

- Node.js 22 or later
- npm
- A Moonshot Open Platform API key

## Installation and Startup

Global npm installation is recommended for regular use. It has low startup overhead and requires no source build. npx is easy to configure and suitable for a quick trial, but has higher startup overhead. Build from source when you need to modify the code.

The following examples use Kimi Code Desktop. Merge the configuration into the user-level `~/.kimi-code/mcp.json` and replace the API key placeholder.

After saving the configuration, if the tools do not appear in the MCP list or the changes have not taken effect, try restarting the client.

### Global npm Installation (Recommended)

```shell
npm install -g kimi-search-mcp@latest
```

After installation, use the following launch configuration:

- Windows:

  ```json
  {
    "mcpServers": {
      "kimi-search": {
        "command": "cmd",
        "args": ["/c", "kimi-search-mcp"],
        "env": {
          "MOONSHOT_API_KEY": "YOUR_MOONSHOT_API_KEY",
          "KIMI_REGION": "cn",
          "KIMI_ENABLE_WEB_FETCH": "false"
        },
        "toolTimeoutMs": 80000
      }
    }
  }
  ```

- macOS / Linux:

  ```json
  {
    "mcpServers": {
      "kimi-search": {
        "command": "kimi-search-mcp",
        "args": [],
        "env": {
          "MOONSHOT_API_KEY": "YOUR_MOONSHOT_API_KEY",
          "KIMI_REGION": "cn",
          "KIMI_ENABLE_WEB_FETCH": "false"
        },
        "toolTimeoutMs": 80000
      }
    }
  }
  ```

### Quick Trial with npx

npx requires no global installation or source build, but has higher startup overhead than a global installation.

- Windows:

  ```json
  {
    "mcpServers": {
      "kimi-search": {
        "command": "cmd",
        "args": ["/c", "npx", "-y", "kimi-search-mcp@latest"],
        "env": {
          "MOONSHOT_API_KEY": "YOUR_MOONSHOT_API_KEY",
          "KIMI_REGION": "cn",
          "KIMI_ENABLE_WEB_FETCH": "false"
        },
        "toolTimeoutMs": 80000
      }
    }
  }
  ```

- macOS / Linux:

  ```json
  {
    "mcpServers": {
      "kimi-search": {
        "command": "npx",
        "args": ["-y", "kimi-search-mcp@latest"],
        "env": {
          "MOONSHOT_API_KEY": "YOUR_MOONSHOT_API_KEY",
          "KIMI_REGION": "cn",
          "KIMI_ENABLE_WEB_FETCH": "false"
        },
        "toolTimeoutMs": 80000
      }
    }
  }
  ```

The first launch requires an internet connection to download the package.

### Build From Source

Download the source code from the [GitHub repository](https://github.com/CaelixOrbit/kimi-search-mcp) and run the following commands in the project root:

```shell
npm ci
npm run build
```

Build output is generated in `dist`. Merge the configuration below into the client's MCP configuration and replace the API key placeholder. The following example is for Windows; replace the paths with the actual absolute paths:

```json
{
  "mcpServers": {
    "kimi-search": {
      "command": "node",
      "args": ["C:/path/to/kimi-search-mcp/dist/index.js"],
      "env": {
        "MOONSHOT_API_KEY": "YOUR_MOONSHOT_API_KEY",
        "KIMI_REGION": "cn",
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

For interface differences, parameters, and usage recommendations, see [China Web Search Best Practices](https://platform.kimi.com/docs/guide/best-practices-for-web-search) and [International Web Search Best Practices](https://platform.kimi.ai/docs/guide/best-practices-for-web-search).

## Environment Variables

| Variable | Rule |
| --- | --- |
| `MOONSHOT_API_KEY` | Required; use an Open Platform API key created on the selected platform |
| `KIMI_REGION` | `cn` (default) for China; `global` for the international platform |
| `KIMI_ENABLE_WEB_FETCH` | Controls whether the `kimi_web_fetch` tool is enabled; disabled by default |

The platform is selected at startup and applies to all three tools. If `KIMI_REGION` is unset, the China platform is used, so existing users do not need to change their configuration. Only international users need to explicitly set it to `global`.

> **Note:** API keys for the China and international platforms are independent and cannot be mixed. When changing `KIMI_REGION`, also replace `MOONSHOT_API_KEY` with a key created on the corresponding platform. See the [API Key Region Troubleshooting](https://platform.kimi.ai/docs/guide/troubleshooting).
> 
> Create an API key: [China API Key Management](https://platform.kimi.com/console/api-keys), [International API Key Management](https://platform.kimi.ai/console/api-keys).

Since many agent applications already provide free web-fetch (web_fetch) functionality, the paid `kimi_web_fetch` tool is disabled by default and does not appear in the client's tool list. Set `KIMI_ENABLE_WEB_FETCH` to `"true"` to enable it if needed.

## Billing

Calls use your Open Platform account credits on the selected platform. For current prices and billing rules, see [China Web Search and Web Fetch Pricing](https://platform.kimi.com/docs/pricing/websearch) and [International Web Search and Web Fetch Pricing](https://platform.kimi.ai/docs/pricing/websearch).

## License

MIT. Copyright (c) 2026 Caelix.
