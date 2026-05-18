# Stage 1: Build the Next.js application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package manifests for dependency installation (pnpm uses pnpm-lock.yaml)
COPY package.json pnpm-lock.yaml .npmrc ./
RUN corepack enable && corepack prepare pnpm@11.1.1 --activate
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js application
RUN pnpm run build

# Stage 2: Production runtime
FROM node:22-alpine AS production

# Install curl for healthcheck
RUN apk add --no-cache curl

WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./

# Create non-root user for security before copying files
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

RUN corepack enable && corepack prepare pnpm@11.1.1 --activate
# Production dependencies only (matches prior npm ci --omit=dev behavior)
RUN pnpm install --frozen-lockfile --prod

# Copy built application from builder stage with correct ownership
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/blog ./blog

# Switch to non-root user
USER nextjs

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:80 || exit 1

# Start the application
CMD ["pnpm", "start"]
