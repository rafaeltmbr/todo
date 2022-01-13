import { IUpdateTodoDTO } from "@modules/todo/dtos/IUpdateTodoDTO";
import { ITodoRepository } from "@modules/todo/repositories/ITodoRepository";
import { User } from "@modules/user/infra/typeorm/entities/User";
import { LocaleError } from "@shared/errors/LocaleError";
import { IStorageProvider } from "@shared/providers/storage/interfaces/IStorageProvider";
import { inject, injectable } from "tsyringe";

interface IExecute {
  id: string;
  data: IUpdateTodoDTO;
  user: User;
}

@injectable()
export class UpdateTodoService {
  constructor(
    @inject("TodoRepository") private todoRepository: ITodoRepository,
    @inject("StorageProvider") private storageProvider: IStorageProvider
  ) {}

  public async execute({ id, data, user }: IExecute) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) throw new LocaleError("todoNotFound");

    if (todo.user_id !== user.id)
      throw new LocaleError("operationNotPermitted");

    if (
      data.name &&
      data.name !== todo.name &&
      (await this.todoRepository.findByNameAndUserId({
        name: data.name,
        user_id: user.id,
      }))
    )
      throw new LocaleError("todoNameAlreadyExists");

    if (todo.image_url && data.image_url && todo.image_url !== data.image_url)
      await this.storageProvider.removeFile(
        this.storageProvider.getFilePathFromUrl(todo.image_url)
      );

    Object.assign(todo, data);

    return this.todoRepository.update(todo);
  }
}
