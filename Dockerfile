# Usar la versión específica de Node.js
FROM node:20.11.1

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

RUN npm cache clean --force

# Instalar las dependencias de npm
RUN npm install --verbose
RUN npm list


# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]