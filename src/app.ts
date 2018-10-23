import * as bodyParser from "body-parser";
import express from "express";
import { Routes } from "./routes/routes";

class App {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public app: express.Application;

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use("/", Routes);
  }
}

export default new App().app;
