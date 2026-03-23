import type { Request, Response } from "express";
import { tasks } from "../../dataTest.ts";

export const getCategoryTask = (req: Request, res: Response) => {
  console.log("req.params", req.params);
  res.json({});
};
