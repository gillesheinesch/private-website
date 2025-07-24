# Private Website (heinesch.com) - Docker Setup Guide

Personal website with blog functionality built with Next.js and Material-UI.

## 🏗️ Architecture

**Private Website** is a Next.js frontend application featuring:

-   Personal portfolio content
-   Blog functionality with markdown posts
-   Material-UI design system
-   Responsive design

**Deployment**: <http://localhost:4500> (Development/Production)

## 🐳 Prerequisites

### Required Software

-   Docker and Docker Compose installed
-   Git for cloning repository

### Network Setup

Create the external shared network (run once):

```bash
# Create the shared network
docker network create npm_shared
```

## ⚙️ Environment Configuration

This project works without additional environment variables for basic functionality. If you need custom configuration, create an optional `.env.local` file:

```bash
# Optional environment variables
# NEXT_PUBLIC_SITE_URL=http://localhost:4500
# NODE_ENV=development

# Add any custom environment variables here
```

## 🚀 Development Mode

### Quick Start

**Option 1: Use convenience script**

```bash
# Start development mode with hot reloading
./dev.sh
```

**Option 2: Manual Docker Compose**

```bash
# Start service with hot reloading
docker-compose --profile dev up --build
```

### Development Features

-   ✅ Hot reloading via volume mounts
-   ✅ Source code changes reflect immediately
-   ✅ Next.js Fast Refresh enabled
-   ✅ Blog posts auto-reload on changes
-   ✅ Cached node_modules for faster rebuilds
-   ✅ Material-UI theme hot swapping

### Development Commands

```bash
# Start development container
docker-compose --profile dev up --build

# Start without rebuilding
docker-compose --profile dev up

# View logs
docker-compose --profile dev logs -f

# Stop service
docker-compose --profile dev down

# Clean restart (remove volumes)
docker-compose --profile dev down -v
```

### Accessing the Website

-   **Development URL**: <http://localhost:4500>
-   **Blog**: <http://localhost:4500/blog>
-   **Projects**: <http://localhost:4500/projects>
-   **About**: <http://localhost:4500/about>

## 🌐 Production Mode

### Quick Start

**Option 1: Use deployment script**

```bash
# Deploy in production mode
./deploy.sh prod
```

**Option 2: Manual Docker Compose**

```bash
# Start optimized for production
docker-compose --profile prod up --build -d
```

### Production Features

-   ✅ Optimized Next.js production build
-   ✅ Static file serving optimized
-   ✅ Non-root user for security
-   ✅ Automatic restart on failure
-   ✅ Blog content included in build
-   ✅ Minimized bundle size

### Production Commands

```bash
# Start production deployment
docker-compose --profile prod up --build -d

# Check service status
docker-compose --profile prod ps

# View production logs
docker-compose --profile prod logs -f

# Update production deployment
docker-compose --profile prod down
docker-compose --profile prod pull
docker-compose --profile prod up --build -d

# Stop production service
docker-compose --profile prod down
```

## 🧪 Development Deployment Mode

Test production builds in development environment:

```bash
# Start dev-deploy profile (production builds, no volume mounts)
docker-compose --profile dev-deploy up --build

# Or use script
./deploy.sh dev
```

**Use case**: Test production optimizations and blog rendering without deploying to production.

## 📜 Cross-Platform Scripts

### Development Scripts

**Linux/macOS (`dev.sh`):**

```bash
# Start development mode with health checks
./dev.sh

# With custom port
PORT=4501 ./dev.sh
```

**Windows PowerShell (`dev.ps1`):**

```powershell
# Start development mode
.\dev.ps1

# With custom port
$env:PORT=4501; .\dev.ps1
```

### Deployment Scripts

**Linux/macOS (`deploy.sh`):**

```bash
# Production deployment
./deploy.sh prod

# Development deployment (test builds)
./deploy.sh dev

# With detached mode
./deploy.sh prod --detach
```

**Windows PowerShell (`deploy.ps1`):**

```powershell
# Production deployment
.\deploy.ps1 prod

# Development deployment
.\deploy.ps1 dev
```

## 🔍 Health Checks & Monitoring

### Container Health Status

```bash
# Check health status
docker-compose --profile dev ps
docker-compose --profile prod ps

# Detailed health information
docker inspect $(docker-compose --profile dev ps -q) | grep -A 10 Health
```

### Manual Health Checks

```bash
# Website health check
curl -f http://localhost:4500

# Blog functionality check
curl -f http://localhost:4500/blog

# Check specific blog post
curl -f http://localhost:4500/blog/[post-title]
```

## 📝 Blog Management

### Blog Posts Location

Blog posts are stored in the `blog/` directory as Markdown files:

```
blog/
├── 2024-11-16.md
├── another-post.md
└── ...
```

### Adding New Blog Posts

1. **Create new Markdown file** in `blog/` directory
2. **File naming**: Use format `YYYY-MM-DD.md` or descriptive name
3. **Content format**:

    ```markdown
    # Post Title

    Post content goes here...
    ```

4. **In development**: Changes auto-reload
5. **In production**: Rebuild container to include new posts

### Blog Development Workflow

```bash
# Start development mode
./dev.sh

# Add/edit blog posts in blog/ directory
# Changes automatically reflect at http://localhost:4500/blog

# Test blog rendering
curl http://localhost:4500/blog
```

## 🗄️ Volume Management

### Development Volumes

-   `node_modules_cache`: Cached Node.js dependencies
-   `next_cache`: Next.js build cache

### Volume Commands

```bash
# List project volumes
docker volume ls | grep private-website

# Remove all volumes (clean slate)
docker-compose --profile dev down -v
docker volume rm private-website_node_modules_cache
docker volume rm private-website_next_cache

# Backup volumes
docker run --rm -v private-website_node_modules_cache:/data -v $(pwd):/backup alpine tar czf /backup/node_modules.tar.gz -C /data .
```

## 🌐 Networking

### External Network Configuration

Uses the `npm_shared` external network:

-   **Cross-service communication**: Can communicate with other containerized services
-   **External integration**: Connect to databases, APIs, etc.
-   **Network isolation**: Maintains security while enabling communication

### Network Troubleshooting

```bash
# Verify npm_shared network exists
docker network ls | grep npm_shared

# Inspect network configuration
docker network inspect npm_shared

# Check which containers are on the network
docker network inspect npm_shared | grep -A 10 Containers
```

## 🛠️ Development Workflow

### Typical Development Session

1. **Start the website:**

    ```bash
    ./dev.sh
    ```

2. **Make content changes:**

    - Edit pages in `src/app/`
    - Add/edit blog posts in `blog/`
    - Update styles and components

3. **View changes:**

    - Website: <http://localhost:4500>
    - Blog: <http://localhost:4500/blog>
    - Changes auto-reload in browser

4. **View logs:**

    ```bash
    docker-compose --profile dev logs -f
    ```

5. **Stop when done:**

    ```bash
    docker-compose --profile dev down
    ```

### File Watching

**Watched directories:**

-   `src/app/` - Next.js pages and components
-   `src/components/` - React components
-   `src/styles/` - CSS and styling
-   `blog/` - Blog markdown files
-   `public/` - Static assets

**Configuration files also watched:**

-   `package.json`
-   `next.config.js`
-   `tsconfig.json`

## ⚠️ Troubleshooting

### Common Issues

#### 1. Port 4500 Already in Use

```bash
# Check what's using the port
lsof -i :4500

# Use different port
PORT=4501 docker-compose --profile dev up

# Or stop conflicting service
sudo lsof -ti:4500 | xargs kill -9
```

#### 2. Network Not Found

```bash
# Create the required network
docker network create npm_shared

# Verify creation
docker network ls | grep npm_shared
```

#### 3. Permission Issues

```bash
# Make scripts executable
chmod +x dev.sh deploy.sh

# Fix file permissions
sudo chown -R $USER:$USER src/ blog/ public/
```

#### 4. Blog Posts Not Loading

```bash
# Verify blog directory exists and has content
ls -la blog/

# Check blog post format
head blog/2024-11-16.md

# Restart container to reload blog content
docker-compose --profile dev down
docker-compose --profile dev up --build
```

#### 5. Build Failures

```bash
# Clean build
docker-compose build --no-cache private-website-dev

# Check Next.js specific errors
docker-compose --profile dev logs private-website-dev

# Clear Next.js cache
docker-compose --profile dev down -v
docker-compose --profile dev up --build
```

#### 6. Hot Reloading Not Working

```bash
# Verify volume mounts
docker-compose --profile dev config | grep -A 5 volumes

# Check file permissions
ls -la src/

# Restart with clean volumes
docker-compose --profile dev down -v
docker-compose --profile dev up --build
```

#### 7. Static Assets Not Loading

```bash
# Check public directory
ls -la public/

# Verify image paths in blog posts
grep -r "public/" blog/

# Test specific asset
curl http://localhost:4500/images/[asset-name]
```

### Debug Commands

```bash
# Container resource usage
docker stats

# Detailed container information
docker-compose --profile dev ps
docker inspect $(docker-compose --profile dev ps -q)

# Network connectivity
docker network inspect npm_shared

# Volume information
docker volume inspect private-website_node_modules_cache
```

## 🔒 Security Best Practices

### Container Security

-   ✅ **Non-root user**: Container runs as non-root
-   ✅ **Multi-stage builds**: Minimize attack surface
-   ✅ **Static content**: No server-side vulnerabilities
-   ✅ **Health checks**: Ensure service availability
-   ✅ **Network isolation**: Isolated in shared network

### Content Security

```bash
# Regular updates
docker-compose pull
docker-compose build --no-cache

# Clean unused resources
docker system prune -f

# Scan for vulnerabilities (if available)
docker scout quickview
```

## 📊 Performance Optimization

### Development Performance

-   ✅ **Volume caching**: Node modules cached for faster rebuilds
-   ✅ **Layer optimization**: Dockerfile layers optimized for caching
-   ✅ **Hot reloading**: Only changed files trigger rebuilds
-   ✅ **Material-UI optimization**: Theme and component caching

### Production Performance

-   ✅ **Static generation**: Blog posts pre-rendered
-   ✅ **Optimized builds**: Production-optimized bundles
-   ✅ **Image optimization**: Next.js image optimization
-   ✅ **Minimal images**: Multi-stage builds reduce size

### Monitoring Commands

```bash
# Resource usage
docker stats

# Container performance
docker-compose --profile prod top

# Response time testing
time curl http://localhost:4500
```

## 🔄 Maintenance

### Regular Maintenance Tasks

**Weekly:**

```bash
# Update base images
docker-compose pull

# Clean unused resources
docker system prune -f
```

**Monthly:**

```bash
# Rebuild without cache
docker-compose build --no-cache

# Update dependencies (recreate volumes)
docker-compose down -v
docker-compose up --build
```

### Blog Content Management

```bash
# Backup blog content
tar czf blog-backup-$(date +%Y%m%d).tar.gz blog/

# Add new blog post
echo "# New Post Title" > blog/new-post.md
echo "Content here..." >> blog/new-post.md

# Test blog in development
docker-compose --profile dev logs -f | grep blog
```

### Backup and Recovery

```bash
# Backup entire project
tar czf private-website-backup-$(date +%Y%m%d).tar.gz src/ blog/ public/ package.json

# Backup volumes
docker run --rm -v private-website_node_modules_cache:/data -v $(pwd):/backup alpine tar czf /backup/node_modules.tar.gz -C /data .

# Restore volumes
docker volume create private-website_node_modules_cache
docker run --rm -v private-website_node_modules_cache:/data -v $(pwd):/backup alpine tar xzf /backup/node_modules.tar.gz -C /data
```

## 🆘 Support

### Getting Help

1. **Check logs first:**

    ```bash
    docker-compose --profile dev logs -f
    ```

2. **Verify configuration:**

    ```bash
    docker-compose --profile dev config
    ```

3. **Test connectivity:**

    ```bash
    curl http://localhost:4500
    curl http://localhost:4500/blog
    ```

### Useful Resources

-   **Next.js Documentation**: <https://nextjs.org/docs>
-   **Material-UI Documentation**: <https://mui.com/getting-started/>
-   **Docker Compose Documentation**: <https://docs.docker.com/compose>
-   **Markdown Guide**: <https://www.markdownguide.org>

---

## 🚀 Quick Reference

### Essential Commands

```bash
# Development
./dev.sh                                    # Start development
docker-compose --profile dev logs -f       # View logs
docker-compose --profile dev down          # Stop service

# Production
./deploy.sh prod                           # Deploy production
docker-compose --profile prod ps          # Check status
docker-compose --profile prod down        # Stop production

# Blog Management
ls blog/                                   # List blog posts
echo "# Title" > blog/new-post.md         # Create new post

# Troubleshooting
docker network create npm_shared          # Create network
docker-compose --profile dev down -v      # Clean restart
docker system prune -f                    # Clean Docker
```

### Website URLs

-   **Homepage**: <http://localhost:4500>
-   **Blog**: <http://localhost:4500/blog>
-   **About**: <http://localhost:4500/about>
-   **Projects**: <http://localhost:4500/projects>

---

**Personal website showcasing projects and thoughts** ✨
