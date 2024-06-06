FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

# Establecer la caché de npm y ajustar permisos
RUN npm config set cache /tmp/.npm-cache --global && \
    mkdir -p /tmp/.npm-cache && \
    chown -R node:node /tmp/.npm-cache && \
    npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
