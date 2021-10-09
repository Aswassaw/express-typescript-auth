import { Request, Response } from "express";
import db from "../../db/models";

const DB: any = db;

class AuthController {
  // @POST     | /api/v1/auth/register
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, email, password } = req.body;
    const userCreated = await DB.user.create({
      username,
      email,
      password,
    });

    return res.json({
      msg: "Registration Success",
    });
  };

  // @POST    | /api/v1/auth/login
  login(req: Request, res: Response): Response {
    return res.json({});
  }
}

export default new AuthController();
