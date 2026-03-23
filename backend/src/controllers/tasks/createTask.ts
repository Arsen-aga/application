import type { Request, Response } from "express";
import { tasks } from "../../dataTest.ts";

export const createTask = (req: Request, res: Response) => {
  const newTask = {
    id: tasks.length + 1,
    // получение заголовка с body
    title: req.body.title,
    description: req.body.description,
  };

  // добавление нового элемента в массив
  tasks.push(newTask);
  res.json(newTask);
};
