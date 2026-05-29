import { Hono } from "hono";
import { cors } from "hono/cors";

import { routes } from "controllers/routes";
import { errorHandlerMiddleware } from "middlewares/error-handler";

type Bindings = {
  RATE_LIMITER: {
    limit: (options: { key: string }) => Promise<{ success: boolean }>;
  };
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", cors());

app.use("*", async (c, next) => {
  const ip = c.req.header("cf-connecting-ip") ?? "unknown";
  const { success } = await c.env.RATE_LIMITER.limit({ key: ip });

  if (!success) {
    return c.json({ error: "Too many requests" }, 429);
  }

  await next();
});

app.onError(errorHandlerMiddleware);

routes.forEach((route) => {
  app.route("/api", route);
});

export default app;
