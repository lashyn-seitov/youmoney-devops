# Многоэтапная сборка Docker

# Первый этап: сборка и установка зависимостей
FROM node:16 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Второй этап: создание финального образа
FROM node:16-alpine AS production

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы из первого этапа
COPY --from=build /app /app

# Устанавливаем зависимости для production
RUN npm install --production

# Указываем порт, который будет использоваться
EXPOSE 3000

# Запускаем приложение
CMD ["node", "server.js"]

