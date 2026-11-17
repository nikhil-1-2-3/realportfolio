# Multi-stage production container build for Portfolio Backend API
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Use official built-in node user (UID 1000) for security & host volume compatibility
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src

# Create data directory for audit log with permissions
RUN mkdir -p data && chown -R node:node /app

USER node

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:5000/api/health || exit 1

CMD ["node", "src/index.js"]

