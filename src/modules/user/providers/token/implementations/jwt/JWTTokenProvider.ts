import { constants } from "@shared/config/constants";
import { LocaleError } from "@shared/errors/LocaleError";
import jwt from "jsonwebtoken";

import { ITokenProvider } from "../../interfaces/ITokenProvider";

const options = {
  expiresIn: constants.jwtExpirationInterval,
};

export class JWTTokenProvider implements ITokenProvider {
  private secret: string;

  constructor() {
    if (!process.env.APP_KEY) throw new LocaleError("appKeyMissing");

    this.secret = process.env.APP_KEY;
  }

  encode(data: any) {
    return new Promise<string>((res, rej) => {
      jwt.sign(data, this.secret, options, (err, token) =>
        err ? rej(err) : res(token as string)
      );
    });
  }

  decode<T>(data: string) {
    return new Promise<T>((res, rej) => {
      jwt.verify(data, this.secret, (err, token) =>
        err ? rej(err) : res(token as T)
      );
    });
  }
}
