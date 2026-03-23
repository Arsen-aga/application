import express from "express";
import mysql from "mysql2/promise";
import tasksRouter from "./routes/tasks.route.ts";

const connection = await mysql.createConnection({
  host: "localhost",
  database: "evolve-life",
  user: "root",
  password: "",
});

const PORT = 3000;
const app = express();

// Добавил, чтобы можно было с локального фронта делать запросы на локальный бэк
// CORS middleware вручную
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// express.json() нужен, чтобы получать с клиента json. Используется для всех запросов
app.use(express.json());

// используется для получения данных с x-www-form-urlencoded. Если в приложении не работает отправка от формы, то этот метод не нужен
app.use(express.urlencoded({ extended: false }));
// { extended: true } нужен, когда большая вложенность, большой объект

app.use("/tasks", tasksRouter);

// Получить данные с корня АПИ
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

// Ни один запрос не сработал
app.use((req, res) => {
  res.status(404).json({ error: "Ничего не найдено" });
});

app.listen(PORT, () => {
  console.log(`server work on http://localhost:${PORT}`);
});
