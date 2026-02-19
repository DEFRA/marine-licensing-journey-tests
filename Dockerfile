FROM node:22.21.0-alpine

ENV TZ="Europe/London"
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium
ENV HEADLESS=true

USER root

RUN apk add --no-cache \
    openjdk17-jre-headless \
    curl \
    aws-cli \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ca-certificates-bundle \
    openssl \
    openssl-dev \
    libssl3 \
    ttf-freefont

# Update certificate store
RUN update-ca-certificates

WORKDIR /app

COPY . .
RUN npm install

ENTRYPOINT [ "./entrypoint.sh" ]
