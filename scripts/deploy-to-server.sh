#!/bin/bash
# Copies deploy assets to /tmp on the VPS and runs scripts/deploy.sh remotely.
#
# Usage: deploy-to-server.sh <mode>
#   mode = prepare | validate | swap | rollback | cleanup-staging | full
#
# REQUIRED env: DEPLOY_HOST, DEPLOY_USER, COMMIT_SHA, GHCR_TOKEN, GITHUB_ACTOR,
# GITHUB_REPOSITORY, WEB_ORIGIN, plus deploy metadata from deploy.yml.

set -e

RED='\033[0;31m'
NC='\033[0m'

if [ -z "${HOME}" ]; then
    export HOME="/home/runner"
fi

MODE="${1:-}"
if [ -z "$MODE" ]; then
    echo -e "${RED}ERROR: mode argument required${NC}" >&2
    exit 1
fi

: "${DEPLOY_HOST:?DEPLOY_HOST required}"
: "${DEPLOY_USER:?DEPLOY_USER required}"
if [ "$MODE" != "cleanup-staging" ]; then
    : "${COMMIT_SHA:?COMMIT_SHA required}"
fi
COMMIT_SHA="${COMMIT_SHA:-}"

SSH_KEY_PATH="${SSH_KEY_PATH:-$HOME/.ssh/private_website_deploy_key}"
SCRIPT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_SCRIPT="${SCRIPT_ROOT}/deploy.sh"
HELPERS_SCRIPT="${SCRIPT_ROOT}/deploy-helpers.sh"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.deploy.yml}"

REMOTE_DEPLOY="/tmp/private-website-deploy.sh"
REMOTE_HELPERS="/tmp/private-website-deploy-helpers.sh"
REMOTE_COMPOSE="/tmp/private-website-docker-compose.yml"

if [ ! -f "$SSH_KEY_PATH" ] || [ ! -f "$DEPLOY_SCRIPT" ] || [ ! -f "$HELPERS_SCRIPT" ]; then
    echo -e "${RED}ERROR: SSH key or deploy scripts not found${NC}" >&2
    exit 1
fi
if [ ! -f "$COMPOSE_FILE" ]; then
    echo -e "${RED}ERROR: compose file not found: $COMPOSE_FILE${NC}" >&2
    exit 1
fi

scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$HELPERS_SCRIPT" "$DEPLOY_USER@$DEPLOY_HOST:$REMOTE_HELPERS"
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$DEPLOY_SCRIPT" "$DEPLOY_USER@$DEPLOY_HOST:$REMOTE_DEPLOY"
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$COMPOSE_FILE" "$DEPLOY_USER@$DEPLOY_HOST:$REMOTE_COMPOSE"

escape() {
    printf '%s\n' "$1" | sed "s/'/'\\\\''/g"
}

ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$DEPLOY_USER@$DEPLOY_HOST" bash -s << EOF
set -e
export MODE='$(escape "$MODE")'
export COMMIT_SHA='$(escape "$COMMIT_SHA")'
export DOCKER_COMPOSE_FILE='${REMOTE_COMPOSE}'
export COMPOSE_PROJECT_NAME='$(escape "${COMPOSE_PROJECT_NAME:-private-website}")'
export GHCR_REGISTRY='ghcr.io'
export GHCR_TOKEN='$(escape "${GHCR_TOKEN:-}")'
export GITHUB_ACTOR='$(escape "${GITHUB_ACTOR:-}")'
export GITHUB_REPOSITORY='$(escape "${GITHUB_REPOSITORY:-}")'
export IMAGE_REPO_WEB='$(escape "${IMAGE_REPO_WEB:-}")'
export IMAGE_LOCAL_TAG_WEB='$(escape "${IMAGE_LOCAL_TAG_WEB:-}")'
export PROD_PORT_WEB='$(escape "${PROD_PORT_WEB:-4500}")'
export STAGING_PORT_WEB='$(escape "${STAGING_PORT_WEB:-4510}")'
export CONTAINER_NAME_WEB_PROD='$(escape "${CONTAINER_NAME_WEB_PROD:-private-website-web}")'
export CONTAINER_NAME_WEB_STAGING='$(escape "${CONTAINER_NAME_WEB_STAGING:-private-website-web-staging}")'
export WEB_ORIGIN='$(escape "${WEB_ORIGIN:-}")'
sed -i 's/\r$//' ${REMOTE_DEPLOY} ${REMOTE_HELPERS} 2>/dev/null || true
chmod +x ${REMOTE_DEPLOY} ${REMOTE_HELPERS}
ln -sf ${REMOTE_HELPERS} \$(dirname ${REMOTE_DEPLOY})/deploy-helpers.sh
${REMOTE_DEPLOY} '${MODE}'
rm -f ${REMOTE_DEPLOY}
EOF
