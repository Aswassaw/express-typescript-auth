import { Request, Response, NextFunction } from "express";

const Authorization = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  console.log("Ini adalah middleware");
  next();
};

export default Authorization;
