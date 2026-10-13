import assert from "node:assert/strict"
import { test } from "node:test"
import { fetchAllPublishedStories } from "../lib/api/story-response.ts"

const stories = Array.from({ length: 55 }, (_, index) => ({
  _id: `story-${index}`, title: `Shipment ${index}`, slug: `shipment-${index}`,
  metaDescription: "A published shipment", pickupLocation: "Austin", destination: "Boston",
  shipmentType: "Car", shipmentStatus: "delivered", serviceLine: "vehicle",
  createdAt: "2026-10-13T00:00:00.000Z", isPublished: true,
}))
const endpoint = "https://example.test/api/v1/real-shipment-stories"
const response = (data, page, total = 55) => Response.json({
  success: true, data, pagination: { page, limit: 50, total, totalPages: Math.ceil(total / 50) },
})

test("loads every published summary beyond the first API page in order", async (t) => {
  t.mock.method(globalThis, "fetch", async (input) => {
    const url = new URL(input)
    assert.equal(url.searchParams.get("isPublished"), "true")
    assert.equal(url.searchParams.get("summary"), "true")
    assert.equal(url.searchParams.get("limit"), "50")
    const page = Number(url.searchParams.get("page"))
    return response(stories.slice((page - 1) * 50, page * 50), page)
  })
  const result = await fetchAllPublishedStories(endpoint)
  assert.deepEqual(result.map((story) => story._id), stories.map((story) => story._id))
})

test("returns an empty collection when there are no published stories", async (t) => {
  t.mock.method(globalThis, "fetch", async () => response([], 1, 0))
  assert.deepEqual(await fetchAllPublishedStories(endpoint), [])
})

test("fails if a later page is unavailable instead of returning a partial collection", async (t) => {
  t.mock.method(globalThis, "fetch", async (input) => new URL(input).searchParams.get("page") === "1"
    ? response(stories.slice(0, 50), 1) : new Response("", { status: 503 }))
  await assert.rejects(fetchAllPublishedStories(endpoint), /temporarily unavailable/)
})

test("rejects drafts on any page", async (t) => {
  t.mock.method(globalThis, "fetch", async (input) => new URL(input).searchParams.get("page") === "1"
    ? response(stories.slice(0, 50), 1) : response([{ ...stories[50], isPublished: false }], 2))
  await assert.rejects(fetchAllPublishedStories(endpoint), /Invalid published story/)
})

test("rejects an API that repeats the first page", async (t) => {
  t.mock.method(globalThis, "fetch", async () => response(stories.slice(0, 50), 1))
  await assert.rejects(fetchAllPublishedStories(endpoint), /pagination/)
})

test("does not duplicate cards if an entry moves between pages during fetching", async (t) => {
  t.mock.method(globalThis, "fetch", async (input) => new URL(input).searchParams.get("page") === "1"
    ? response(stories.slice(0, 50), 1) : response(stories.slice(49), 2))
  assert.equal((await fetchAllPublishedStories(endpoint)).length, 55)
})

test("honors cancellation before fetching another page", async (t) => {
  const controller = new AbortController()
  t.mock.method(globalThis, "fetch", async () => {
    controller.abort()
    return response(stories.slice(0, 50), 1)
  })
  await assert.rejects(fetchAllPublishedStories(endpoint, { signal: controller.signal }), { name: "AbortError" })
})
