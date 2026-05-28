import { Hono } from "hono";
import { cors } from "hono/cors";

import { routes } from "controllers/routes";
import { errorHandlerMiddleware } from "middlewares/error-handler";

const app = new Hono();

app.use("*", cors());

app.onError(errorHandlerMiddleware);

routes.forEach((route) => {
  app.route("/api", route);
});

export default app;
