#!/bin/bash
# Shared deploy helpers — sourced by scripts/deploy.sh on the VPS.
# Secrets come from GitHub Actions env vars.

: "${RED:=\033[0;31m}"
: "${GREEN:=\033[0;32m}"
: "${YELLOW:=\033[1;33m}"
: "${NC:=\033[0m}"

COMPOSE_ENV_FILE="/tmp/private-website-compose.env"

dc() {
    docker compose -f "$DOCKER_COMPOSE_FILE" --project-name "$COMPOSE_PROJECT_NAME" "$@"
}

write_env_files() {
  : "${WEB_ORIGIN:?WEB_ORIGIN required}"

  {
    echo "WEB_ORIGIN=${WEB_ORIGIN}"
  } > "$COMPOSE_ENV_FILE"

  chmod 600 "$COMPOSE_ENV_FILE" 2>/dev/null || true
  echo -e "${GREEN}✅ Env files written to /tmp${NC}"
}

pull_and_tag_images() {
    : "${GHCR_TOKEN:?GHCR_TOKEN required}"
    : "${GITHUB_ACTOR:?GITHUB_ACTOR required}"
    : "${COMMIT_SHA:?COMMIT_SHA required}"
    : "${IMAGE_REPO_WEB:?IMAGE_REPO_WEB required}"
    : "${IMAGE_LOCAL_TAG_WEB:?IMAGE_LOCAL_TAG_WEB required}"

    local sha_short="${COMMIT_SHA:0:7}"
    local web_tag="${IMAGE_REPO_WEB}:sha-${sha_short}"

    echo "🔐 Authenticating with GHCR..."
    if ! echo "$GHCR_TOKEN" | docker login "${GHCR_REGISTRY:-ghcr.io}" -u "$GITHUB_ACTOR" --password-stdin; then
        echo -e "${RED}ERROR: GHCR login failed${NC}" >&2
        return 1
    fi

    echo "📥 Pulling ${web_tag}..."
    if ! docker pull "$web_tag"; then
        echo -e "${RED}ERROR: Failed to pull ${web_tag}${NC}" >&2
        return 1
    fi

    docker tag "$web_tag" "${IMAGE_REPO_WEB}:latest"
    docker tag "$web_tag" "$IMAGE_LOCAL_TAG_WEB"

    echo -e "${GREEN}✅ Images pulled and tagged${NC}"
}

health_check_port() {
    local container=$1
    local port=$2
    local path=$3
    local max_attempts=${4:-10}
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        echo "   Health ${attempt}/${max_attempts}: ${container} :${port}${path}"
        if docker ps --format '{{.Names}}' | grep -q "^${container}$"; then
            if curl -f -s -o /dev/null "http://127.0.0.1:${port}${path}"; then
                echo -e "${GREEN}   ✅ ${container} healthy${NC}"
                return 0
            fi
            if [ $attempt -eq 3 ] || [ $attempt -eq 6 ] || [ $attempt -eq $max_attempts ]; then
                docker logs "$container" --tail 30 2>&1 || true
            fi
        fi
        sleep 10
        attempt=$((attempt + 1))
    done
    return 1
}

stop_container_by_name() {
    local name=$1
    docker stop "$name" 2>/dev/null || true
    docker rm -f "$name" 2>/dev/null || true
}

tag_prod_prev_images() {
    local web_prev="${IMAGE_LOCAL_TAG_WEB%:*}:prod-prev"

    if docker inspect "$CONTAINER_NAME_WEB_PROD" >/dev/null 2>&1; then
        local web_id
        web_id=$(docker inspect --format='{{.Image}}' "$CONTAINER_NAME_WEB_PROD" 2>/dev/null || true)
        if [ -n "$web_id" ]; then
            docker tag "$web_id" "$web_prev" || true
        fi
    fi
}

restore_prod_prev_images() {
    local web_prev="${IMAGE_LOCAL_TAG_WEB%:*}:prod-prev"
    local restored=false

    if docker image inspect "$web_prev" >/dev/null 2>&1; then
        docker tag "$web_prev" "$IMAGE_LOCAL_TAG_WEB"
        restored=true
    fi

    if [ "$restored" = "false" ]; then
        echo "   No :prod-prev images — live prod unchanged."
        return 0
    fi
    return 0
}

stop_prod_stack() {
    stop_container_by_name "$CONTAINER_NAME_WEB_PROD"
}

cleanup_staging_stack() {
    echo "🧹 Cleaning staging stack..."
    stop_container_by_name "$CONTAINER_NAME_WEB_STAGING"
    echo -e "${GREEN}✅ Staging cleanup complete${NC}"
}
