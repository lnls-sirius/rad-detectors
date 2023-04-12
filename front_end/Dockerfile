FROM node:19-alpine3.16 AS builder

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

FROM nginx:1.24
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
