FROM node:alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-src

FROM node:alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

EXPOSE 6868

CMD ["npm", "run", "dev"]