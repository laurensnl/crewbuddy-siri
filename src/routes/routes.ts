import * as express from "express";
import { StandbyController } from "./standby/controllers/standby";

class MainRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get("/standby", (req: express.Request, res: express.Response) =>
      StandbyController.root(req, res)
    );
  }
}

export const Routes = new MainRoutes().router;
