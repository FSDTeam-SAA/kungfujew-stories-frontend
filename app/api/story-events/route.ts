import { API_BASE } from "@/lib/api/base"
import { readStoryEvent, validateStoryEvent } from "@/lib/story-event-request"

export async function POST(request: Request) {
  let event: ReturnType<typeof validateStoryEvent>
  try {
    event = validateStoryEvent(await readStoryEvent(request))
  } catch {
    return Response.json({ success: false, message: "Invalid story event" }, { status: 400, headers: { "Cache-Control": "no-store" } })
  }
  try {
    const { storyId, ...body } = event
    const response = await fetch(`${API_BASE}/api/v1/real-shipment-stories/${storyId}/events`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      cache: "no-store", signal: AbortSignal.timeout(5000),
    })
    return new Response(null, { status: response.ok ? 204 : response.status === 429 ? 429 : 503, headers: { "Cache-Control": "no-store" } })
  } catch {
    return new Response(null, { status: 503, headers: { "Cache-Control": "no-store" } })
  }
}
