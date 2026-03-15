import { serve } from "bun";
import { join } from "path";
import { readFileSync, existsSync } from "fs";

const PORT = 3000;
const DIST_DIR = join(import.meta.dir, "dist");

console.log(`Starting server on http://localhost:${PORT}`);
console.log(`Serving files from: ${DIST_DIR}`);

serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let path = join(DIST_DIR, url.pathname);

    if (url.pathname === "/") {
      path = join(DIST_DIR, "index.html");
    }

    if (!existsSync(path)) {
      // SPA fallback or 404
      if (req.headers.get("accept")?.includes("text/html")) {
        path = join(DIST_DIR, "index.html");
      } else {
        return new Response("Not Found", { status: 404 });
      }
    }

    const file = readFileSync(path);
    const extension = path.split(".").pop();
    
    // MIME types mapping
    const mimeTypes = {
      "html": "text/html",
      "js": "application/javascript",
      "css": "text/css",
      "svg": "image/svg+xml",
      "wasm": "application/wasm",
      "mp3": "audio/mpeg",
      "bin": "application/octet-stream",
      "json": "application/json"
    };

    const contentType = mimeTypes[extension] || "application/octet-stream";

    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    });
  },
});
