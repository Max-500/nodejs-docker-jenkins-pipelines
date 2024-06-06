FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install
RUN npm test

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]