import { ITodoRepository } from "@modules/todo/repositories/ITodoRepository";
import { User } from "@modules/user/infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListTodoService {
  constructor(
    @inject("TodoRepository") private todoRepository: ITodoRepository
  ) {}

  public async execute(user: User) {
    return this.todoRepository.findByUserId(user.id);
  }
}
