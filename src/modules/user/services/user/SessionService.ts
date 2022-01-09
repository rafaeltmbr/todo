import { IUserTokenDTO } from "@modules/user/dtos/IUserTokenDTO";
import { IHashProvider } from "@modules/user/providers/hash/interfaces/IHashProvider";
import { ITokenProvider } from "@modules/user/providers/token/interfaces/ITokenProvider";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { cleanUserData } from "@modules/user/util/cleanUserData";
import { LocaleError } from "@shared/errors/LocaleError";
import { inject, injectable } from "tsyringe";

interface IExecute {
  email: string;
  password: string;
}

@injectable()
export class SessionService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("HashProvider") private hashProvider: IHashProvider,
    @inject("TokenProvider") private tokenProvider: ITokenProvider
  ) {}

  async execute(data: IExecute) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new LocaleError("userNotFound");

    if (!(await this.hashProvider.compare(data.password, user.password)))
      throw new LocaleError("userPasswordInvalid");

    const token = await this.tokenProvider.encode({
      id: user.id,
    } as IUserTokenDTO);

    return { ...cleanUserData(user), token };
  }
}
