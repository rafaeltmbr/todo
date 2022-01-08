import { EmailCodeRepository } from "@modules/user/infra/typeorm/repositories/EmailCodeRepository";
import { UserRepository } from "@modules/user/infra/typeorm/repositories/UserRepository";
import { IEmailCodeRepository } from "@modules/user/repositories/IEmailCodeRepository";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { container } from "tsyringe";

container.register<IUserRepository>("UserRepository", UserRepository);

container.register<IEmailCodeRepository>(
  "EmailCodeRepository",
  EmailCodeRepository
);
