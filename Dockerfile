FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
RUN npm test
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]