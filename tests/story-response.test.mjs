import assert from "node:assert/strict"
import { test } from "node:test"
import { fetchStoryResponse, parsePublishedStory, parsePublishedStoryList, safeStoryImage } from "../lib/api/story-response.ts"
import { storyStatusLabel } from "../lib/story-status.ts"
import { serializeJsonLd } from "../lib/json-ld.ts"
import { paginationPages } from "../lib/pagination.ts"

const story = { _id: "id", title: "A move", slug: "a-move", metaDescription: "Delivery", content: "<p>Details</p>", pickupLocation: "Austin", destination: "Boston", shipmentType: "Car", shipmentStatus: "delivered", createdAt: "2026-10-12T00:00:00.000Z", isPublished: true, serviceLine: "vehicle" }

test("validates public stories and pagination instead of trusting JSON", () => {
  assert.equal(parsePublishedStory(story).title, "A move")
  for (const invalid of [{ ...story, isPublished: false }, { ...story, title: {} }, { ...story, serviceLine: undefined }, { ...story, faqs: [null] }])
    assert.throws(() => parsePublishedStory(invalid))
  assert.throws(() => parsePublishedStoryList({ success: true, data: [story], pagination: { totalPages: "1000000" } }))
})

test("distinguishes missing stories from outages", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response("", { status: 404 }))
  assert.equal(await fetchStoryResponse("https://example.test/story"), null)
  globalThis.fetch = async () => new Response("", { status: 503 })
  await assert.rejects(fetchStoryResponse("https://example.test/story"), /temporarily unavailable/)
})

test("escapes script terminators in all structured story content", () => {
  const json = serializeJsonLd({ headline: '</script><script>alert(1)</script>' })
  assert.ok(!json.includes("<"))
  assert.equal(JSON.parse(json).headline, '</script><script>alert(1)</script>')
})

test("pagination remains bounded for a million pages", () => {
  assert.deepEqual(paginationPages(1, 1000000), [1, 2, 3, 4, 5])
  assert.deepEqual(paginationPages(999999, 1000000), [999996, 999997, 999998, 999999, 1000000])
  assert.deepEqual(paginationPages(1, 0), [])
})

test("prevents unsupported image sources from crashing the story page", () => {
  for (const image of ['javascript:alert(1)', 'http://example.com/photo.jpg', '//example.com/photo.jpg', '/\\example.com/photo.jpg', 'https://user:secret@example.com/photo.jpg'])
    assert.equal(safeStoryImage(image), undefined)
  assert.equal(safeStoryImage('/photo.jpg'), '/photo.jpg')
  assert.equal(safeStoryImage('https://res.cloudinary.com/photo.jpg'), 'https://res.cloudinary.com/photo.jpg')
})

test("shows shipment status without inventing a transport method or condition", () => {
  assert.equal(storyStatusLabel('pending'), 'Pending')
  assert.equal(storyStatusLabel('delivered'), 'Delivered')
  assert.equal(storyStatusLabel('unknown'), 'Status unavailable')
})
