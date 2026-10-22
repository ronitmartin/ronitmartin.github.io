import { defineConfig } from "vite";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const corporateHtml = () => readFileSync(new URL("./public/classic/index.html", import.meta.url), "utf8")
  .replaceAll('"assets/', '"/classic/assets/');
const redirectHtml = (target) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${target}"><title>Corporate Portfolio</title><script>location.replace(${JSON.stringify(target)} + location.search + location.hash)</script></head><body><a href="${target}">Corporate Portfolio</a></body></html>`;

export default defineConfig({
  plugins: [{
    name: "portfolio-urls",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, "http://localhost");
        if (url.pathname === "/" && url.searchParams.get("view") !== "wii" && !url.searchParams.has("channel")) {
          res.writeHead(302, { Location: `/corporate/${url.search}${url.hash}` });
          return res.end();
        }
        if (/^\/corporate\/?$/.test(url.pathname)) {
          res.setHeader("Content-Type", "text/html");
          return res.end(corporateHtml());
        }
        next();
      });
    },
    writeBundle(options) {
      const out = options.dir || "dist";
      const wiiHtml = readFileSync(`${out}/index.html`, "utf8");
      mkdirSync(`${out}/wii`, { recursive: true });
      mkdirSync(`${out}/corporate`, { recursive: true });
      writeFileSync(`${out}/wii/index.html`, wiiHtml);
      writeFileSync(`${out}/corporate/index.html`, corporateHtml());
      const root = redirectHtml("/corporate/").replace('location.replace(', 'location.replace(new URLSearchParams(location.search).get("view") === "wii" || new URLSearchParams(location.search).has("channel") ? "/wii/" + location.search + location.hash : ');
      writeFileSync(`${out}/index.html`, root);
    },
  }],
});
