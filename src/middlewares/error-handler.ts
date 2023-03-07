import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/core/custom-error";

// The main purpose of errorHandler:
// to send back a very consist structure of error, comming from different microservices.
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.log(err);
  res.status(400).send({
    errors: [{ message: "Something went wrong!" }],
  });
};
