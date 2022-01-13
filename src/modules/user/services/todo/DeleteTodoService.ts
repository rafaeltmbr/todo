import { ITodoRepository } from "@modules/todo/repositories/ITodoRepository";
import { User } from "@modules/user/infra/typeorm/entities/User";
import { LocaleError } from "@shared/errors/LocaleError";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteTodoService {
  constructor(
    @inject("TodoRepository") private todoRepository: ITodoRepository
  ) {}

  public async execute(id: string, user: User) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) throw new LocaleError("todoNotFound");

    if (todo.user_id !== user.id)
      throw new LocaleError("operationNotPermitted");

    await this.todoRepository.delete(todo);
  }
}
