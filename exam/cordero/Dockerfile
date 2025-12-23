# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install OS deps (optional)
RUN apk add --no-cache bash

# Copy only package files first for better caching
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install dependencies
# Prefer npm; switch to yarn/pnpm if lockfile exists
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable; pnpm install --frozen-lockfile; \
    else npm ci; fi

# Copy source code
COPY . .

# Expose default port
ENV PORT=3000
EXPOSE 3000

# Set node environment
ENV NODE_ENV=production

# Build step (if your app needs it)
# RUN npm run build

# Start the application
CMD ["npm", "start"]
