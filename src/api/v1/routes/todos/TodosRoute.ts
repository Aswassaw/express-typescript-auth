import BaseRoutes from "../BaseRoutes";
import TodosValidation from "../../validations/todos/TodosValidation";
import TodosController from "../../controllers/todos/TodosController";
import Authorization from "../../middlewares/Authorization";

class TodosRoute extends BaseRoutes {
  constructor() {
    super();
  }

  public routes(): void {
    const { router } = this;

    // @GET     | /api/v1/todos
    router.get("/", Authorization, TodosController.index);
    // @POST    | /api/v1/todos
    router.post("/", Authorization, TodosValidation.index, TodosController.create);
    // @GET     | /api/v1/todos/:id
    router.get("/:id", Authorization, TodosController.show);
    // @PUT     | /api/v1/todos/:id
    router.put("/:id", Authorization, TodosValidation.update, TodosController.update);
    // @DELETE  | /api/v1/todos/:id
    router.delete("/:id", Authorization, TodosController.delete);
  }
}

export default new TodosRoute().router;
