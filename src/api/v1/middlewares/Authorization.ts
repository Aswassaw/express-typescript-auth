import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

const Authorization = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ errors: [{ msg: "No token, Authorization denied" }] });
  }

  const secretKey = process.env.JWT_SECRET || "secret_basic_7&e$%dj2@0";

  try {
    const decoded: string | object = JWT.verify(token, secretKey);

    // Mengisi request dengan hasil decode jwt token
    req.app.locals.credentials = decoded;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ errors: [{ msg: "Token is not valid, Authorization failed" }] });
  }
};

export default Authorization;
