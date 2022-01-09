import { constants } from "@shared/config/constants";
import { IEmailCodeRepository } from "@modules/user/repositories/IEmailCodeRepository";
import { LocaleError } from "@shared/errors/LocaleError";
import { inject, injectable } from "tsyringe";

interface IExecute {
  email: string;
  code: string;
}

@injectable()
export class CheckEmailCodeService {
  constructor(
    @inject("EmailCodeRepository")
    private emailCodeRepository: IEmailCodeRepository
  ) {}

  public async execute(data: IExecute) {
    const emailCode = await this.emailCodeRepository.findByEmail(data.email);

    if (!emailCode) throw new LocaleError("emailCodeInvalid");

    if (emailCode.attempts >= constants.maxPasswordRecoveryAttempts)
      throw new LocaleError("emailCodeMaximumAttempts");

    if (emailCode.code !== data.code) {
      emailCode.attempts += 1;
      await this.emailCodeRepository.update(emailCode);
      throw new LocaleError("emailCodeInvalid");
    }
  }
}
