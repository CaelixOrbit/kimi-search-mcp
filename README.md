# Kimi Search MCP

[English](README.en.md)

非官方的本地 MCP Server，使用开放平台 API Key 调用 Kimi 联网搜索服务。仅支持 stdio。

## 环境要求

- Node.js 22 或更新版本
- npm
- Moonshot 开放平台 API Key

## 安装与启动

推荐使用 npm 全局安装，适合日常使用，启动开销较低且无需自行构建。npx 配置方便，适合快速试用，但启动开销较高；源码构建适合需要修改代码的用户。

以下以 Kimi Code 桌面版为例：将配置合并到用户级 `~/.kimi-code/mcp.json`，替换 API Key 占位符。

保存配置后，如工具未出现在 MCP 列表中，或配置变更未生效，可尝试重启客户端。

### npm 全局安装（推荐）

```shell
npm install -g kimi-search-mcp@latest
```

安装完成后，使用以下启动配置：

- Windows：

  ```json
  {
    "mcpServers": {
      "kimi-search": {
        "command": "cmd",
        "args": ["/c", "kimi-search-mcp"],
        "env": {
          "MOONSHOT_API_KEY": "YOUR_MOONSHOT_API_KEY",
          "KIMI_ENABLE_WEB_FETCH": "false"
        },
        "toolTimeoutMs": 80000
      }
    }
  }
  ```

- macOS / Linux：

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

### npx 快速试用

无需全局安装或自行编译，配置方便，但启动开销高于全局安装。

- Windows：
  
  ```json
  {
    "mcpServers": {
      "kimi-search": {
        "command": "cmd",
        "args": ["/c", "npx", "-y", "kimi-search-mcp@latest"],
        "env": {
          "MOONSHOT_API_KEY": "YOUR_MOONSHOT_API_KEY",
          "KIMI_ENABLE_WEB_FETCH": "false"
        },
        "toolTimeoutMs": 80000
      }
    }
  }
  ```

- macOS / Linux：

  ```json
  {
    "mcpServers": {
      "kimi-search": {
        "command": "npx",
        "args": ["-y", "kimi-search-mcp@latest"],
        "env": {
          "MOONSHOT_API_KEY": "YOUR_MOONSHOT_API_KEY",
          "KIMI_ENABLE_WEB_FETCH": "false"
        },
        "toolTimeoutMs": 80000
      }
    }
  }
  ```

首次启动需要联网下载包。

### 从源码构建

从 [GitHub 仓库](https://github.com/CaelixOrbit/kimi-search-mcp) 下载源码，在项目根目录执行：

```shell
npm ci
npm run build
```

构建产物位于 `dist`。将下方配置合并到客户端的 MCP 配置中，替换 API Key 占位符。下面以 Windows 为例，请填写实际绝对路径：

```json
{
  "mcpServers": {
    "kimi-search": {
      "command": "node",
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

## 工具

| MCP 工具            | 对应接口                                                             |
| ------------------- | -------------------------------------------------------------------- |
| `kimi_search_basic` | [联网搜索 Basic](https://platform.kimi.com/docs/api/tools-search)    |
| `kimi_search_pro`   | [联网搜索 Pro](https://platform.kimi.com/docs/api/tools-search-pro)  |
| `kimi_web_fetch`    | [网页抓取](https://platform.kimi.com/docs/api/tools-fetch)，默认关闭 |

接口区别、参数和使用建议见官方[联网搜索最佳实践](https://platform.kimi.com/docs/guide/best-practices-for-web-search)。

## 环境变量

| 变量                    | 规则                                         |
| ----------------------- | -------------------------------------------- |
| `MOONSHOT_API_KEY`      | 必填，使用开放平台 API Key                   |
| `KIMI_ENABLE_WEB_FETCH` | 控制是否启用 `kimi_web_fetch` 工具，默认关闭 |

考虑到不少 Agent 软件已经自带免费的网页抓取（web_fetch）功能，需要付费使用的 `kimi_web_fetch` 工具默认关闭，也不会出现在客户端的工具列表中。需要时，可将 `KIMI_ENABLE_WEB_FETCH` 设置为 `"true"` 来开启。

## 费用

调用使用开放平台账户额度，具体价格和计费规则以官方[联网搜索与网页抓取定价](https://platform.kimi.com/docs/pricing/websearch)为准。

## 许可证

MIT，Copyright (c) 2026 Caelix。
