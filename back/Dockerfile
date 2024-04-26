FROM oven/bun:latest as builder

WORKDIR /app

COPY . .
RUN bun install --frozen-lockfile --production

EXPOSE 3001

CMD bun prisma db push || true && bun start
