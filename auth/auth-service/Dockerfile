FROM node:20-alpine

# Install dependencies including protoc
RUN apk add --no-cache \
    bash \
    curl \
    unzip \
    protobuf \
    git \
    build-base

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
# Run build (includes proto:generate and copy:proto)
RUN npm run build && npx prisma generate

# Use .env inside the container
ENV NODE_ENV=production

EXPOSE 3011

# Run migrations at container start (runtime)
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
