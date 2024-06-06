FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install -g npm@latest
RUN npm config set cache /tmp/.npm-cache --global
RUN npm install --unsafe-perm

COPY . .

EXPOSE 3000

# Ejecuta los tests durante el build y si fallan, el build fallará
RUN npm test

CMD ["node", "index.js"]