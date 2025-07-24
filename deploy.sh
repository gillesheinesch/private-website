#!/bin/bash

# Deploy script for Private Website (heinesch.com)
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default to production
ENVIRONMENT="prod"
BOTH_ENVIRONMENTS=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --dev)
            ENVIRONMENT="dev"
            shift
            ;;
        --both)
            BOTH_ENVIRONMENTS=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [--dev] [--both] [--help]"
            echo "  --dev      Deploy development environment"
            echo "  --both     Deploy both production and development"
            echo "  (default: production environment on port 80)"
            echo ""
            echo "Examples:"
            echo "  $0              # Production on port 80"
            echo "  $0 --dev       # Development on port 80"
            echo "  $0 --both      # Both environments on port 80"
            echo ""
            echo "Website: heinesch.com"
            exit 0
            ;;
        *)
            echo "Unknown option $1"
            exit 1
            ;;
    esac
done

# Display deployment information
if [ "$BOTH_ENVIRONMENTS" = true ]; then
    echo -e "${GREEN}🚀 Deploying Both Private Website Environments (Port 80)...${NC}"
elif [ "$ENVIRONMENT" = "dev" ]; then
    echo -e "${BLUE}🚀 Deploying Private Website (Development - Port 80)...${NC}"
else
    echo -e "${GREEN}🚀 Deploying Private Website (Production - Port 80)...${NC}"
fi

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker first."
    exit 1
fi

print_status "Docker is running"

# Check for port conflicts on port 80
if lsof -i :80 >/dev/null 2>&1; then
    print_warning "Port 80 is already in use. This may cause conflicts."
    print_warning "Consider stopping other services using port 80 first."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Deployment cancelled."
        exit 1
    fi
fi

# Set up profiles based on environment choice
if [ "$BOTH_ENVIRONMENTS" = true ]; then
    PROFILES="--profile dev --profile prod"
    ENVIRONMENTS="both environments"
elif [ "$ENVIRONMENT" = "dev" ]; then
    PROFILES="--profile dev"
    ENVIRONMENTS="development"
else
    PROFILES="--profile prod"
    ENVIRONMENTS="production"
fi

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose --profile dev --profile prod down

# Build and start containers
print_status "Building and starting Docker containers..."
docker-compose $PROFILES up -d --build

# Wait for containers to be healthy
print_status "Waiting for containers to be ready..."
sleep 20

# Check if containers are running
if [ "$BOTH_ENVIRONMENTS" = true ]; then
    # Check both environments
    if docker-compose $PROFILES ps | grep -q "Up"; then
        print_status "Containers are running successfully!"
        
        # Test health endpoints
        HEALTH_STATUS=$(curl -f http://localhost:80 >/dev/null 2>&1 && echo "✅" || echo "❌")
        
        echo -e "${GREEN}🎉 Deployment successful!${NC}"
        echo -e "Both environments: ${YELLOW}http://localhost:80${NC} $HEALTH_STATUS"
    else
        print_error "Containers failed to start"
        docker-compose $PROFILES logs
        exit 1
    fi
elif [ "$ENVIRONMENT" = "dev" ]; then
    # Check development environment
    if docker-compose $PROFILES ps | grep -q "Up"; then
        print_status "Development container is running successfully!"
        
        if curl -f http://localhost:80 >/dev/null 2>&1; then
            print_status "Health check passed!"
            echo -e "${GREEN}🎉 Development deployment successful!${NC}"
            echo -e "Development available at: ${YELLOW}http://localhost:80${NC}"
        else
            print_warning "Health check failed, but container is running"
        fi
    else
        print_error "Development container failed to start"
        docker-compose $PROFILES logs
        exit 1
    fi
else
    # Check production environment
    if docker-compose $PROFILES ps | grep -q "Up"; then
        print_status "Production container is running successfully!"
        
        if curl -f http://localhost:80 >/dev/null 2>&1; then
            print_status "Health check passed!"
            echo -e "${GREEN}🎉 Production deployment successful!${NC}"
            echo -e "Production available at: ${YELLOW}http://localhost:80${NC}"
        else
            print_warning "Health check failed, but container is running"
        fi
    else
        print_error "Production container failed to start"
        docker-compose $PROFILES logs
        exit 1
    fi
fi

# Clean up old images
print_status "Cleaning up old Docker images..."
docker image prune -f

print_status "Deployment completed!"

# Display useful commands
echo ""
echo -e "${YELLOW}Useful commands:${NC}"
if [ "$BOTH_ENVIRONMENTS" = true ]; then
    echo "  View logs: docker-compose $PROFILES logs -f"
    echo "  Stop both: docker-compose $PROFILES down"
    echo "  Status: docker-compose $PROFILES ps"
elif [ "$ENVIRONMENT" = "dev" ]; then
    echo "  View logs: docker-compose $PROFILES logs -f"
    echo "  Stop dev: docker-compose $PROFILES down"
    echo "  Status: docker-compose $PROFILES ps"
else
    echo "  View logs: docker-compose $PROFILES logs -f"
    echo "  Stop prod: docker-compose $PROFILES down"
    echo "  Status: docker-compose $PROFILES ps"
fi

echo ""
echo -e "${YELLOW}Port Information:${NC}"
echo "  Deployed on port 80 - standard HTTP port"
echo "  Accessible directly via http://localhost or http://heinesch.com"

echo ""
echo -e "${YELLOW}Website Information:${NC}"
echo "  Personal website with blog, projects, and about sections"
echo "  Features: Material-UI, React Markdown, responsive design"
echo "  Domain: heinesch.com" 