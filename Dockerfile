FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

# Instalar las dependencias
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]