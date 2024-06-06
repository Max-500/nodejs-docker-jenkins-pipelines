FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

EXPOSE 3000

RUN npm test

CMD ["node", "app.js"]