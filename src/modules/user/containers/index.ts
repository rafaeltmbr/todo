import { container } from "tsyringe";

import { HashProvider } from "../providers/hash";
import { IHashProvider } from "../providers/hash/interfaces/IHashProvider";

import { CodeProvider } from "../providers/code";
import { ICodeProvider } from "../providers/code/interfaces/ICodeProvider";

import { TokenProvider } from "../providers/token/TokenProvider";
import { ITokenProvider } from "../providers/token/interfaces/ITokenProvider";

import { IUserRepository } from "../repositories/IUserRepository";
import { UserRepository } from "../infra/typeorm/repositories/UserRepository";

import { IEmailCodeRepository } from "../repositories/IEmailCodeRepository";
import { EmailCodeRepository } from "../infra/typeorm/repositories/EmailCodeRepository";

container.register<IHashProvider>("HashProvider", HashProvider);

container.register<ICodeProvider>("CodeProvider", CodeProvider);

container.register<ITokenProvider>("TokenProvider", TokenProvider);

container.register<IUserRepository>("UserRepository", UserRepository);

container.register<IEmailCodeRepository>(
  "EmailCodeRepository",
  EmailCodeRepository
);
