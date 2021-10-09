import { Request, Response } from "express";
import { validationResult } from "express-validator";
import crypto from "crypto";
import db from "../../db/models";
import Password from "../../utils/Password";
import EmailTemplate from "../../utils/EmailTemplate";
import SendEmail from "../../utils/SendEmail";
import JWTUtils from "../../utils/JWTUtils";

const DB: any = db;

class AuthController {
  // @POST     | /api/v1/auth/register
  register = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);

    try {
      let { username, email, password } = req.body;

      // Find user by email
      const user = await DB.user.findOne({
        where: {
          email,
        },
      });

      // Return error if email already exist
      if (user)
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already exists" }] });

      // Create newUser object
      const newUser = {
        username,
        email,
        password,
      };
      newUser.password = await Password.hash(password);

      // Insert user
      await DB.user.create(newUser);

      // Create token object
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
        html: EmailTemplate.createEmailTemplate(
          "Registrasi User",
          newToken.token
        ),
      };
      SendEmail.send(templateEmail);

      return res.json({
        msg: "Registration Success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  };

  // @POST    | /api/v1/auth/login
  login = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);

    try {
      let { email, password } = req.body;

      // Find user by email
      const user = await DB.user.findOne({
        where: {
          email,
        },
      });

      // Return error if user is not exist
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid email or password" }] });
      }

      // Return error if password wrong
      if (!(await Password.compare(password, user.password))) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid email or password" }] });
      }

      // Generate token
      const jwtToken = JWTUtils.generateJwtToken(user.id);

      return res.json({ msg: "Login Success", token: jwtToken });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  };
}

export default new AuthController();
