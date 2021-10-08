import { Request, Response } from "express";

class AuthController {
  // @POST     | /api/v1/auth/register
  register(req: Request, res: Response): Response {
    return res.json({});
  }

  // @POST    | /api/v1/auth/login
  login(req: Request, res: Response): Response {
    return res.json({});
  }
}

export default new AuthController();
