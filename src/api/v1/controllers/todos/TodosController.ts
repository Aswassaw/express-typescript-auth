import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ControllerInterface from "../ControllerInterface";
import db from "../../db/models";

const DB: any = db;

class TodosController implements ControllerInterface {
  // @GET     | /api/v1/todos
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const todos = await DB.todo.findAll({ include: { association: "user" } });

      return res.json(todos);
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
      let { title, description } = req.body;

      const user = await DB.user.findOne({
        where: { id: req.app.locals.credentials.user.id },
      });

      // Check if user exist
      if (!user)
        return res.status(404).json({ errors: [{ msg: "User not found" }] });

      // Create newUser object
      const newTodo = { user_id: user.id, title, description };

      // Insert todo
      await DB.todo.create(newTodo);

      return res.json({ msg: "Todo created" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  };

  // @GET     | /api/v1/todos/:id
  show = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const todo = await DB.todo.findOne({
        where: { id },
        include: { association: "user" },
      });

      if (!todo) {
        return res.status(404).json({ errors: [{ msg: "User not found" }] });
      }

      return res.json(todo);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  };

  // @PUT     | /api/v1/todos/:id
  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      // Check if user exist
      const user = await DB.user.findOne({
        where: { id: req.app.locals.credentials.user.id },
      });

      if (!user) {
        return res.status(404).json({ errors: [{ msg: "User not found" }] });
      }

      // Check if todo exist
      const todo = await DB.todo.findOne({
        where: { id },
      });

      if (!todo) {
        return res.status(404).json({ errors: [{ msg: "Todo not found" }] });
      }

      if (todo.user_id !== user.id) {
        return res
          .status(401)
          .json({ msg: "You have no access to do this action" });
      }

      // Update todo
      await DB.todo.update({ title, description }, { where: { id } });

      return res.json({ msg: "Todo updated" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  };

  // @DELETE  | /api/v1/todos/:id
  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      // Check if user exist
      const user = await DB.user.findOne({
        where: { id: req.app.locals.credentials.user.id },
      });

      if (!user) {
        return res.status(404).json({ errors: [{ msg: "User not found" }] });
      }

      // Check if todo exist
      const todo = await DB.todo.findOne({
        where: { id },
        include: { association: "user" },
      });

      if (!todo) {
        return res.status(404).json({ errors: [{ msg: "Todo not found" }] });
      }

      if (todo.user_id !== user.id) {
        return res
          .status(401)
          .json({ msg: "You have no access to do this action" });
      }

      await DB.todo.destroy({ where: { id } });

      return res.json({ msg: "Todo deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  };
}

export default new TodosController();
