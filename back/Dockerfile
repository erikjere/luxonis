FROM node:16 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx tsc index.ts
ENTRYPOINT [ "npm", "start" ]