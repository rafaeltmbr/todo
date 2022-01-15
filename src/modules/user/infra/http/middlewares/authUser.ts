import { NextFunction, Request, Response } from "express";
import { UserRepository } from "@modules/user/infra/typeorm/repositories/UserRepository";
import { LocaleError } from "@shared/errors/LocaleError";
import { TokenProvider } from "@shared/providers/token/TokenProvider";
import { IUserTokenDTO } from "@modules/user/dtos/IUserTokenDTO";

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = (req.headers.authorization || "").split(" ")[1];
  if (!token) throw new LocaleError("tokenMissing");

  const tokenProvider = new TokenProvider();
  const decoded = await tokenProvider.decode<IUserTokenDTO>(token);

  const userRepository = new UserRepository();
  const user = await userRepository.findById(decoded.id);
  if (!user) throw new LocaleError("userNotFound");

  req.user = user;
  next();
};
