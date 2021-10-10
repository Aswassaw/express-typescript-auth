import { check } from "express-validator";

class TodosValidation {
  // @POST     | /api/v1/todos
  public index = [
    check("title", "Title is required").not().isEmpty(),
    check("title", "Title maximum length is 30 characters").isLength({
      max: 30,
    }),
    check("description", "Description is required").not().isEmpty(),
  ];

  // @PUT     | /api/v1/todos/:id
  public update = [check("title", "Title is required").not().isEmpty()];
}

export default new TodosValidation();
