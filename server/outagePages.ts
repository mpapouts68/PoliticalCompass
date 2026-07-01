import type { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";

/** Hostnames that should show a static outage page instead of the main app. */
const OUTAGE_BY_HOST: Record<string, "shishapoint" | "peqi"> = {
  "shishapoint.site": "shishapoint",
  "www.shishapoint.site": "shishapoint",
  "peqi.hair": "peqi",
  "www.peqi.hair": "peqi",
};

/** Hidden preview paths on the main site (ideologos.site). */
const OUTAGE_PREVIEW_PATHS: Record<string, "shishapoint" | "peqi"> = {
  "/outage/shishapoint": "shishapoint",
  "/outage/peqi": "peqi",
};

function resolveOutageDir(): string {
  const candidates = [
    path.resolve(process.cwd(), "static", "outage"),
    path.resolve(import.meta.dirname, "..", "static", "outage"),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, "shishapoint.html"))) {
      return dir;
    }
  }
  return candidates[0];
}

const outageDir = resolveOutageDir();

function sendOutagePage(kind: "shishapoint" | "peqi", res: Response): void {
  const file = path.join(outageDir, `${kind}.html`);
  res.type("html").sendFile(file, (err) => {
    if (err && !res.headersSent) {
      res.status(500).send("Outage page unavailable.");
    }
  });
}

export function registerOutagePages(app: Express): void {
  app.use((req: Request, res: Response, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      next();
      return;
    }

    const host = (req.hostname || "").toLowerCase();
    const byHost = OUTAGE_BY_HOST[host];
    if (byHost) {
      sendOutagePage(byHost, res);
      return;
    }

    const pathOnly = req.path.replace(/\/+$/, "") || "/";
    const byPath = OUTAGE_PREVIEW_PATHS[pathOnly];
    if (byPath) {
      sendOutagePage(byPath, res);
      return;
    }

    next();
  });
}
