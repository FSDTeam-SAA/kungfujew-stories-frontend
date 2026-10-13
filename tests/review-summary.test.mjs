import assert from "node:assert/strict"
import { test } from "node:test"
import { reviewSummary } from "../lib/review-summary.ts"

test("never fabricates a rating or count when review data is unavailable", () => {
  assert.deepEqual(reviewSummary({}), { rating: null, total: null })
  assert.deepEqual(reviewSummary({ rating: '5.0', total: 100 }), { rating: null, total: 100 })
  assert.deepEqual(reviewSummary({ rating: Infinity, total: -1 }), { rating: null, total: null })
})

test("preserves valid ratings and exact review counts", () => {
  assert.deepEqual(reviewSummary({ rating: 4.6, total: 42 }), { rating: 4.6, total: 42 })
  assert.deepEqual(reviewSummary({ rating: 0, total: 0 }), { rating: 0, total: 0 })
})
