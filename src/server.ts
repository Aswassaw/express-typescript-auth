import express, { Application, Request, Response } from "express";

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
  console.log("Server running on port " + port);
});
