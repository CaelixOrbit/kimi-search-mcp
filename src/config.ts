export interface Config {
  apiKey: string;
  enableWebFetch: boolean;
}

export function readConfig(): Config {
  const apiKey = process.env.MOONSHOT_API_KEY;

  if (!apiKey) {
    throw new Error("Missing required environment variable MOONSHOT_API_KEY.");
  }

  return {
    apiKey,
    enableWebFetch: process.env.KIMI_ENABLE_WEB_FETCH === "true"
  };
}