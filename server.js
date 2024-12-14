const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 80;

// Настройка подключения к базе данных
const db = mysql.createConnection({
    host: 'database.cv6sec244rco.eu-west-1.rds.amazonaws.com',
    user: 'admin', // замените на ваш MySQL логин
    password: 'password', // замените на ваш MySQL пароль
    database: 'finance_tracker'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL Database.');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Обслуживание статических файлов
app.use(express.static(__dirname));

// Маршрут для отображения главной страницы
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Маршрут для добавления транзакции
app.post('/add-transaction', (req, res) => {
    const { type, amount, description } = req.body;
    const sql = 'INSERT INTO transactions (type, amount, description) VALUES (?, ?, ?)';
    db.query(sql, [type, amount, description], (err, result) => {
        if (err) throw err;
        res.send('Transaction added.');
    });
});

// Маршрут для получения всех транзакций
app.get('/transactions', (req, res) => {
    const sql = 'SELECT * FROM transactions';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Маршрут для получения общей суммы доходов и расходов
app.get('/summary', (req, res) => {
    const sqlIncome = 'SELECT SUM(amount) AS total_income FROM transactions WHERE type = "income"';
    const sqlExpense = 'SELECT SUM(amount) AS total_expense FROM transactions WHERE type = "expense"';

    db.query(sqlIncome, (err, incomeResult) => {
        if (err) throw err;

        db.query(sqlExpense, (err, expenseResult) => {
            if (err) throw err;

            const totalIncome = incomeResult[0].total_income || 0;
            const totalExpense = expenseResult[0].total_expense || 0;

            res.json({ totalIncome, totalExpense });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

