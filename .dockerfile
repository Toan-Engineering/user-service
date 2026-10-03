# Define the base stage
FROM node:24.16.0

WORKDIR /app

COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./pnpm-workspace.yaml ./

RUN npm install -g pnpm@12.4.1
RUN pnpm install

COPY . .

RUN pnpm build

# Define the build stage
FROM node:24.16.0-alpine AS base

WORKDIR /app

RUN npm install -g pnpm@12.4.1


FROM base AS dependencies

COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile


FROM dependencies AS build

COPY . .

# RUN pnpm exec prisma generate
RUN pnpm build
RUN pnpm prune --prod


FROM node:24.16.0-alpine AS deploy

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

USER node

CMD ["node", "dist/main.js"]