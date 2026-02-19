FROM node:22.21.0-bookworm

ENV TZ="Europe/London"
ENV HEADLESS=true

USER root

RUN apt-get update && apt-get install -y --no-install-recommends \
    openjdk-17-jre-headless \
    curl \
    awscli \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .
RUN npm install \
    && npx playwright install chromium --with-deps

ENTRYPOINT [ "./entrypoint.sh" ]
