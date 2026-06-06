# Local development: web via pnpm (hot reload)
param([switch]$Help = $false)

if ($Help) {
    Write-Host "Usage: ./dev.ps1" -ForegroundColor Yellow
    Write-Host "  Runs web dev server on :3000" -ForegroundColor Cyan
    exit 0
}

Set-Location $PSScriptRoot
pnpm setup
pnpm dev
