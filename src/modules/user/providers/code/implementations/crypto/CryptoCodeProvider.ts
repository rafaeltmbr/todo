import { constants } from "@shared/config/constants";
import { randomBytes } from "crypto";
import {
  ICodeProvider,
  ICodeProviderOptions,
} from "../../interfaces/ICodeProvider";

const defaultConfig: Required<ICodeProviderOptions> = {
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  length: constants.emailCodeLength,
};

export class CryptoCodeProvider implements ICodeProvider {
  async generate(options?: ICodeProviderOptions) {
    const alphabet = options?.alphabet || defaultConfig.alphabet;
    const length = options?.length || defaultConfig.length;

    const bytes = randomBytes(length);
    let code = "";

    bytes.forEach((byte) => {
      code += alphabet.charAt(byte % alphabet.length);
    });

    return code;
  }
}
