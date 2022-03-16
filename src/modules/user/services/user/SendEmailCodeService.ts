import { constants } from "@shared/config/constants";
import { mailConfig } from "@config/mail";
import { ICodeProvider } from "@shared/providers/code/interfaces/ICodeProvider";
import { IEmailCodeRepository } from "@modules/user/repositories/IEmailCodeRepository";
import { IMailProvider } from "@shared/providers/mail/interfaces/IMailProvider";
import { inject, injectable } from "tsyringe";
import { LocaleError } from "@shared/errors/LocaleError";
import { EmailCode } from "@modules/user/infra/typeorm/entities/EmailCode";

@injectable()
export class SendEmailCodeService {
  constructor(
    @inject("EmailCodeRepository")
    private emailCodeRepository: IEmailCodeRepository,
    @inject("CodeProvider") private codeProvider: ICodeProvider,
    @inject("MailProvider") private mailProvider: IMailProvider
  ) {}

  public async execute(email: string) {
    let emailCode = await this.emailCodeRepository.findByEmail(email);

    if (emailCode) {
      const codeAge = Date.now() - emailCode.updated_at.getTime();
      const expired = codeAge >= constants.maxPasswordRecoveryTimeMs;
      const maxAttemps =
        emailCode.attempts >= constants.maxPasswordRecoveryAttempts;

      if (maxAttemps && !expired) throw new LocaleError("emailCooldown");

      if (!expired) return;

      await this.updateEmailCode(emailCode);
    } else emailCode = await this.createEmailCode(email);

    await this.mailProvider.send({
      from: mailConfig.from,
      to: email,
      subject: "Verification code",
      text: `Your verification code is ${emailCode.code}`,
      html: `<p style="font-family: sans-serif;">Your verification code is <strong>${emailCode.code}</strong></p>`,
    });
  }

  private async updateEmailCode(emailCode: EmailCode) {
    emailCode.code = await this.codeProvider.generate();
    emailCode.attempts = 0;
    await this.emailCodeRepository.update(emailCode);
  }

  private async createEmailCode(email: string) {
    const code = await this.codeProvider.generate();
    return this.emailCodeRepository.create({ email, code });
  }
}
