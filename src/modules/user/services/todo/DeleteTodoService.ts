import { ITodoRepository } from "@modules/todo/repositories/ITodoRepository";
import { User } from "@modules/user/infra/typeorm/entities/User";
import { LocaleError } from "@shared/errors/LocaleError";
import { IStorageProvider } from "@shared/providers/storage/interfaces/IStorageProvider";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteTodoService {
  constructor(
    @inject("TodoRepository") private todoRepository: ITodoRepository,
    @inject("StorageProvider") private storageProvider: IStorageProvider
  ) {}

  public async execute(id: string, user: User) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) throw new LocaleError("todoNotFound");

    if (todo.user_id !== user.id)
      throw new LocaleError("operationNotPermitted");

    if (todo.image_url)
      await this.storageProvider.removeFile(
        this.storageProvider.getFilePathFromUrl(todo.image_url)
      );

    await this.todoRepository.delete(todo);
  }
}
