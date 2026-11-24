#!/usr/bin/env bash
# ==============================================================================
# BACKEND ZERO-DOWNTIME DEPLOYMENT SCRIPT FOR AWS EC2
# Targets: Ubuntu 22.04 LTS running Docker
# ==============================================================================

set -euo pipefail

IMAGE_TAG="${1:-latest}"
IMAGE_NAME="ghcr.io/nikhil-1-2-3/portfolio-backend:${IMAGE_TAG}"
CONTAINER_NAME="portfolio-api"

DB_HOST="${DB_HOST:-portfolio-rds-mysql.cxa24sgui43m.ap-south-1.rds.amazonaws.com}"
DB_PORT="${DB_PORT:-3306}"
DB_USER="${DB_USER:-portfolio_admin}"
DB_PASSWORD="${DB_PASSWORD:-PortfolioSecure2026!#}"
DB_NAME="${DB_NAME:-portfolio_db}"
PORT="${PORT:-5000}"

echo "=================================================="
echo " Starting Portfolio Backend Deployment"
echo " Image:     ${IMAGE_NAME}"
echo " Container: ${CONTAINER_NAME}"
echo " Database:  ${DB_HOST}:${DB_PORT}/${DB_NAME}"
echo "=================================================="

# Pull updated container image
echo "--> Pulling latest image..."
sudo docker pull "${IMAGE_NAME}" || {
  echo "WARN: Failed to pull ${IMAGE_NAME}, attempting fallback to local build or :latest"
  sudo docker pull "ghcr.io/nikhil-1-2-3/portfolio-backend:latest" || true
}

# Stop and remove existing container
echo "--> Stopping existing container (if running)..."
sudo docker stop "${CONTAINER_NAME}" 2>/dev/null || true
sudo docker rm "${CONTAINER_NAME}" 2>/dev/null || true

# Run new container
echo "--> Launching new container..."
sudo docker run -d \
  --name "${CONTAINER_NAME}" \
  --restart unless-stopped \
  -p "${PORT}:5000" \
  -e NODE_ENV=production \
  -e PORT=5000 \
  -e DB_HOST="${DB_HOST}" \
  -e DB_PORT="${DB_PORT}" \
  -e DB_USER="${DB_USER}" \
  -e DB_PASSWORD="${DB_PASSWORD}" \
  -e DB_NAME="${DB_NAME}" \
  -e CORS_ORIGIN="*" \
  "${IMAGE_NAME}"

# Health check validation
echo "--> Verifying health check on http://localhost:${PORT}/api/health..."
HEALTHY=false
for i in {1..20}; do
  if curl -sf "http://localhost:${PORT}/api/health" > /dev/null; then
    HEALTHY=true
    break
  fi
  echo "    Attempt ${i}/20: waiting for backend to become ready..."
  sleep 2
done

if [ "$HEALTHY" = true ]; then
  echo "=================================================="
  echo " Backend Deployment Succeeded!"
  echo " Status: Healthy (200 OK)"
  echo " URL:    http://localhost:${PORT}/api/health"
  echo "=================================================="
  sudo docker ps --filter "name=${CONTAINER_NAME}"
  exit 0
else
  echo "=================================================="
  echo " ERROR: Health check failed!"
  echo " Container logs:"
  echo "=================================================="
  sudo docker logs --tail 50 "${CONTAINER_NAME}"
  exit 1
fi

