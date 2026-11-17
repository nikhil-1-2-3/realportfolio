#!/usr/bin/env bash
# ==============================================================================
# AWS SSM ZERO-DOWNTIME CONTINUOUS DEPLOYMENT RUNNER WITH AUTOMATIC ROLLBACK
# Executed on the K8s Management / Control-Plane instance by GitHub Actions
# ==============================================================================

set -euo pipefail

IMAGE_TAG="${1:-latest}"
NAMESPACE="portfolio"
TIMEOUT_SECONDS=180

echo "=== [CD Runner] Starting Deployment Update for Tag: ${IMAGE_TAG} ==="

export KUBECONFIG=/etc/kubernetes/admin.conf

# 1. Update Frontend & Backend Deployments to Immutable Tag
echo "--> Updating Backend Deployment..."
kubectl set image deployment/portfolio-backend \
  backend="ghcr.io/nikhil-1-2-3/portfolio-backend:${IMAGE_TAG}" \
  -n "${NAMESPACE}"

echo "--> Updating Frontend Deployment..."
kubectl set image deployment/portfolio-frontend \
  frontend="ghcr.io/nikhil-1-2-3/portfolio-frontend:${IMAGE_TAG}" \
  -n "${NAMESPACE}"

# 2. Monitor Rolling Update Rollout
echo "--> Awaiting Backend Rollout Status..."
if ! kubectl rollout status deployment/portfolio-backend -n "${NAMESPACE}" --timeout="${TIMEOUT_SECONDS}s"; then
  echo "!!! [CRITICAL] Backend Rollout Failed or Timed Out! Triggering Automatic Rollback..."
  kubectl rollout undo deployment/portfolio-backend -n "${NAMESPACE}"
  exit 1
fi

echo "--> Awaiting Frontend Rollout Status..."
if ! kubectl rollout status deployment/portfolio-frontend -n "${NAMESPACE}" --timeout="${TIMEOUT_SECONDS}s"; then
  echo "!!! [CRITICAL] Frontend Rollout Failed or Timed Out! Triggering Automatic Rollback..."
  kubectl rollout undo deployment/portfolio-frontend -n "${NAMESPACE}"
  exit 1
fi

# 3. Verify Live In-Cluster Pod Health
echo "--> Verifying Backend /api/health Endpoint..."
BACKEND_POD=$(kubectl get pod -n "${NAMESPACE}" -l app=portfolio-backend -o jsonpath='{.items[0].metadata.name}')
if ! kubectl exec -n "${NAMESPACE}" "${BACKEND_POD}" -- wget -q -O - http://127.0.0.1:5000/api/health | grep -q '"status":"healthy"'; then
  echo "!!! [CRITICAL] In-cluster health check probe degraded! Triggering Rollback..."
  kubectl rollout undo deployment/portfolio-backend -n "${NAMESPACE}"
  kubectl rollout undo deployment/portfolio-frontend -n "${NAMESPACE}"
  exit 1
fi

echo "=== [CD Runner] Deployment Successfully Verified & Healthy! ==="

