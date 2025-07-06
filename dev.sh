#!/bin/bash

# Fast Development Script for Private Website
set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Default to development only
BOTH_ENVIRONMENTS=false
CLEAN=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --both)
            BOTH_ENVIRONMENTS=true
            shift
            ;;
        --clean)
            CLEAN=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [--both] [--clean] [--help]"
            echo "  --both  Start both development and production environments"
            echo "  --clean Clean up existing containers and volumes"
            echo "  (default: development environment only)"
            exit 0
            ;;
        *)
            echo "Unknown option $1"
            exit 1
            ;;
    esac
done

if [ "$BOTH_ENVIRONMENTS" = true ]; then
    echo -e "${GREEN}🚀 Starting Private Website (Both Environments)...${NC}"
    PROFILES="--profile dev --profile prod"
else
    echo -e "${BLUE}🚀 Starting Private Website Development Environment...${NC}"
    PROFILES="--profile dev"
fi

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

# Clean up existing containers if requested
if [ "$CLEAN" = true ]; then
    echo -e "${GREEN}🧹 Cleaning up existing containers and volumes...${NC}"
    if [ "$BOTH_ENVIRONMENTS" = true ]; then
        docker-compose --profile dev --profile prod down -v 2>/dev/null || true
    else
        docker-compose --profile dev down -v 2>/dev/null || true
    fi
    docker system prune -f 2>/dev/null || true
fi

# Stop any existing containers
echo -e "${GREEN}🧹 Cleaning up existing containers...${NC}"
docker-compose $PROFILES down 2>/dev/null || true

# Start environment(s) with optimized settings
echo -e "${GREEN}🏗️ Building and starting environment(s)...${NC}"
docker-compose $PROFILES up --build

if [ "$BOTH_ENVIRONMENTS" = true ]; then
    echo -e "${GREEN}✨ Both environments started!${NC}"
    echo -e "📍 Development: ${YELLOW}http://localhost:1000${NC} (hot reloading)"
    echo -e "📍 Production:  ${YELLOW}http://localhost:1100${NC} (optimized)"
    echo -e "🔄 Hot reloading is enabled on development environment"
    echo -e "🛑 Press Ctrl+C to stop both servers"
else
    echo -e "${GREEN}✨ Development environment started!${NC}"
    echo -e "📍 Access your site at: ${YELLOW}http://localhost:1000${NC}"
    echo -e "🔄 Hot reloading is enabled - changes will be reflected automatically"
    echo -e "🛑 Press Ctrl+C to stop the development server"
fi 