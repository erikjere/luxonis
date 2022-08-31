FROM node:16 AS builder
WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:1.23.1-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ADD ./nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
