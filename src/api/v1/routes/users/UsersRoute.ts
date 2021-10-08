import BaseRoutes from "../BaseRoutes";
import UsersController from "../../controllers/users/UsersController";

class UsersRoute extends BaseRoutes {
  constructor() {
    super();
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
