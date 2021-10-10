import { check } from "express-validator";

class TodosValidation {
  // @POST     | /api/v1/todos
  public index = [check("title", "Title is required").not().isEmpty()];

  // @PUT     | /api/v1/todos/:id
  public update = [check("title", "Title is required").not().isEmpty()];
}

export default new TodosValidation();
