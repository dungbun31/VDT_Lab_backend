FROM node:alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

CMD ["npm", "run", "dev"]