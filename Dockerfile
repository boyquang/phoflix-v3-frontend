# ===============================
# 1. Build Stage
# ===============================
FROM node:20-alpine AS builder
# Next.js 15 khuyến nghị Node.js 18.17+ hoặc 20+, Alpine để giảm dung lượng

WORKDIR /app

# Copy package.json và package-lock.json (hoặc yarn.lock/pnpm-lock.yaml)
COPY package*.json ./

# Cài dependencies
RUN npm install --legacy-peer-deps

# Copy toàn bộ source code
COPY . .

# Build Next.js cho production
RUN npm run build

# ===============================
# 2. Production Stage
# ===============================
FROM node:20-alpine

WORKDIR /app

# Copy các file cần thiết từ builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./  

# Next.js 15 yêu cầu biến môi trường NODE_ENV=production khi chạy
ENV NODE_ENV=production

# Mở port 3000
EXPOSE 3000

# Chạy Next.js ở production mode
CMD ["npm", "start"]
