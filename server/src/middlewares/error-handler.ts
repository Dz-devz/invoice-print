import { Response } from "express";
import { makeError } from "../utils/errors";

export async function errorHandlerMiddleware(err: Error, res: Response) {
  const { error, statusCode } = makeError(err);
  console.error(error.message, error);
  return res.status(statusCode).json({ error });
}
