FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

# Limpia la caché de npm, actualiza npm a la última versión y establece la caché de npm en /tmp
RUN npm cache clean --force \
    && npm install -g npm@latest \
    && npm config set cache /tmp/.npm-cache --global \
    && npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
