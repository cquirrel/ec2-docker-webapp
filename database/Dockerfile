FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY migrations migrations
RUN ["npm", "run", "migrate", "up"]