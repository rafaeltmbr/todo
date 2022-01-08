import { constants } from "@config/constants";
import bcrypt from "bcrypt";

import { IHashProvider } from "../interfaces/IHashProvider";

export class HashProvider implements IHashProvider {
  hash(data: string) {
    return bcrypt.hash(data, constants.bcryptSaltRouds);
  }

  compare(data: string, hash: string) {
    return bcrypt.compare(data, hash);
  }
}
