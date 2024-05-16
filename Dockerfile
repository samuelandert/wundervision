# Use a multi-stage build to optimize caching and minimize final image size
# Base stage for common setup
FROM docker.io/node:18-alpine AS base
WORKDIR /app

COPY . ./

# RUN npm install

# Builder stage to handle dependency installation and pruning
FROM base AS builder
COPY package.json package-lock.json ./
# Install global dependencies for the build process
RUN apk add --no-cache libc6-compat && \
  apk update && \
  npm install -g turbo

# Use turbo to prune dependencies
# This command assumes your project uses turbo and is set up accordingly
RUN turbo prune api --docker

# Copy the pruned files and install dependencies
FROM base AS installer
COPY --from=builder /app/out/full/ ./
RUN npm ci --prefer-offline --no-audit

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

# Generate the WunderGraph client
# RUN wunderctl generate --wundergraph-dir=.
RUN npm run api:build

# Expose the necessary ports
EXPOSE 9991

# Define the command to run your application
# CMD wunderctl start --wundergraph-dir=.
CMD npm run api:start



# Use the official Bun image based on Alpine
# FROM oven/bun:1.1.8-alpine AS base

# # Ensure glibc is installed (if not already included in the base image)
# RUN apk --no-cache add glibc

# WORKDIR /app

# # Install necessary packages to handle the download and extraction
# RUN apk add --no-cache curl tar

# # Download and install the wunderctl binary
# RUN curl -L "https://github.com/wundergraph/wundergraph/releases/download/v0.180.0/wunderctl_0.180.0_Linux_x86_64.tar.gz" -o wunderctl.tar.gz \
#     && tar -xzf wunderctl.tar.gz -C /usr/local/bin \
#     && rm wunderctl.tar.gz

# # Copy all project files into the image
# COPY . .

# # Install dependencies with Bun
# # Assuming you have a bun.lockb file
# COPY package.json bun.lockb ./
# RUN bun install --frozen-lockfile

# # Copy files and install production dependencies
# # Since bun prune is not available, we skip this step
# FROM base AS installer
# COPY --from=base /app/node_modules ./node_modules

# # Final stage to build the application
# FROM installer AS final

# # Set environment variables as needed
# ENV CI=true \
#     WG_COPY_BIN_PATH=/usr/bin/wunderctl \
#     WG_NODE_URL=http://127.0.0.1:9991 \
#     WG_NODE_INTERNAL_URL=http://127.0.0.1:9993 \
#     WG_NODE_HOST=0.0.0.0 \
#     WG_NODE_PORT=9991 \
#     WG_NODE_INTERNAL_PORT=9993 \
#     WG_SERVER_URL=http://127.0.0.1:9992 \
#     WG_SERVER_HOST=127.0.0.1 \
#     WG_SERVER_PORT=9992 \
#     WG_PUBLIC_NODE_URL=${wg_public_node_url}

# # Generate the WunderGraph client or build your application
# RUN bun run api:build

# # Expose the necessary ports
# EXPOSE 9991

# # Define the command to run your application
# CMD ["bun", "run", "api:start"]
