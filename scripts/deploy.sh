#!/bin/bash
# Atomic production deploy for web stack (runs on VPS via SSH).
#
# Modes (driven by GitHub Actions):
#   prepare          — pull and tag GHCR images
#   validate         — staging port health check (web)
#   swap             — replace live prod container
#   rollback         — restore :prod-prev image if swap failed
#   cleanup-staging  — safety net to remove staging containers
#   full             — prepare + validate + swap (manual one-shot)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck disable=SC1091
. "${SCRIPT_DIR}/deploy-helpers.sh"

MODE="${1:-${MODE:-full}}"
case "$MODE" in
    prepare|validate|swap|rollback|full|cleanup-staging) ;;
    *)
        echo -e "${RED}ERROR: unknown MODE='${MODE}'${NC}" >&2
        exit 1
        ;;
esac

DOCKER_COMPOSE_FILE="${DOCKER_COMPOSE_FILE:-/tmp/private-website-docker-compose.yml}"
COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME:-private-website}"

echo "🚀 deploy.sh mode=${MODE}"

do_prepare() {
    write_env_files
    pull_and_tag_images
}

do_validate() {
    write_env_files
    pull_and_tag_images
    cleanup_staging_stack

    echo "🧪 Starting staging stack..."
    dc --profile staging up -d --no-deps private-website-web-staging
    sleep 10

    if ! health_check_port "$CONTAINER_NAME_WEB_STAGING" "$STAGING_PORT_WEB" "/" 10; then
        echo -e "${RED}❌ Web staging health check failed${NC}" >&2
        return 1
    fi
    echo -e "${GREEN}✅ Staging validation passed${NC}"
}

do_swap() {
    write_env_files
    pull_and_tag_images

    echo "🔖 Capturing live prod images for rollback..."
    tag_prod_prev_images

    echo "🔄 Stopping live prod..."
    stop_prod_stack
    sleep 2

    echo "🚀 Starting new live prod..."
    dc --profile prod up -d --no-deps private-website-web
    sleep 15

    if ! health_check_port "$CONTAINER_NAME_WEB_PROD" "$PROD_PORT_WEB" "/" 8; then
        echo -e "${RED}❌ Web prod health check failed${NC}" >&2
        return 1
    fi

    cleanup_staging_stack
    docker image prune -f || true
    echo -e "${GREEN}🎉 Prod swap succeeded${NC}"
}

do_rollback() {
    cleanup_staging_stack
    restore_prod_prev_images

    local web_prev="${IMAGE_LOCAL_TAG_WEB%:*}:prod-prev"
    if ! docker image inspect "$web_prev" >/dev/null 2>&1; then
        return 0
    fi

    write_env_files
    stop_prod_stack
    sleep 2

    dc --profile prod up -d --no-deps private-website-web
    sleep 10

    if ! health_check_port "$CONTAINER_NAME_WEB_PROD" "$PROD_PORT_WEB" "/" 6; then
        echo -e "${RED}❌ Rolled-back web prod is unhealthy${NC}" >&2
        return 1
    fi

    docker rmi "$web_prev" 2>/dev/null || true
    echo -e "${GREEN}✅ Prod restored to previous images${NC}"
}

if [ "$MODE" = "cleanup-staging" ]; then
    cleanup_staging_stack
    exit 0
fi

if [ ! -f "$DOCKER_COMPOSE_FILE" ]; then
    echo -e "${RED}ERROR: compose file not found: $DOCKER_COMPOSE_FILE${NC}" >&2
    exit 1
fi

case "$MODE" in
    prepare) do_prepare ;;
    validate) do_validate ;;
    swap) do_swap ;;
    rollback) do_rollback ;;
    full) do_prepare && do_validate && do_swap ;;
esac
