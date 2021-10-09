import BaseRoutes from "../BaseRoutes";
import AuthController from "../../controllers/auth/AuthController";
import AuthValidation from "../../validations/auth/AuthValidation";

class AuthRoute extends BaseRoutes {
  constructor() {
    super();
  }

  public routes(): void {
    const { router } = this;

    // @POST     | /api/v1/auth/register
    router.post(
      "/register",
      AuthValidation.registerValidation,
      AuthController.register
    );
    // @POST     | /api/v1/auth/login
    router.post("/login", AuthController.login);
  }
}

export default new AuthRoute().router;
