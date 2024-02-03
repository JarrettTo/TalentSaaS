FROM --platform=amd64 node:16-alpine as builder

WORKDIR /app

ARG build_env

COPY ./ .
RUN npm ci --production=false \
  && npm run build:$build_env

FROM --platform=amd64 node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY ./ .

RUN npm ci --production=true

EXPOSE 3000
CMD npm run serve
