import express from "express";
import accountRouter from "./routes/AccountRouter";
import { errorHandler } from "./middlewares/ErrorHandler";

const app = express();
const port = 8080;

app.use(express.json());
app.use(accountRouter);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

