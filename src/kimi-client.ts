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
    const details = [`Kimi API HTTP ${response.status}`];
    const error = (await response.json().catch(() => null))?.error;

    for (const field of ["message", "type", "code"]) {
      const value = error?.[field];
      if (value != null) details.push(`${field}: ${value}`);
    }

    for (const name of ["X-Msh-Track-Id", "X-Msh-Chat-Id"]) {
      const value = response.headers.get(name);
      if (value) details.push(`${name}: ${value}`);
    }

    throw new Error(details.join("\n"));
  }

  return await response.json();
}
