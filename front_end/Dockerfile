FROM node:16-alpine AS builder

# General information about the code
LABEL maintainer="Rafael Lyra <rafael.lyra@lnls.br>"

# Set the container directories
WORKDIR /app

COPY package*.json ./
COPY . .

# Install typescript with the desired packages with npm
RUN npm install --loglevel verbose --force
RUN npm install typescript ts-node

RUN npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
