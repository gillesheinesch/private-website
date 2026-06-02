/**
 * CI-only: repo-wide lossy compression via Sharp (JPEG/PNG/WebP/AVIF).
 * Expects `sharp` beside this file and `REPO_ROOT` pointing at the checkout.
 */

import { glob as globFiles, stat, writeFile } from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const REPO_ROOT = path.resolve(process.env.REPO_ROOT ?? path.join(__dirname, "..", ".."));

const IGNORE_INPUT = process.env.IGNORE_PATHS ?? "node_modules/**,.next/**";
const ignorePatterns = IGNORE_INPUT.split(",").map((s) => s.trim()).filter(Boolean);

const JPEG_QUALITY = Number.parseInt(process.env.JPEG_QUALITY ?? "85", 10);
const JPEG_PROGRESSIVE = process.env.JPEG_PROGRESSIVE === "true";
const PNG_QUALITY = Number.parseInt(process.env.PNG_QUALITY ?? "80", 10);
const WEBP_QUALITY = Number.parseInt(process.env.WEBP_QUALITY ?? "85", 10);
const AVIF_QUALITY = Number.parseInt(process.env.AVIF_QUALITY ?? "75", 10);
const MIN_PCT_CHANGE = Number.parseFloat(process.env.MIN_PCT_CHANGE ?? "5");

const EXTENSIONS = ["jpeg", "jpg", "png", "webp", "avif"];

function ignored(relPosix) {
  for (const pat of ignorePatterns) {
    if (pat.endsWith("/**")) {
      const prefix = pat.slice(0, -3);
      if (relPosix === prefix || relPosix.startsWith(`${prefix}/`)) {
        return true;
      }
    }
  }
  return false;
}

/** Normalize a glob `exclude` path to a POSIX path relative to `REPO_ROOT` (handles relative vs absolute yields). */
function toRepoRelativePosix(entryPath) {
  const abs = path.isAbsolute(entryPath)
    ? path.normalize(entryPath)
    : path.normalize(path.join(REPO_ROOT, entryPath));
  let rel = path.relative(REPO_ROOT, abs);
  if (rel === "") {
    rel = ".";
  }
  return rel.split(path.sep).join("/");
}

/** Absolute path for a glob match (iterator may yield relative or absolute paths). */
function toAbsoluteFromGlobMatch(m) {
  return path.isAbsolute(m) ? path.normalize(m) : path.join(REPO_ROOT, m);
}

async function processOne(absPath) {
  const ext = path.extname(absPath).toLowerCase();
  let sharpFormat;
  /** @type {Record<string, unknown>} */
  let options;

  switch (ext) {
    case ".jpg":
    case ".jpeg":
      sharpFormat = "jpeg";
      options = {
        quality: JPEG_QUALITY,
        progressive: JPEG_PROGRESSIVE,
        chromaSubsampling: "4:4:4",
      };
      break;
    case ".png":
      sharpFormat = "png";
      options = { quality: PNG_QUALITY, compressionLevel: 9 };
      break;
    case ".webp":
      sharpFormat = "webp";
      options = { quality: WEBP_QUALITY, smartSubsample: true };
      break;
    case ".avif":
      sharpFormat = "avif";
      options = { quality: AVIF_QUALITY };
      break;
    default:
      return;
  }

  const beforeStats = (await stat(absPath)).size;
  if (beforeStats === 0) {
    return;
  }

  try {
    const { data, info } = await sharp(absPath)
      .toFormat(sharpFormat, options)
      .toBuffer({ resolveWithObject: true });

    const afterStats = info.size;
    const percentChange = ((beforeStats - afterStats) / beforeStats) * 100;

    if (percentChange >= MIN_PCT_CHANGE && afterStats < beforeStats) {
      await writeFile(absPath, data);
    }
  } catch {
    // Skip unreadable or unsupported binaries without failing the job.
  }
}

async function listImagePaths() {
  /** @type {Set<string>} */
  const relative = new Set();

  for (const ext of EXTENSIONS) {
    const iterable = globFiles(`**/*.${ext}`, {
      cwd: REPO_ROOT,
      exclude: (entryPath) => ignored(toRepoRelativePosix(entryPath)),
    });
    for await (const m of iterable) {
      relative.add(m);
    }
  }

  return [...relative].map((m) => toAbsoluteFromGlobMatch(m));
}

async function main() {
  const targets = await listImagePaths();
  for (const absPath of targets) {
    await processOne(absPath);
  }
}

await main();
