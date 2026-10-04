#!/usr/bin/env node
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { readConfig } from "./config.js";
import { createServer } from "./tools.js";

try {
  const config = readConfig();
  serveStdio(() => createServer(config));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}