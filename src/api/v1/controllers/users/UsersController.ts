import { Request, Response } from "express";
import ControllerInterface from "../ControllerInterface";

let data: any[] = [
  { id: 1, name: "Andry Pebrianto" },
  { id: 2, name: "Bagad Ihwalubin" },
  { id: 3, name: "Adi Cahyionio" },
];

class UsersController implements ControllerInterface {
  // @GET     | /api/v1/users
  index(req: Request, res: Response): Response {
    return res.json(data);
  }

  // @POST    | /api/v1/users
  create(req: Request, res: Response): Response {
    data.push({ id: data.length + 1, name: req.body.name });
    return res.json({ msg: "User added" });
  }

  // @GET     | /api/v1/users/:id
  show(req: Request, res: Response): Response {
    const { id } = req.params;
    const user = data.find((item) => item.id == id);

    return res.json(user);
  }

  // @PUT     | /api/v1/users/:id
  update(req: Request, res: Response): Response {
    const { id } = req.params;
    const { name } = req.body;

    data = data.map((item) => {
      if (item.id == id) {
        item.name = name;
      }

      return item;
    });

    return res.json({ msg: "User updated" });
  }

  // @DELETE  | /api/v1/users/:id
  delete(req: Request, res: Response): Response {
    const { id } = req.params;
    data = data.filter((item) => item.id != id);

    return res.json({ msg: "User deleted" });
  }
}

export default new UsersController();
