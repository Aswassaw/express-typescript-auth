import express, { Application, Request, Response } from "express";
import chalk from 'chalk';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.routes();
  }

  protected routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Express Server Using Typescript");
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
