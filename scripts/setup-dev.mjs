#!/usr/bin/env node
/**
 * One-shot local dev setup: install dependencies.
 * Safe to re-run (idempotent).
 */
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd: root });
}

console.log("Private Website — local dev setup\n");
run("pnpm install");
