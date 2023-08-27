import { Router } from "express";
import accountFactory from "../modules/account/AccountFactory";
const routes = Router();

routes.get("/", (req, res) => res.send("Hello World!"));

// Balance
routes.get("/balance", (req, res) => accountFactory().getBalance(req, res));

// Events
routes.post("/event", (req, res) => accountFactory().handleEvent(req, res));

export default routes;