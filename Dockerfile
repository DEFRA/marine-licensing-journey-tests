FROM node:22.13.1-alpine

ENV TZ="Europe/London"

USER root

RUN apk add --no-cache \
    aws-cli \
    curl \
    openjdk17-jre-headless \
    unzip && \
    mkdir -p /root/.cache/ms-playwright/chromium-1181/chrome-linux && \
    curl -L -o /tmp/chromium-linux.zip https://cdn.playwright.dev/dbazure/download/playwright/builds/chromium/1181/chromium-linux.zip && \
    unzip /tmp/chromium-linux.zip -d /tmp/ && \
    cp /tmp/chrome-linux/chrome /root/.cache/ms-playwright/chromium-1181/chrome-linux/chrome && \
    chmod +x /root/.cache/ms-playwright/chromium-1181/chrome-linux/chrome && \
    rm -rf /tmp/chromium-linux.zip /tmp/chrome-linux

WORKDIR /app

COPY . .
RUN npm install

ENTRYPOINT [ "./entrypoint.sh" ]