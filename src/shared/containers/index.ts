import { EmailCodeRepository } from "@modules/user/infra/typeorm/repositories/EmailCodeRepository";
import { UserRepository } from "@modules/user/infra/typeorm/repositories/UserRepository";
import { CodeProvider } from "@modules/user/providers/code";
import { ICodeProvider } from "@modules/user/providers/code/interfaces/ICodeProvider";
import { HashProvider } from "@modules/user/providers/hash";
import { IHashProvider } from "@modules/user/providers/hash/interfaces/IHashProvider";
import { IEmailCodeRepository } from "@modules/user/repositories/IEmailCodeRepository";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { MailProvider } from "@shared/providers/mail/implementations";
import { IMailProvider } from "@shared/providers/mail/interfaces/IMailProvider";
import { container } from "tsyringe";

container.register<IUserRepository>("UserRepository", UserRepository);

container.register<IEmailCodeRepository>(
  "EmailCodeRepository",
  EmailCodeRepository
);

container.register<IHashProvider>("HashProvider", HashProvider);

container.register<ICodeProvider>("CodeProvider", CodeProvider);

container.register<IMailProvider>("MailProvider", MailProvider);
