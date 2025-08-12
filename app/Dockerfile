FROM node:20-alpine

WORKDIR /app

COPY index.js .
COPY package.json .
COPY package-lock.json .
RUN npm install

CMD ["node", "index.js"]
