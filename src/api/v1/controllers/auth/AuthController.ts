import { Request, Response } from "express";
import db from "../../db/models";
import PasswordHash from "../../utils/PasswordHash";

const DB: any = db;

class AuthController {
  // @POST     | /api/v1/auth/register
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, email, password } = req.body;
    const newUser = {
      username,
      email,
      password,
    };
    newUser.password = await PasswordHash.hash(password);

    // Insert data
    await DB.user.create(newUser);

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
