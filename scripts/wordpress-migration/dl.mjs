import fs from "node:fs";
import { fileURLToPath } from "node:url";
const ROOT = fileURLToPath(new URL("../../", import.meta.url)).replace(/\\/g, "/");
const S = process.argv[2];
const latest = JSON.parse(fs.readFileSync(S + "/latest.json", "utf8"));
const inv = JSON.parse(fs.readFileSync(ROOT + "src/content/url-inventory.json", "utf8")).urls;
const jobs = inv.filter((u) => latest[u.path]).map((u) => ({ ...u, ts: latest[u.path] }));
const extra = ["/blog/page/2/", "/blog/page/3/", "/author/admin/page/2/"].filter((p) => latest[p]).map((p) => ({ path: p, ts: latest[p], type: "extra" }));
const all = [...jobs, ...extra];
const name = (p) => (p === "/" ? "_home" : p.replace(/^\/|\/$/g, "").replace(/\//g, "__")) + ".html";
let i = 0;
async function worker() {
  while (i < all.length) {
    const j = all[i++];
    const f = S + "/raw/" + name(j.path);
    if (fs.existsSync(f) && fs.statSync(f).size > 5000) continue;
    for (let a = 0; a < 4; a++) {
      try {
        const r = await fetch(`http://web.archive.org/web/${j.ts}id_/https://globalmarketingfirm.co.uk${j.path}`);
        const t = await r.text();
        if (r.ok && t.length > 5000) { fs.writeFileSync(f, t); break; }
        console.log("bad", r.status, j.path);
      } catch (e) { console.log("err", j.path, e.message); }
      await new Promise((r) => setTimeout(r, 3000 * (a + 1)));
    }
  }
}
await Promise.all([worker(), worker(), worker(), worker()]);
console.log("done", fs.readdirSync(S + "/raw").length, "of", all.length);
