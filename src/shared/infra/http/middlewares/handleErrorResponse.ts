/* eslint-disable @typescript-eslint/no-unused-vars */
import { LocaleError } from "@shared/errors/LocaleError";
import { NextFunction, Request, Response } from "express";

export const handleErrorResponse = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof LocaleError)
    return res.status(error.description.status).json({
      error: true,
      type: error.type,
      message: error.description.message.en,
    });

  return res.status(400).json({
    error: true,
    type: "unknown",
    message: error?.message || String(error),
  });
};
