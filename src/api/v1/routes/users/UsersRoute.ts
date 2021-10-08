import BaseRoutes from "../BaseRoutes";
import UsersController from "../../controllers/users/UsersController";
import Authorization from "../../middlewares/Authorization";

class UsersRoute extends BaseRoutes {
  constructor() {
    super();
  }

  public routes(): void {
    const { router } = this;

    // @GET     | /api/v1/users
    router.get("/", Authorization, UsersController.index);
    // @POST    | /api/v1/users
    router.post("/", Authorization, UsersController.create);
    // @GET     | /api/v1/users/:id
    router.get("/:id", Authorization, UsersController.show);
    // @PUT     | /api/v1/users/:id
    router.put("/:id", Authorization, UsersController.update);
    // @DELETE  | /api/v1/users/:id
    router.delete("/:id", Authorization, UsersController.delete);
  }
}

export default new UsersRoute().router;
