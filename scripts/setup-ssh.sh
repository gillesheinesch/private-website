#!/bin/bash
# Configures SSH key + known_hosts and verifies connectivity to the deployment server.
#
# REQUIRED env vars:
#   DEPLOY_SSH_KEY   private key contents
#   DEPLOY_HOST      target hostname
#   DEPLOY_USER      ssh user

set -e

RED='\033[0;31m'
NC='\033[0m'

if [ -z "${HOME}" ]; then
    export HOME="/home/runner"
fi

: "${DEPLOY_SSH_KEY:?DEPLOY_SSH_KEY required}"
: "${DEPLOY_HOST:?DEPLOY_HOST required}"
: "${DEPLOY_USER:?DEPLOY_USER required}"

SSH_DIR="$HOME/.ssh"
SSH_KEY_PATH="$SSH_DIR/private_website_deploy_key"

mkdir -p "$SSH_DIR"
echo "$DEPLOY_SSH_KEY" > "$SSH_KEY_PATH"
chmod 600 "$SSH_KEY_PATH"
ssh-keyscan -H "$DEPLOY_HOST" >> "$SSH_DIR/known_hosts" 2>/dev/null || true

if ! ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no -o ConnectTimeout=10 "$DEPLOY_USER@$DEPLOY_HOST" 'echo ok' > /dev/null 2>&1; then
    echo -e "${RED}ERROR: SSH connection failed${NC}" >&2
    exit 1
fi
