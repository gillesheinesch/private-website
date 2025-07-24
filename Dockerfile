# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./
RUN npm ci --silent

# Copy source code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production runtime
FROM node:18-alpine AS production

# Install curl for healthcheck
RUN apk add --no-cache curl

WORKDIR /app

# Copy package files
COPY package*.json ./

# Create non-root user for security before copying files
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Install only production dependencies
RUN npm ci --only=production --silent

# Copy built application from builder stage with correct ownership
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/blog ./blog

# Switch to non-root user
USER nextjs

# Expose port 4500
EXPOSE 4500

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:4500 || exit 1

# Start the application
CMD ["npm", "start"] 