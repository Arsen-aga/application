import type { Request, Response } from "express";
import { tasks } from "../../dataTest.ts";

export const deleteTask = (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    // Удаление задачи с массива
    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: `Удалена задача ${taskId}` });
  } else {
    res.status(404).json({ error: "Задачи не существует" });
  }
};
