const MAX_EVENT_BYTES = 2048

export async function readStoryEvent(request: Request): Promise<Record<string, unknown>> {
  const incomingUrl = new URL(request.url)
  // Next can reconstruct localhost internally; Host retains the browser's authority.
  const incomingHost = request.headers.get("host")
  if (incomingHost) incomingUrl.host = incomingHost
  const fetchSite = request.headers.get("sec-fetch-site")
  if (request.headers.get("origin") !== incomingUrl.origin || (fetchSite && fetchSite !== "same-origin")) throw new Error("Invalid origin")
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") throw new Error("Invalid content type")
  const reader = request.body?.getReader()
  if (!reader) throw new Error("Missing event")
  const chunks: Uint8Array[] = []
  let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_EVENT_BYTES) {
        await reader.cancel()
        throw new Error("Event too large")
      }
      chunks.push(value)
    }
  } finally {
    reader.releaseLock()
  }
  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength }
  const value: unknown = JSON.parse(new TextDecoder().decode(bytes))
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid event")
  return value as Record<string, unknown>
}

export function validateStoryEvent(value: Record<string, unknown>) {
  const { storyId, viewId, event, activeSeconds, progress } = value
  if (typeof storyId !== "string" || !/^[a-f\d]{24}$/i.test(storyId) ||
      typeof viewId !== "string" || !/^[a-f\d]{8}-(?:[a-f\d]{4}-){3}[a-f\d]{12}$/i.test(viewId) ||
      (event !== "open" && event !== "engaged" && event !== "complete") ||
      typeof activeSeconds !== "number" || !Number.isFinite(activeSeconds) || activeSeconds < 0 || activeSeconds > 86400 ||
      typeof progress !== "number" || !Number.isFinite(progress) || progress < 0 || progress > 100) throw new Error("Invalid event")
  return { storyId, viewId, event, activeSeconds, progress }
}
