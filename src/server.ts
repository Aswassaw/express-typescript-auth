import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import chalk from "chalk";

// Import Routes (v1)
import AuthRoute from "./api/v1/routes/auth/AuthRoute";
import UsersRoute from "./api/v1/routes/users/UsersRoute";
import TodosRoute from "./api/v1/routes/todos/TodosRoute";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv.config();
  }

  protected plugins(): void {
    const { app } = this;

    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    app.use(compression());
    app.use(morgan("dev"));
  }

  protected routes(): void {
    const { app } = this;

    app.get("/", (req: Request, res: Response) => {
      res.send("Express Server Using Typescript");
    });

    // Routes (v1)
    app.use("/api/v1/auth", AuthRoute);
    app.use("/api/v1/users", UsersRoute);
    app.use("/api/v1/todos", TodosRoute);
  }
}

const port = 4000;
const { app } = new App();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(chalk`Visit {rgb(128, 237, 153) http://localhost:${port}}`);
  console.log(chalk`Developed by {rgb(255, 92, 88) Andry Pebrianto}`);
});
