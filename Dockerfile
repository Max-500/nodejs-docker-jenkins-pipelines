FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install
RUN npm config set cache /tmp/.npm-cache --global
RUN npm install --unsafe-perm

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
