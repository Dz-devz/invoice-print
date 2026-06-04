import { StatusCodes } from "http-status-codes";

import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  makeError,
} from "./errors";

describe("makeError", () => {
  it("maps a BadRequestError to a 400 response", () => {
    const result = makeError(new BadRequestError("Invalid items data"));

    expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(result.error).toEqual({
      name: "BadRequestError",
      message: "Invalid items data",
    });
  });

  it("maps an UnauthorizedError to a 401 response", () => {
    expect(makeError(new UnauthorizedError("nope")).statusCode).toBe(
      StatusCodes.UNAUTHORIZED,
    );
  });

  it("maps a ForbiddenError to a 403 response", () => {
    expect(makeError(new ForbiddenError("nope")).statusCode).toBe(
      StatusCodes.FORBIDDEN,
    );
  });

  it("maps a NotFoundError to a 404 response", () => {
    const result = makeError(new NotFoundError("Specific invoice not found"));

    expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(result.error.message).toBe("Specific invoice not found");
  });

  it("maps a ConflictError to a 409 response", () => {
    expect(makeError(new ConflictError("dupe")).statusCode).toBe(
      StatusCodes.CONFLICT,
    );
  });

  it("treats a malformed-JSON error as a 400 even for a plain Error", () => {
    const result = makeError(new Error("Malformed JSON in request body"));

    expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(result.error.name).toBe("BadRequestError");
  });

  it("falls back to 500 for an unrecognized error", () => {
    const result = makeError(new Error("something unexpected"));

    expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.error).toEqual({
      name: "Error",
      message: "something unexpected",
    });
  });
});
