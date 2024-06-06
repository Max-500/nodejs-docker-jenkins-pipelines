FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

RUN npm config set cache /tmp/.npm-cache --global && \
    npm install && \
    npm install --production && \
    npm install mocha && \
    npm install methods

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]