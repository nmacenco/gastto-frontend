import {createReadStream} from "node:fs";
import {stat} from "node:fs/promises";
import {createServer} from "node:http";
import {extname, resolve, sep} from "node:path";

const port = Number.parseInt(process.argv[2] ?? "4173", 10);
const root = resolve("out");
const contentTypes = {".css": "text/css", ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2"};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
    const candidate = resolve(root, `.${pathname === "/" ? "/index.html" : pathname}`);
    if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) throw new Error("Invalid path");
    const details = await stat(candidate);
    const file = details.isDirectory() ? resolve(candidate, "index.html") : candidate;
    response.setHeader("content-type", contentTypes[extname(file)] ?? "application/octet-stream");
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Static export ready on ${port}`));
