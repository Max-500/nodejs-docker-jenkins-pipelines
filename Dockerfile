FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

RUN npm test

EXPOSE 3000

CMD ["node", "app.js"]