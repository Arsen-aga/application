import type { Request, Response } from "express";
import { tasks } from "../../dataTest.ts";

export const updateTask = (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    if (req.body.title) tasks[taskIndex].title = req.body.title;
    if (req.body.description)
      tasks[taskIndex].description = req.body.description;
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: "Задачи не существует" });
  }
};
