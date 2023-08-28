import { Router } from "express";
import accountFactory from "../modules/account/AccountFactory";
const routes = Router();

routes.post("/reset", (req, res) => accountFactory().restoreInitialState(req, res));

// Balance
routes.get("/balance", (req, res) => accountFactory().getBalance(req, res));

// Events
routes.post("/event", (req, res) => accountFactory().handleEvent(req, res));

export default routes;