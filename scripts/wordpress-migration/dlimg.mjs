import fs from "node:fs"; import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = fileURLToPath(new URL("../../", import.meta.url)).replace(/\\/g, "/");
const list = JSON.parse(fs.readFileSync(process.argv[2] + "/images.json", "utf8"));
const PUB = ROOT + "public";
let i = 0, ok = 0; const fail = [];
async function w() { while (i < list.length) { const p = list[i++]; const dest = PUB + decodeURI(p);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 500) { ok++; continue; }
  let done = false;
  for (let a = 0; a < 3 && !done; a++) { try {
    const r = await fetch(`http://web.archive.org/web/2026im_/https://globalmarketingfirm.co.uk${p}`);
    const ct = r.headers.get("content-type") || ""; const b = Buffer.from(await r.arrayBuffer());
    if (r.ok && /image/.test(ct) && b.length > 200) { fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.writeFileSync(dest, b); ok++; done = true; }
    else if (r.status === 404) break; } catch {} if (!done) await new Promise(r => setTimeout(r, 2500)); }
  if (!done) fail.push(p); } }
await Promise.all([w(), w(), w(), w(), w()]);
fs.writeFileSync(process.argv[2] + "/img-fail.json", JSON.stringify(fail, null, 1));
console.log("ok", ok, "failed", fail.length);
