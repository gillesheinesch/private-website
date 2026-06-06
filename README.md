# Private Website (heinesch.com)

Personal portfolio and blog built with Next.js, Tailwind CSS, and markdown posts.

## Stack

| Layer | Technology |
|-------|------------|
| Monorepo | pnpm (Node 22.22.3, pnpm 11.5.2) |
| Web | Next.js 16, React 18, Tailwind 4 |

## Architecture

```
private-website/
├── apps/web/          Next.js frontend (port 3000 dev, 4500 prod)
├── docker-compose.yml Local prod Docker profile
└── .github/workflows/ CI, release, deploy
```

Production runs as Docker container **`private-website-web`** (`4500→80`) behind nginx-proxy-manager on `https://heinesch.com`.

---

## Local development

### Prerequisites

- Node.js 22.22.3 (`nvm use` reads `.nvmrc`)
- pnpm 11.5.2 (`corepack enable`)

### Quick start

```bash
pnpm setup
pnpm dev
```

Or use helper scripts:

```bash
./dev.sh        # Linux/macOS
./dev.ps1       # Windows PowerShell
```

- Web: http://localhost:3000
- Blog posts live in `apps/web/blog/`

Stop dev server: `pnpm dev:stop`

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm setup` | Install dependencies |
| `pnpm dev` | Start web dev server |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check |
| `pnpm test` | Jest unit/integration tests |
| `pnpm test:e2e` | Playwright e2e tests |
| `pnpm validate` | lint + typecheck + test |

---

## Production deployment

Deploys follow the same folderless GHCR pattern as [lg-salarychecker](https://github.com/GillesHeinesch/lg-salarychecker):

1. Push to `master` triggers semantic-release (on conventional commits)
2. CI builds and pushes `ghcr.io/<repo>/web` image
3. Staging validated on port **4510**
4. Production approval gate (GitHub Environment `production`)
5. Swap to live on port **4500**

**No git clone on the VPS** — compose + scripts are copied to `/tmp` during deploy.

### GitHub secrets (Actions)

| Secret | Description |
|--------|-------------|
| `DEPLOY_SSH_KEY` | Private SSH key for deploy user |
| `DEPLOY_HOST` | VPS hostname or IP |
| `DEPLOY_USER` | SSH user |
| `WEB_ORIGIN` | `https://heinesch.com` |

### GitHub variables

| Variable | Description |
|----------|-------------|
| `LAST_DEPLOYED_SHA` | Set automatically after deploy |
| `LAST_DEPLOYED_AT` | Set automatically after deploy |

### GitHub environment

Create **`production`** under Settings → Environments with required reviewer `@gillesheinesch`.

### Branch workflow

- Feature branches → PR to **`master`** only (no `dev` branch)
- Renovate opens dependency PRs against `master`
- PR review policy auto-requests `@gillesheinesch` on external PRs

### VPS one-time cutover

After first successful GHCR deploy:

1. Stop old git-based container: `docker compose --profile prod down` in `/home/gilles/websites/private-website`
2. Ensure `npm_shared` network exists: `docker network create npm_shared`
3. NPM proxy for `heinesch.com` → `private-website-web:80` or `127.0.0.1:4500`

### Local prod Docker

```bash
docker compose --profile prod build
docker compose --profile prod up -d
curl http://localhost:4500
```

---

## CI

On every PR and push to `master`:

- lint, typecheck, test, build
- Docker prod build validation
- `docker-compose.deploy.yml` config check

---

## Future API

When adding `apps/api`, extend `deploy.json`, `docker-compose.deploy.yml`, and NPM with a `/api` custom location on the same domain (not a separate subdomain).
