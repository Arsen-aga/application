import express from "express";
import { tasks } from "../dataTest.ts";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getCategoryTask,
} from "../controllers/tasks.controller.ts";

const router = express.Router();

// Получить все задачи
router.get("/", getAllTasks);

// Пример использования вложенных параметров
// В данном случае получаем категорию задачи
router.get("/:id/category/:categoryId", getCategoryTask);

// Получить одну задачу
router.get("/:id", getTaskById);

// Создать одну задачу
router.post("/", createTask);

// Редактировать одну задачу
router.patch("/:id", updateTask);

// Удаление задачи
router.delete("/:id", deleteTask);

// Этот метод нужен для того, чтобы написать логику для любого запроса по конкретной сущности
// router.all("/");

export default router;
