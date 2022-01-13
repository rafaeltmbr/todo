import { container } from "tsyringe";

import { TodoRepository } from "../infra/typeorm/repositories/TodoRepository";

container.register("TodoRepository", TodoRepository);
