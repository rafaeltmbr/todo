import { constants } from "@shared/config/constants";
import { mailConfig } from "@config/mail";
import { ICodeProvider } from "@modules/user/providers/code/interfaces/ICodeProvider";
import { IEmailCodeRepository } from "@modules/user/repositories/IEmailCodeRepository";
import { IMailProvider } from "@shared/providers/mail/interfaces/IMailProvider";
import { inject, injectable } from "tsyringe";

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
      if (codeAge < constants.maxPasswordRecoveryTimeMs) return;

      emailCode.code = await this.codeProvider.generate();
      emailCode.attempts = 0;
      await this.emailCodeRepository.update(emailCode);
    } else {
      const code = await this.codeProvider.generate();
      emailCode = await this.emailCodeRepository.create({ email, code });
    }

    await this.mailProvider.send({
      from: mailConfig.from,
      to: email,
      subject: "Verification code",
      text: `Your verification code is ${emailCode.code}`,
      html: `<p style="font-family: sans-serif;">Your verification code is <strong>${emailCode.code}</strong></p>`,
    });
  }
}
