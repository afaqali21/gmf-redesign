#!/usr/bin/env node
// Checks every URL from the WordPress sitemaps against a running build of the new site.
// Usage: npm run build && npm start   (in another terminal)
//        node scripts/check-urls.mjs [baseUrl]      default http://localhost:3000
import { readFile } from "node:fs/promises";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const inventory = JSON.parse(await readFile(new URL("../src/content/url-inventory.json", import.meta.url), "utf8"));

const results = await Promise.all(
  inventory.urls.map(async (u) => {
    try {
      const res = await fetch(base + u.path, { redirect: "manual" });
      return { ...u, status: res.status, location: res.headers.get("location") };
    } catch (e) {
      return { ...u, status: "ERR", location: String(e) };
    }
  }),
);

const ok = results.filter((r) => r.status === 200);
const missing = results.filter((r) => r.status !== 200);

const byType = {};
for (const r of results) {
  byType[r.type] ??= { total: 0, ok: 0 };
  byType[r.type].total++;
  if (r.status === 200) byType[r.type].ok++;
}

console.log(`\nURL coverage: ${ok.length}/${results.length} return 200 at ${base}\n`);
console.table(byType);
if (missing.length && process.argv.includes("--list")) {
  for (const r of missing) console.log(`${String(r.status).padEnd(4)} ${r.type.padEnd(9)} ${r.path}${r.location ? `  -> ${r.location}` : ""}`);
}
if (missing.length && !process.argv.includes("--list")) console.log("Run with --list to see every missing URL.");
