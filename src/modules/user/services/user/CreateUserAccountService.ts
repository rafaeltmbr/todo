import { constants } from "@shared/config/constants";
import { ICreateUserDTO } from "@modules/user/dtos/ICreateUserDTO";
import { IHashProvider } from "@modules/user/providers/hash/interfaces/IHashProvider";
import { IEmailCodeRepository } from "@modules/user/repositories/IEmailCodeRepository";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { LocaleError } from "@shared/errors/LocaleError";
import { inject, injectable } from "tsyringe";

interface IExecute extends ICreateUserDTO {
  code: string;
}

@injectable()
export class CreateUserAccountService {
  constructor(
    @inject("HashProvider") private hashProvider: IHashProvider,
    @inject("EmailCodeRepository")
    private emailCodeRepository: IEmailCodeRepository,
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  public async execute({ email, name, code, password }: IExecute) {
    if (await this.userRepository.findByEmail(email))
      throw new LocaleError("emailAlreadyExists");

    const emailCode = await this.emailCodeRepository.findByEmail(email);
    if (!emailCode || emailCode.code !== code)
      throw new LocaleError("emailCodeInvalid");

    const codeAge = Date.now() - emailCode.updated_at.getTime();
    if (codeAge > constants.maxPasswordRecoveryTimeMs)
      throw new LocaleError("emailCodeExpired");

    if (emailCode.attempts > constants.maxPasswordRecoveryAttempts)
      throw new LocaleError("emailCodeMaximumAttempts");

    const passwordHash = await this.hashProvider.hash(password);

    const [user] = await Promise.all([
      this.userRepository.create({
        name,
        email,
        password: passwordHash,
      }),
      this.emailCodeRepository.delete(emailCode),
    ]);

    return user;
  }
}
