import { Router, Request, Response } from "express";
import UsersRoutesInterface from "./UsersRoutesInterface";

class UsersRoutes implements UsersRoutesInterface {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    const { router } = this;

    router.get("/", (req: Request, res: Response) => {
      res.json({
        msg: "Endpoint users GET",
      });
    });

    router.post("/", (req: Request, res: Response) => {
      res.json({
        msg: "Endpoint users POST",
        data: req.body,
      });
    });
  }
}

export default new UsersRoutes().router;
