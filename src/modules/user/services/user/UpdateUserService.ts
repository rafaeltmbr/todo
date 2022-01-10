import { User } from "@modules/user/infra/typeorm/entities/User";
import { IHashProvider } from "@modules/user/providers/hash/interfaces/IHashProvider";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { cleanUserData } from "@modules/user/util/cleanUserData";
import { LocaleError } from "@shared/errors/LocaleError";
import { inject, injectable } from "tsyringe";

interface IData {
  name?: string;
  current_password?: string;
  new_password?: string;
}

interface IExecute {
  user: User;
  data: IData;
}

@injectable()
export class UpdateUserService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("HashProvider") private hashProvider: IHashProvider
  ) {}

  public async execute({ user, data }: IExecute) {
    user.name = data.name || user.name;

    if (data.new_password) {
      const valid = await this.hashProvider.compare(
        data.current_password || "",
        user.password
      );

      if (!valid) throw new LocaleError("userPasswordInvalid");

      user.password = await this.hashProvider.hash(data.new_password);
    }

    return cleanUserData(await this.userRepository.update(user));
  }
}
