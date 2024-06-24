# Finance Tracker Application

## Введение
Это простое приложение для подсчета ваших финансовых расходов и доходов, построенное с использованием **HTML**, **CSS**, **Node.js** и **MySQL**. Приложение позволяет пользователям добавлять, просматривать и суммировать финансовые транзакции.

## Содержание
- [Введение](#введение)
- [Функции](#функции)
- [Технологии](#технологии)
- [Установка](#установка)
- [Установка базы данных](#установка-базы-данных)
- [Разворачивание Docker](#разворачивание-docker)
- [Запуск приложения](#запуск-приложения)
- [Структура проекта](#структура-проекта)

## Функции
- **Добавление транзакций** (доход/расход)
- **Просмотр всех транзакций**
- **Подсчет общего дохода и расхода**

## Технологии
- **Node.js**
- **Express.js**
- **MySQL**
- **Docker**

## Установка
1. Клонируйте себе репозиторий:
    ```sh
    git clone git@github.com:lashyn-seitov/youmoney-devops.git
    cd youmoney-devops
    ```

## Установка базы данных
1. Зайдите на свой MySQL сервер и создайте новую базу данных:
    ```sql
    CREATE DATABASE finance_tracker;
    ```

2. Создайте таблицу `transactions`:
    ```sql
    CREATE TABLE transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(10),
        amount DECIMAL(10, 2),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

3. Создайте нового MySQL пользователя с нужными правами:
    ```sql
    CREATE USER 'newuser'@'%' IDENTIFIED BY 'password';
    GRANT ALL PRIVILEGES ON finance_tracker.* TO 'newuser'@'%';
    FLUSH PRIVILEGES;
    ```

## Разворачивание Docker
1. Соберите Docker image:
    ```sh
    docker build -t finance_app .
    ```

2. Запустите Docker контейнер:
    ```sh
    docker run -d -p 3000:3000 --name finance_app finance_app
    ```

## Запуск приложения
Для запуска приложения локально убедитесь, что Node.js и другие зависимости установлены. Следуйте инструкциям для установки всех необходимых зависимостей для настройки и подключения к базе данных.
1. Запустите конфигурационный файл `server.js`:
    ```sh
    node server.js    
    ```

## Структура проекта
 - server.js # Конфигурационный файл сервера Node.js
 - Dockerfile # Конфигурационный файл Docker
 - .dockerignore # Файлы, которые следует игнорировать при сборке Docker
 - index.html # Главная страница HTML
 - style.css  # Стили
 - package.json # Содержит метаданные проекта Node.js
 - package-lock.json # Содержит зависимости Node.js
