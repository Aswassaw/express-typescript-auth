import { Router, Request, Response } from "express";
import UsersRouteInterface from "./UsersRouteInterface";
import UsersController from "../../controllers/users/UsersController";

class UsersRoute implements UsersRouteInterface {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    const { router } = this;

    // @GET  | /users
    router.get("/", UsersController.index);
    // @POST | /users
    router.post("/", UsersController.create);
  }
}

export default new UsersRoute().router;
