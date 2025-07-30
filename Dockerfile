
FROM mcr.microsoft.com/playwright:v1.54.0-noble

ENV TZ="Europe/London"
ENV HEADLESS=true

USER root

RUN apt-get update && apt-get install -y \
    openjdk-17-jre-headless \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .
RUN npm install \
    && npx playwright install

ENTRYPOINT [ "./entrypoint.sh" ]
