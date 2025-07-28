USER root

RUN apk add --no-cache \
    openjdk17-jre-headless \
    curl \
    aws-cli

WORKDIR /app

COPY . .
RUN npm install && \
    npx playwright install chromium

ENTRYPOINT [ "./entrypoint.sh" ]
