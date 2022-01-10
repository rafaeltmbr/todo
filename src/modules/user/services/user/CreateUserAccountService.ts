import { ICreateUserDTO } from "@modules/user/dtos/ICreateUserDTO";
import { IHashProvider } from "@modules/user/providers/hash/interfaces/IHashProvider";
import { IEmailCodeRepository } from "@modules/user/repositories/IEmailCodeRepository";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { cleanUserData } from "@modules/user/util/cleanUserData";
import { container, inject, injectable } from "tsyringe";
import { CheckEmailCodeService } from "./CheckEmailCodeServices";

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
    const checkEmailCode = container.resolve(CheckEmailCodeService);
    const emailCode = await checkEmailCode.execute({ email, code });
    await this.emailCodeRepository.delete(emailCode);

    const passwordHash = await this.hashProvider.hash(password);

    const user = await this.userRepository.findByEmail(email, true);
    if (user) {
      user.name = name;
      user.deleted_at = null;
      user.password = passwordHash;
      return cleanUserData(await this.userRepository.update(user));
    }

    const newUser = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return cleanUserData(newUser);
  }
}
