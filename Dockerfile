FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install -g npm@latest
RUN npm config set cache /tmp/.npm-cache --global
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]