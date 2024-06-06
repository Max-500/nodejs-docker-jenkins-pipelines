FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

# Limpiar caché de npm
RUN npm cache clean --force

# Actualizar npm a la última versión
RUN npm install -g npm@latest

# Configurar caché de npm en un directorio accesible
RUN npm config set cache /tmp/.npm-cache --global

# Instalar las dependencias
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]