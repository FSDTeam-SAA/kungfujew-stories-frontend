import assert from "node:assert/strict"
import { test } from "node:test"
import { parseStoryQuery, storyPageHref } from "../lib/story-query.ts"
import { advanceEngagement, articleProgress } from "../lib/story-engagement.ts"
import { parsePublishedStorySummary } from "../lib/api/story-response.ts"
import { readStoryEvent, validateStoryEvent } from "../lib/story-event-request.ts"

test("normalizes list URLs without trusting array, invalid, or unbounded parameters", () => {
  assert.deepEqual(parseStoryQuery({ page: "-1", serviceLine: "invalid", search: ["bad"] }), { page: 1, search: "", serviceLine: "all" })
  assert.equal(parseStoryQuery({ page: "999999999" }).page, 1000000)
  const query = parseStoryQuery({ page: "3", search: "  Dallas & Austin  ", serviceLine: "freight" })
  assert.equal(storyPageHref(query, 2), "/stories?search=Dallas+%26+Austin&serviceLine=freight&page=2")
  assert.equal(storyPageHref({ page: 2, search: "", serviceLine: "all" }, 1), "/stories")
})

test("counts only visible active article time and requires both time and progress for completion", () => {
  let state = { activeSeconds: 0, progress: 0 }
  state = advanceEngagement(state, 20, false, 100)
  assert.deepEqual(state, { activeSeconds: 0, progress: 0 })
  state = advanceEngagement(state, 29, true, 95)
  assert.equal(state.activeSeconds, 29)
  state = advanceEngagement(state, 1, true, 95)
  assert.deepEqual(state, { activeSeconds: 30, progress: 95 })
  assert.equal(articleProgress({ top: 900, height: 1000 }, 800), 0)
  assert.equal(articleProgress({ top: -100, height: 1000 }, 800), 90)
  assert.equal(articleProgress({ top: -900, height: 1000 }, 800), 100)
})

test("cover positioning defaults legacy records and validates both coordinates", () => {
  const story = { _id: "id", title: "Move", slug: "move", metaDescription: "Details", pickupLocation: "A", destination: "B", shipmentType: "Car", shipmentStatus: "delivered", createdAt: "2026-10-22", isPublished: true, serviceLine: "vehicle" }
  assert.deepEqual(parsePublishedStorySummary(story).coverPosition, { x: 50, y: 50 })
  assert.deepEqual(parsePublishedStorySummary({ ...story, coverPosition: { x: 10, y: 80 } }).coverPosition, { x: 10, y: 80 })
  for (const coverPosition of [{ x: -1, y: 0 }, { x: 101, y: 1 }, { x: "1", y: 1 }, null]) {
    assert.throws(() => parsePublishedStorySummary({ ...story, coverPosition }), /cover position/)
  }
})

const event = { storyId: "a".repeat(24), viewId: "12345678-1234-4123-8123-123456789012", event: "open", activeSeconds: 0, progress: 0 }
const request = (body, origin = "https://stories.example") => new Request("https://stories.example/api/story-events", { method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify(body) })

test("collector bounds JSON and rejects cross-origin requests before forwarding", async () => {
  assert.deepEqual(validateStoryEvent(await readStoryEvent(request(event))), event)
  await assert.rejects(readStoryEvent(request(event, "https://elsewhere.example")), /origin/)
  await assert.rejects(readStoryEvent(request({ text: "x".repeat(2049) })), /large/)
  await assert.rejects(readStoryEvent(request([])), /Invalid event/)
  for (const invalid of [{ ...event, storyId: "https://internal" }, { ...event, progress: 101 }, { ...event, activeSeconds: NaN }, { ...event, viewId: "bad" }]) {
    assert.throws(() => validateStoryEvent(invalid), /Invalid event/)
  }
})

test("collector uses the incoming host when Next reconstructs an internal localhost URL", async () => {
  const incoming = new Request("http://localhost:3098/api/story-events", {
    method: "POST", headers: { Host: "127.0.0.1:3098", Origin: "http://127.0.0.1:3098", "Content-Type": "application/json" }, body: JSON.stringify(event),
  })
  assert.deepEqual(await readStoryEvent(incoming), event)
})
