# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
# npm ci cần package-lock.json khớp package.json; nếu lệch thì dùng npm install
RUN npm ci || npm install

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

EXPOSE 8080

USER node

CMD ["node", "dist/main.js"]
