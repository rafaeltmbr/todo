import { container } from "tsyringe";

import { HashProvider } from "../providers/hash";
import { UserRepository } from "../infra/typeorm/repositories/UserRepository";
import { EmailCodeRepository } from "../infra/typeorm/repositories/EmailCodeRepository";

container.register("HashProvider", HashProvider);
container.register("UserRepository", UserRepository);
container.register("EmailCodeRepository", EmailCodeRepository);
