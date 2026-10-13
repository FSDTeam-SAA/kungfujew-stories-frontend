import assert from "node:assert/strict"
import { test } from "node:test"
import { getQuoteUrl } from "../lib/site.ts"

test("preserves service, story and placement attribution in quote handoffs", () => {
  const url = new URL(getQuoteUrl({ placement: "story-sidebar", serviceLine: "heavy-equipment", storySlug: "test-story" }))
  assert.equal(url.protocol, "https:")
  assert.equal(url.searchParams.get("utm_source"), "ccg-stories")
  assert.equal(url.searchParams.get("utm_medium"), "referral")
  assert.equal(url.searchParams.get("utm_campaign"), "story-sidebar")
  assert.equal(url.searchParams.get("utm_content"), "heavy-equipment")
  assert.equal(url.searchParams.get("story"), "test-story")
})

test("general quote links remain usable without a story context", () => {
  const url = new URL(getQuoteUrl({ placement: "home-hero" }))
  assert.equal(url.searchParams.get("utm_campaign"), "home-hero")
  assert.equal(url.searchParams.has("story"), false)
})
