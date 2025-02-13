import { routes } from "controllers/routes";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { errorHandlerMiddleware } from "middlewares/error-handler";

const app = express();
app.use(cors());
app.use(express.json());
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandlerMiddleware(err, res);
});

routes.forEach((route) => {
  app.use("/api", route);
});

export default app;
