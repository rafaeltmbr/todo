import nodemailer, { Transporter } from "nodemailer";
import { ISendMailDTO, IMailProvider } from "../../interfaces/IMailProvider";

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Transporter<any>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 0,
      secure: process.env.MAIL_PORT === "456",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async send(data: ISendMailDTO) {
    await this.transporter.sendMail(data);
  }
}
