import { Router } from "express";
const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello World!");
});

// Balance
routes.get("/balance", (req, res) => {
  res.send("Balance");
});

// Events
routes.post("/event", (req, res) => {
  res.send("Events");
});



export default routes;