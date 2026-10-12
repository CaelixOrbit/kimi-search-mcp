export async function requestKimi(
  apiKey: string,
  baseUrl: string,
  path: string,
  body: object
): Promise<Record<string, unknown>> {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(70_000),
    redirect: "error"
  });

  if (!response.ok) {
    throw new Error(`Kimi API HTTP ${response.status}`);
  }

  return await response.json();
}