FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@cookware/api --prod /prod/api

FROM base AS api
COPY --from=build /prod/api /app
COPY --from=build /usr/src/app/apps/web/dist /app/public
WORKDIR /app
EXPOSE 8080
CMD [ "node", "dist/index.js" ]
