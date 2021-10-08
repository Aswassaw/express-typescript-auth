import { Router } from "express";
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

    // @GET     | /api/v1/users
    router.get("/", UsersController.index);
    // @POST    | /api/v1/users
    router.post("/", UsersController.create);
    // @GET     | /api/v1/users/:id
    router.get("/:id", UsersController.show);
    // @PUT     | /api/v1/users/:id
    router.put("/:id", UsersController.update);
    // @DELETE  | /api/v1/users/:id
    router.delete("/:id", UsersController.delete);
  }
}

export default new UsersRoute().router;
