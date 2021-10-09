import { Request, Response } from "express";
import crypto from "crypto";
import db from "../../db/models";
import CreateEmailTemplate from "../../utils/CreateEmailTemplate";
import PasswordHash from "../../utils/PasswordHash";
import SendEmail from "../../utils/SendEmail";

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

    // Insert user
    await DB.user.create(newUser);

    const token = crypto.randomBytes(35).toString("hex");
    const newToken = {
      email: newUser.email,
      token,
      type: "Verify Account",
    };

    // Insert token
    await DB.token.create(newToken);

    // Send email
    const templateEmail = {
      from: '"NibiruDev" <noreply@nibirudev.com>',
      to: newUser.email,
      subject: "Verify Your Account!",
      html: CreateEmailTemplate.createEmailTemplate(
        "Registrasi User",
        newToken.token
      ),
    };
    SendEmail.send(templateEmail);

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
