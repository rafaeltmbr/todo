import { User } from "@modules/user/infra/typeorm/entities/User";
import { IHashProvider } from "@modules/user/providers/hash/interfaces/IHashProvider";
import { IEmailCodeRepository } from "@modules/user/repositories/IEmailCodeRepository";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { LocaleError } from "@shared/errors/LocaleError";
import { inject, injectable } from "tsyringe";

interface IExecute {
  user: User;
  password: string;
}

@injectable()
export class DeleteUserService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("EmailCodeRepository")
    private emailCodeRepository: IEmailCodeRepository,
    @inject("HashProvider") private hashProvider: IHashProvider
  ) {}

  public async execute({ user, password }: IExecute) {
    if (!(await this.hashProvider.compare(password, user.password)))
      throw new LocaleError("userPasswordInvalid");

    const emailCode = await this.emailCodeRepository.findByEmail(user.email);
    if (emailCode) await this.emailCodeRepository.delete(emailCode);

    user.deleted_at = new Date();
    await this.userRepository.update(user);
  }
}
