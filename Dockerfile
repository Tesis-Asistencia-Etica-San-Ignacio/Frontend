# Stage 1: Build
FROM node:18-alpine as builder
WORKDIR /app
# Copia los archivos de dependencias
COPY package*.json ./
RUN bun install
# Copia todo el proyecto
COPY . .
# Ejecuta la build (asegúrate de tener "build": "vite build" en package.json)
RUN bun run build

# Stage 2: Servir la aplicación
FROM nginx:stable-alpine
# Copia la carpeta generada por Vite (dist) al directorio que Nginx usa para servir archivos
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
