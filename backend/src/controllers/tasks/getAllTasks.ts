import type { Request, Response } from "express";
import { tasks } from "../../dataTest.ts";

// используются типы для параметров функции
export const getAllTasks = (req: Request, res: Response) => {
  // query параметры, дальше уже надо писать логику для этих параметров
  console.log("req.query", req.query);
  res.json(tasks);
};
