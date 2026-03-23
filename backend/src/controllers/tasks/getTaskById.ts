import type { Request, Response } from "express";
import { tasks } from "../../dataTest.ts";

export const getTaskById = (req: Request, res: Response) => {
  // получаем из параметра id задачи в десятичной системе счисления
  const taskId = parseInt(req.params.id, 10);

  // получаем задачу по id
  const task = tasks.find((task) => task.id === taskId);

  // если есть задача, то возвращаем ее
  if (task) {
    res.json(task);
    // если нет задачи, то возвращаем 404 ошибку
  } else {
    res.status(404).json({ error: "Задачи не существует" });
  }
};
