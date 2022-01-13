import { ICreateTodoDTO } from "@modules/todo/dtos/ICreateTodoDTO";
import {
  IFindTodoByNameAndUserId,
  ITodoRepository,
} from "@modules/todo/repositories/ITodoRepository";
import { getRepository, Repository } from "typeorm";
import { Todo } from "../entities/Todo";

export class TodoRepository implements ITodoRepository {
  private repository: Repository<Todo>;

  constructor() {
    this.repository = getRepository(Todo);
  }

  public findById(id: string) {
    return this.repository.findOne(id);
  }

  public findByNameAndUserId(data: IFindTodoByNameAndUserId) {
    return this.repository.findOne(data);
  }

  public findByUserId(userId: string) {
    return this.repository.find({ user_id: userId });
  }

  public create(data: ICreateTodoDTO) {
    const todo = this.repository.create(data);
    return this.repository.save(todo);
  }

  public update(todo: Todo) {
    return this.repository.save(todo);
  }

  public async delete(todo: Todo) {
    await this.repository.remove(todo);
  }
}
