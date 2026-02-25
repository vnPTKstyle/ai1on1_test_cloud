# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Chỉ cần package.json – npm install không phụ thuộc lock file
COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY package.json ./
RUN npm install --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

EXPOSE 8080

USER node

CMD ["node", "dist/main.js"]
