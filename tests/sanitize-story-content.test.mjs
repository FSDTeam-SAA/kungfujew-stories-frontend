import assert from "node:assert/strict"
import { test } from "node:test"
import { sanitizeStoryContent } from "../lib/sanitize-story-content.ts"

test("keeps story formatting and safe links", () => {
  const html = sanitizeStoryContent(
    '<h2>A move</h2><p><strong>Carefully</strong> delivered. <a href="https://example.com">Read more</a></p><ul><li>Loaded</li></ul>',
  )

  assert.match(html, /<h2>A move<\/h2>/)
  assert.match(html, /<strong>Carefully<\/strong>/)
  assert.match(html, /href="https:\/\/example.com"/)
  assert.match(html, /<ul><li>Loaded<\/li><\/ul>/)
})

test("removes scripts, event handlers, and unsafe URLs", () => {
  const html = sanitizeStoryContent(
    '<p onclick="alert(1)">Safe<script>alert(1)</script><a href="javascript:alert(1)">link</a><img src="data:image/svg+xml;base64,abc" onerror="alert(1)" alt="photo"></p>',
  )

  assert.doesNotMatch(html, /<script|onclick|onerror|javascript:|data:/)
  assert.match(html, /<p>Safe<a>link<\/a><img alt="photo" \/><\/p>/)
})
