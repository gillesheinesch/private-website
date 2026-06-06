#!/usr/bin/env node
/** Free dev port 3000 (web) before starting pnpm dev. */
import { execSync } from "node:child_process";

const PORTS = [3000];

function killOnWindows(port) {
  let out = "";
  try {
    out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" });
  } catch {
    return;
  }
  const pids = new Set();
  for (const line of out.split(/\r?\n/)) {
    if (!line.includes("LISTENING")) continue;
    const parts = line.trim().split(/\s+/);
    const pid = parts[parts.length - 1];
    if (pid && /^\d+$/.test(pid) && pid !== "0") pids.add(pid);
  }
  for (const pid of pids) {
    try {
      execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
      console.log(`Freed port ${port} (stopped PID ${pid})`);
    } catch {
      /* already gone */
    }
  }
}

function killOnUnix(port) {
  try {
    const pids = execSync(`lsof -ti :${port}`, { encoding: "utf8" })
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    for (const pid of pids) {
      execSync(`kill -9 ${pid}`, { stdio: "ignore" });
      console.log(`Freed port ${port} (stopped PID ${pid})`);
    }
  } catch {
    /* nothing listening */
  }
}

for (const port of PORTS) {
  if (process.platform === "win32") killOnWindows(port);
  else killOnUnix(port);
}
