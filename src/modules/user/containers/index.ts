import { container } from "tsyringe";

import { HashProvider } from "../providers/hash";
import { CodeProvider } from "../providers/code";
import { TokenProvider } from "../providers/token/TokenProvider";
import { UserRepository } from "../infra/typeorm/repositories/UserRepository";
import { EmailCodeRepository } from "../infra/typeorm/repositories/EmailCodeRepository";

container.register("HashProvider", HashProvider);
container.register("CodeProvider", CodeProvider);
container.register("TokenProvider", TokenProvider);
container.register("UserRepository", UserRepository);
container.register("EmailCodeRepository", EmailCodeRepository);
