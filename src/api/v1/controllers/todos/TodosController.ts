import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ControllerInterface from "../ControllerInterface";
import db from "../../db/models";

const DB: any = db;

class TodosController implements ControllerInterface {
  // @GET     | /api/v1/todos
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await DB.user.findOne({
        where: { id: req.app.locals.credentials.user.id },
      });
      return res.json(1);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  };

  // @POST    | /api/v1/todos
  create = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);

    try {
      return res.json(2);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  };

  // @GET     | /api/v1/todos/:id
  show = async (req: Request, res: Response): Promise<Response> => {
    return res.json(3);
  };

  // @PUT     | /api/v1/todos/:id
  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      return res.json(2);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  };

  // @DELETE  | /api/v1/todos/:id
  delete = async (req: Request, res: Response): Promise<Response> => {
    return res.json(5);
  };
}

export default new TodosController();
