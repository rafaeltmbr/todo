import { IHashProvider } from "@modules/user/providers/hash/interfaces/IHashProvider";
import { IEmailCodeRepository } from "@modules/user/repositories/IEmailCodeRepository";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { LocaleError } from "@shared/errors/LocaleError";
import { container, inject, injectable } from "tsyringe";
import { CheckEmailCodeService } from "./CheckEmailCodeServices";

interface IExecute {
  email: string;
  code: string;
  password: string;
}

@injectable()
export class ChangePasswordService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("HashProvider") private hashProvider: IHashProvider,
    @inject("EmailCodeRepository")
    private emailCodeRepository: IEmailCodeRepository
  ) {}

  public async execute(data: IExecute) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new LocaleError("userNotFound");

    const checkEmailCode = container.resolve(CheckEmailCodeService);
    const emailCode = await checkEmailCode.execute(data);

    user.password = await this.hashProvider.hash(data.password);
    await Promise.all([
      this.userRepository.update(user),
      this.emailCodeRepository.delete(emailCode),
    ]);
  }
}
