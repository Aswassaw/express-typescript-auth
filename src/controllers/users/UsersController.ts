import { Request, Response } from "express";
import UsersControllerInterface from "./UsersControllerInterface";

class UsersController implements UsersControllerInterface {
  // @GET  | /users
  index(req: Request, res: Response): Response {
    return res.json({ msg: "Endpoint users GET" });
  }
  // @POST | /users
  create(req: Request, res: Response): Response {
    return res.json({ msg: "Endpoint users POST", data: req.body });
  }

  show(req: Request, res: Response): Response {
    throw new Error("Method not implemented.");
  }

  update(req: Request, res: Response): Response {
    throw new Error("Method not implemented.");
  }

  delete(req: Request, res: Response): Response {
    throw new Error("Method not implemented.");
  }
}

export default new UsersController();
