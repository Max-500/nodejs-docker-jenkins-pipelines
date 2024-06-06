FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Ejecuta los tests durante el build y si fallan, el build fallará
RUN npm test

EXPOSE 3000

CMD ["node", "app.js"]