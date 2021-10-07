import express, { Application, Request, Response } from "express";
import chalk from "chalk";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
  }

  protected routes(): void {
    const { app } = this;

    app.get("/", (req: Request, res: Response) => {
      res.send("Express Server Using Typescript");
    });

    app.post("/users", (req: Request, res: Response) => {
      res.json(req.body);
    });
  }
}

const port = 4000;
const { app } = new App();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(chalk`Visit {rgb(128, 237, 153) http://localhost:${port}}`);
  console.log(chalk`Developed by {rgb(255, 92, 88) Andry Pebrianto}`);
});
