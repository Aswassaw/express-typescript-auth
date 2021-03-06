import { Request, Response } from "express";
import ControllerInterface from "../ControllerInterface";
import db from "../../db/models";

const DB: any = db;

let data: any[] = [
  { id: 1, name: "Andry Pebrianto" },
  { id: 2, name: "Bagad Ihwalubin" },
  { id: 3, name: "Adi Cahyionio" },
];

class UsersController implements ControllerInterface {
  // @GET     | /api/v1/users
  index = async (req: Request, res: Response): Promise<Response> => {
    const user = await DB.user.findOne({
      where: { id: req.app.locals.credentials.user.id },
    });
    return res.json({ user, data });
  };

  // @POST    | /api/v1/users
  create = async (req: Request, res: Response): Promise<Response> => {
    data.push({ id: data.length + 1, name: req.body.name });
    return res.json({ msg: "User created" });
  };

  // @GET     | /api/v1/users/:id
  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const user = data.find((item) => item.id == id);

    return res.json(user);
  };

  // @PUT     | /api/v1/users/:id
  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { name } = req.body;

    data = data.map((item) => {
      if (item.id == id) {
        item.name = name;
      }

      return item;
    });

    return res.json({ msg: "User updated" });
  };

  // @DELETE  | /api/v1/users/:id
  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    data = data.filter((item) => item.id != id);

    return res.json({ msg: "User deleted" });
  };
}

export default new UsersController();
