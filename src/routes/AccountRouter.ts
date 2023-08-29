import { Router } from "express";
import accountFactory from "../modules/account/AccountFactory";
const routes = Router();

routes.post("/reset", (req, res, next) => accountFactory().restoreInitialState(req, res, next));

// Balance
routes.get("/balance", (req, res, next) => accountFactory().getBalance(req, res, next));

// Events
routes.post("/event", (req, res, next) => accountFactory().handleEvent(req, res, next));

export default routes;