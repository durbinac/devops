# Usamos una imagen ligera de Node.js
FROM node:20-alpine

# Carpeta donde vivirá la app dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero para que sea más rápido
COPY package*.json ./

# Instalamos las librerías
RUN npm install

# Copiamos el resto de tu código
COPY . .

# Exponemos el puerto 3000 (donde corre tu app.js)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]