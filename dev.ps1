# Fast Development Script for Private Website (PowerShell)
param(
    [switch]$Clean = $false,
    [switch]$Both = $false,
    [switch]$Help = $false
)

if ($Help) {
    Write-Host "Usage: ./dev.ps1 [-Both] [-Clean] [-Help]" -ForegroundColor Yellow
    Write-Host "  -Both   Start both development and production environments" -ForegroundColor Cyan
    Write-Host "  -Clean  Clean up existing containers and volumes" -ForegroundColor Cyan
    Write-Host "  (default: development environment only)" -ForegroundColor Cyan
    exit 0
}

if ($Both) {
    Write-Host "Starting Private Website (Both Environments)..." -ForegroundColor Green
    $Profiles = "--profile dev --profile prod"
} else {
    Write-Host "Starting Private Website Development Environment..." -ForegroundColor Blue
    $Profiles = "--profile dev"
}

# Check if Docker is running
try {
    docker info *>$null
    Write-Host "Docker is running" -ForegroundColor Green
} catch {
    Write-Host "Docker is not running. Please start Docker first." -ForegroundColor Yellow
    exit 1
}

# Clean up existing containers if requested
if ($Clean) {
    Write-Host "Cleaning up existing containers and volumes..." -ForegroundColor Green
    if ($Both) {
        docker-compose --profile dev --profile prod down -v 2>$null
    } else {
        docker-compose --profile dev down -v 2>$null
    }
    docker system prune -f 2>$null
}

# Stop any existing containers
Write-Host "Stopping existing containers..." -ForegroundColor Green
Invoke-Expression "docker-compose $Profiles down" 2>$null

# Start environment(s) with optimized settings
Write-Host "Building and starting environment(s)..." -ForegroundColor Green
Invoke-Expression "docker-compose $Profiles up --build"

if ($Both) {
    Write-Host "Both environments started!" -ForegroundColor Green
    Write-Host "Development: http://localhost:3000 (hot reloading)" -ForegroundColor Yellow
    Write-Host "Production:  http://localhost:4100 (optimized)" -ForegroundColor Yellow
    Write-Host "Hot reloading is enabled on development environment" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Magenta
} else {
    Write-Host "Development environment started!" -ForegroundColor Green
    Write-Host "Access your site at: http://localhost:3000" -ForegroundColor Yellow
    Write-Host "Hot reloading is enabled - changes will be reflected automatically" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the development server" -ForegroundColor Magenta
} 