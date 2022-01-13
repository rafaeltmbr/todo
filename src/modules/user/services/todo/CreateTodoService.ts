import { ICreateTodoDTO } from "@modules/todo/dtos/ICreateTodoDTO";
import { ITodoRepository } from "@modules/todo/repositories/ITodoRepository";
import { User } from "@modules/user/infra/typeorm/entities/User";
import { LocaleError } from "@shared/errors/LocaleError";
import { inject, injectable } from "tsyringe";

type IData = Omit<ICreateTodoDTO, "user_id">;

@injectable()
export class CreateTodoService {
  constructor(
    @inject("TodoRepository") private todoRepository: ITodoRepository
  ) {}

  public async execute(data: IData, user: User) {
    const todo = await this.todoRepository.findByNameAndUserId({
      name: data.name,
      user_id: user.id,
    });

    if (todo && todo.user_id === user.id)
      throw new LocaleError("todoNameAlreadyExists");

    return this.todoRepository.create({
      ...data,
      user_id: user.id,
    });
  }
}
