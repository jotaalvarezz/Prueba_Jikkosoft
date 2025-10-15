import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { routerApi } from "./routes/routes.js";
import models from "./models/modelsES.js";

const app = express();

const port = process.env.PORT ?? 5000;

const Domains = ["http://localhost:8080", "http://localhost:5000", "http://localhost:5173"];

app.disable("x-powered-by");
app.use(json());
app.use(corsMiddleware(Domains));

routerApi(app, models)

app.use((req, res) => {
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`url http://localhost:${port}`);
});
