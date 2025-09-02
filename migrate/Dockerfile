FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY index.js .
COPY migrations/ migrations/

CMD ["npm", "run", "migrate"]