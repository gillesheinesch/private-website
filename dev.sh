#!/bin/bash
# Local development: web via pnpm (hot reload)
set -e

cd "$(dirname "$0")"
pnpm setup
pnpm dev
