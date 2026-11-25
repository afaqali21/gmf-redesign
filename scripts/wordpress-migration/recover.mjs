import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const ROOT = fileURLToPath(new URL("../../", import.meta.url)).replace(/\\/g, "/");
const require = createRequire(ROOT + "package.json"); const sharp = require("sharp");
const S = process.argv[2]; const PUB = ROOT + "public";
const fail = JSON.parse(fs.readFileSync(S + "/img-fail.json", "utf8"));
const alt = JSON.parse(fs.readFileSync(S + "/img-alt.json", "utf8"));
const still = [];
for (const p of fail) {
  const dest = PUB + p; fs.mkdirSync(path.dirname(dest), { recursive: true });
  try {
    if (alt[p]) {
      const r = await fetch(`http://web.archive.org/web/${alt[p].t}im_/https://globalmarketingfirm.co.uk${alt[p].p}`);
      if (!r.ok) throw 0; fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer())); continue;
    }
    const m = p.match(/^\/wp-content\/uploads\/2026\/\d\d\/([A-Za-z0-9_-]+?)(-(\d+)x(\d+))?\.webp$/);
    if (!m) throw 0;
    const r = await fetch(`https://cdn.marblism.com/${m[1]}.webp`);
    if (!r.ok) throw 0;
    const buf = Buffer.from(await r.arrayBuffer());
    if (m[2]) fs.writeFileSync(dest, await sharp(buf).resize(+m[3], +m[4], { fit: "cover" }).webp({ quality: 82 }).toBuffer());
    else fs.writeFileSync(dest, buf);
  } catch { still.push(p); }
}
fs.writeFileSync(S + "/img-missing.json", JSON.stringify(still, null, 1));
console.log("recovered", fail.length - still.length, "still missing", still.length);
