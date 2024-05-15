# Use the official Bun image
FROM oven/bun:1.1.8-alpine AS base
WORKDIR /app

# Copy all project files into the image
COPY . .

# Install dependencies with Bun
# Assuming you have a bun.lockb file
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Builder stage to handle dependency pruning (if necessary)
# This example assumes you might need to prune or build with Bun
FROM base AS builder
RUN bun prune --production

# Copy pruned files and install production dependencies
FROM base AS installer
COPY --from=builder /app/node_modules ./node_modules

# Final stage to build the application
FROM installer AS final

# Set environment variables as needed
ENV CI=true \
    WG_COPY_BIN_PATH=/usr/bin/wunderctl \
    WG_NODE_URL=http://127.0.0.1:9991 \
    WG_NODE_INTERNAL_URL=http://127.0.0.1:9993 \
    WG_NODE_HOST=0.0.0.0 \
    WG_NODE_PORT=9991 \
    WG_NODE_INTERNAL_PORT=9993 \
    WG_SERVER_URL=http://127.0.0.1:9992 \
    WG_SERVER_HOST=127.0.0.1 \
    WG_SERVER_PORT=9992 \
    WG_PUBLIC_NODE_URL=${wg_public_node_url}

# Generate the WunderGraph client or build your application
RUN bun run api:build

# Expose the necessary ports
EXPOSE 9991

# Define the command to run your application
CMD ["bun", "run", "api:start"]