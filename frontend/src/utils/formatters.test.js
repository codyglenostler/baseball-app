import test from "node:test";
import assert from "node:assert/strict";

import { getGameLabel, isToday } from "./formatters.js";

const NOW = new Date(2026, 9, 27, 12, 0, 0);

test("isToday compares local calendar dates", () => {
  assert.equal(isToday(new Date(2026, 9, 27, 8).toISOString(), NOW), true);
  assert.equal(isToday(new Date(2026, 9, 26, 23).toISOString(), NOW), false);
});

test("isToday rejects empty and invalid values", () => {
  assert.equal(isToday(null, NOW), false);
  assert.equal(isToday("not-a-date", NOW), false);
});

test("getGameLabel handles every visible game state", () => {
  assert.equal(getGameLabel(null), "");
  assert.equal(getGameLabel({ noGame: true }), "");
  assert.equal(getGameLabel({ status: "In Progress" }), "LIVE");
  assert.equal(getGameLabel({ status: "Final" }), "FINAL");
  assert.equal(getGameLabel({ isNextGame: true }), "NEXT GAME");
});
