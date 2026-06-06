# Next.js web — pnpm monorepo (build from repository root)
FROM node:22.22.3-alpine@sha256:968df39aedcea65eeb078fb336ed7191baf48f972b4479711397108be0966920 AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.5.2 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/web/package.json ./apps/web/

RUN pnpm install --frozen-lockfile

COPY apps/web ./apps/web

RUN pnpm --filter @private-website/web build

FROM node:22.22.3-alpine@sha256:968df39aedcea65eeb078fb336ed7191baf48f972b4479711397108be0966920 AS production

RUN apk add --no-cache curl

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.5.2 --activate \
  && addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/web/package.json ./apps/web/

RUN pnpm install --frozen-lockfile --prod --filter @private-website/web...

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next ./apps/web/.next
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/blog ./apps/web/blog
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/src ./apps/web/src
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/next.config.js ./apps/web/next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/package.json ./apps/web/package.json

RUN chown -R nextjs:nodejs /app

USER root
RUN apk add --no-cache libcap \
  && setcap 'cap_net_bind_service=+ep' /usr/local/bin/node

USER nextjs
WORKDIR /app/apps/web

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=80
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -s http://127.0.0.1:80 >/dev/null || exit 1

CMD ["pnpm", "exec", "next", "start", "-p", "80", "-H", "0.0.0.0"]
