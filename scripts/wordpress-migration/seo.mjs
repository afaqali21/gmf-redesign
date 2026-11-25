import * as cheerio from "cheerio"; import fs from "node:fs";
const out={};
const fix=(u)=>u?u.replace(/^https?:\/\/web\.archive\.org\/web\/\d+(id_|im_|cs_|js_)?\//,""):u;
for(const f of fs.readdirSync("raw")){
 const $=cheerio.load(fs.readFileSync("raw/"+f,"utf8"));
 const meta=(sel)=>fix($(sel).attr("content"));
 const ld=[];$('script[type="application/ld+json"]').each((_,s)=>{try{ld.push(JSON.parse($(s).html()))}catch{}});
 const graph=ld.flatMap(x=>x["@graph"]||[x]);
 out[f.replace(".html","")]={
  title:$("title").first().text(),
  description:meta('meta[name="description"]'),
  robots:meta('meta[name="robots"]'),
  canonical:fix($('link[rel="canonical"]').attr("href")),
  ogType:meta('meta[property="og:type"]'), ogTitle:meta('meta[property="og:title"]'), ogDesc:meta('meta[property="og:description"]'),
  ogImage:meta('meta[property="og:image"]'), ogImageW:meta('meta[property="og:image:width"]'), ogImageH:meta('meta[property="og:image:height"]'), ogImageType:meta('meta[property="og:image:type"]'),
  published:meta('meta[property="article:published_time"]'), modified:meta('meta[property="article:modified_time"]'),
  author:meta('meta[name="author"]'),
  twitter:$('meta[name^="twitter:"]').map((_,m)=>$(m).attr("name")+"="+$(m).attr("content")).get(),
  ldTypes:graph.map(g=>[].concat(g["@type"]).join("+")),
  graph,
 };
}
fs.writeFileSync("seo.json",JSON.stringify(out,null,1));
for(const [k,v] of Object.entries(out)) if(!k.startsWith("tag__")&&!k.startsWith("category")) console.log(k.padEnd(40).slice(0,40),"|",v.title,"|",(v.description||"-").slice(0,50),"|",v.canonical?.replace("https://globalmarketingfirm.co.uk",""),"|",v.ogImage?"img":"", v.modified?.slice(0,10)||"", "|",v.ldTypes.join(","), "|", v.robots);
