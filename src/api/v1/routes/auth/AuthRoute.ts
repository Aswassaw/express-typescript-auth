import BaseRoutes from "../BaseRoutes";
import AuthController from "../../controllers/auth/AuthController";

class AuthRoute extends BaseRoutes {
  constructor() {
    super();
  }

  public routes(): void {
    const { router } = this;

    // @POST     | /api/v1/auth/register
    router.post("/", AuthController.register);
    // @POST     | /api/v1/auth/login
    router.post("/", AuthController.login);
  }
}

export default new AuthRoute().router;
